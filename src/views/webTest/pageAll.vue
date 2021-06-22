<template>
  <div class="newwave">
    <el-radio-group v-model="radio1">
      <el-radio-button label="播放页性能数据 and 历史演变"></el-radio-button>
    </el-radio-group>
    <div class="titleeach" style="font-size: 20px; font-weight: 400">
      播放器性能数据 (每周更新...)
      <div
        style="
          color: rgb(189, 110, 110);
          font-size: 15px;
          display: inline-block;
          margin-left: 20px;
        "
      >
        更新日期 -- {{ date }}
      </div>
    </div>
    <template>
      <el-table :data="biuseData" style="width: 80%">
        <el-table-column prop="metircname" label="Metric" width="400">
        </el-table-column>
        <el-table-column prop="metircvalue" label="Value" width="300">
        </el-table-column>
      </el-table>
    </template>
    <el-divider></el-divider>
    <div class="titleeach" style="font-size: 20px; font-weight: 400">
      历史截图 (每月底新增...)
      <div
        style="
          color: rgb(189, 110, 110);
          font-size: 15px;
          display: inline-block;
          margin-left: 20px;
        "
      >
        本次更新日期 -- {{ imgData[0].date }}
      </div>
    </div>

    <img
      class="titleeach"
      v-for="item in imgData"
      :key="item.index"
      style="width: 80%"
      :src="item.img"
    />
    <div
      style="
        margin-top: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid rgb(97 89 89);
      "
    ></div>
    <div class="titleeach" style="font-size: 20px; font-weight: 400">
      历史录屏 (每月底新增...)
    </div>
    <div class="titleeach" style="font-size: 16px; font-weight: 400">
      2020-11-01
    </div>
    <div>
      <video
        class="titleeach"
        width="80%"
        controls="controls"
        type="video/mp4"
        preload="auto"
      >
        <source src="http://10.23.84.23:3006/v" autostart="false" />
        Your browser does not support the video tag.
      </video>
    </div>
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="50"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

<script>
import echarts from "echarts";
import { SUCCESS } from "dropzone";
import BackToTop from "@/components/BackToTop";
export default {
  name: "pageAll",
  components: { BackToTop },
  data() {
    return {
      imgData: [],
      date: "",
      newpicture: "",
      radio1: "播放页性能数据 and 历史演变",
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#e7eaf1", // 按钮的背景颜色 The background color of the button
      },
      biuseData: [],
    };
  },
  mounted() {
    this.getvideo();
    this.getdata();
  },
  methods: {
    getvideo() {
      try {
        const obj = {
          option: "videopage",
        };
        this.$http
          .getvideoinfodata(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.imgData = res.data;
              this.$message({
                message: "拉取成功",
                type: "success",
              });
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message({
              showClose: true,
              message: "服务好像出问题了，请联系管理员",
              type: "error",
            });
          });
      } catch (e) {
        console.log(e);
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员",
          type: "error",
        });
      }
    },
    getdata() {
      try {
        const obj = {
          option: "getwebquailtydata",
        };
        this.$http
          .getquailtydata(obj)
          .then((res) => {
            if (res.msg === "success") {
              const bilidata = res.data[4];
              this.date = bilidata["Date"];
              const newbidata = [];
              for (let key in bilidata) {
                if (key === "Date" || key === "platformname" || key === "_id") {
                  continue;
                } else {
                  const obj = {
                    metircname: key,
                    metircvalue: bilidata[key],
                  };
                  newbidata.push(obj);
                }
              }
              this.biuseData = newbidata;
              this.$message({
                message: "数据已拉取最新~",
                type: "success",
              });
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message({
              showClose: true,
              message: "服务好像出问题了，请联系管理员",
              type: "error",
            });
          });
      } catch (e) {
        console.log(e);
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员",
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.newwave {
  margin: 20px;
}
.titleeach {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
