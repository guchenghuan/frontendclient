<template>
  <div class="newwave">
    <el-radio-group v-model="radio1">
      <el-radio-button label="domDiff前端核心页面比对"></el-radio-button>
    </el-radio-group>
    <div class="search">
      <el-input
        placeholder="请输入新增的url"
        v-model="input"
        clearable
        class="inputbutton"
      ></el-input>
      <el-select
        v-model="value"
        clearable
        placeholder="请选择分区"
        style="margin-right: 5px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" size="small" @click="inserturl()"
        >新增</el-button
      >
    </div>
    <div class="radiotitle">
      <el-radio-group v-model="radio" @change="changetab()">
        <el-radio v-model="radio" label="1">大首页</el-radio>
        <el-radio v-model="radio" label="2">播放页</el-radio>
        <el-radio v-model="radio" label="3">分区一级</el-radio>
        <el-radio v-model="radio" label="4">分区二级</el-radio>
        <el-radio v-model="radio" label="5">个人中心</el-radio>
      </el-radio-group>
    </div>
    <div class="newwave">
      <el-radio-group
        v-model="radiourl"
        size="small"
        text-color="rgb(24 144 255)"
        fill="rgb(240 248 255)"
        @change="changeurl()"
      >
        <el-radio-button
          style="margin-top: 5px"
          v-for="item in urlData"
          :key="item.index"
          :label="item"
          border
        ></el-radio-button>
      </el-radio-group>
    </div>
    <div class="newwave">
      <el-radio-group
        v-model="radiofile"
        size="small"
        text-color="rgb(24 144 255)"
        fill="rgb(240 248 255)"
        @change="changefile()"
      >
        <el-radio-button
          style="margin-top: 5px"
          v-for="item in fileData"
          :key="item.index"
          :label="item"
          border
        ></el-radio-button>
      </el-radio-group>
      <el-button
        type="primary"
        size="small"
        style="margin-left: 5px"
        :loading="flag"
        @click="rundomdiff()"
        >立即执行</el-button
      >
    </div>
    <div class="newwave titleinfo">
      当前页面：<el-link
        type="primary"
        target="_blank"
        style="margin-left: 5px; margin-right: 5px"
        :href="currenturl"
        >{{ currenturl }}</el-link
      >
      总像素:
      <span style="margin-left: 5px; margin-right: 5px">{{ dimension }}</span>
      差异值：<span style="margin-left: 5px; margin-right: 5px">{{
        differences
      }}</span>
      像素占比：<span style="margin-left: 5px; margin-right: 5px">{{
        diffrate
      }}</span>
      历史dom总量:
      <span style="margin-left: 5px; margin-right: 5px">{{ lastdom }}</span>
      本次dom总量：<span style="margin-left: 5px; margin-right: 5px">{{
        newdom
      }}</span>
      dom占比：<span style="margin-left: 5px; margin-right: 5px">{{
        domrate
      }}</span>
      运行结果：<span style="margin-left: 5px; margin-right: 5px">{{
        diffcode
      }}</span>
    </div>
    <el-divider></el-divider>
    <div
      style="
        margin-left: 10px;
        margin-top: 10px;
        font-size: 25px;
        font-weight: 500;
      "
    >
      picdiff-比对结果明细
    </div>
    <div class="imgposition">
      <div class="picturetitle">
        <div class="lasttitle">last-picture</div>
        <div class="newtitle">new-picture</div>
      </div>
      <img style="width: 49%" :src="picobj.lastpicture" />
      <img style="width: 50%" :src="picobj.newpicture" />
      <div class="picturetitle">Diffpicture</div>
      <img style="width: 100%" :src="picobj.entrypicture" />
    </div>
    <el-divider></el-divider>
    <div
      style="
        margin-left: 10px;
        margin-top: 10px;
        font-size: 25px;
        font-weight: 500;
      "
    >
      DomDiff-比对结果明细
    </div>
    <div id="diffoutput" v-html="textvalue" class="textinfo"></div>
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top
        :visibility-height="300"
        :back-position="50"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { SUCCESS } from "dropzone";
import BackToTop from "@/components/BackToTop";
export default {
  name: "domDiff",
  components: { BackToTop },
  data() {
    return {
      flag: false,
      dimension: "",
      differences: "",
      textvalue: "",
      lastdom: "",
      newdom: "",
      domrate: "",
      diffrate: "",
      diffcode: "",
      input: "",
      radio: "1",
      options: [
        {
          value: 1,
          label: "大首页",
        },
        {
          value: 2,
          label: "播放页",
        },
        {
          value: 3,
          label: "分区一级",
        },
        {
          value: 4,
          label: "分区二级",
        },
        {
          value: 5,
          label: "个人中心",
        },
      ],
      value: "",
      radio1: "domDiff前端核心页面比对",
      radiourl: "",
      radiofile: "",
      picobj: {
        lastpicture: "",
        newpicture: "",
        entrypicture: "",
      },
      currenturl: "",
      datefile: "2020-10-28-15-39-35",
      urlData: [],
      fileData: [],
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#e7eaf1", // 按钮的背景颜色 The background color of the button
      },
    };
  },
  mounted() {
    this.changetab();
  },
  methods: {
    // 新增
    inserturl() {
      // console.log(this.value);
      try {
        if (this.value && this.input) {
          const type = this.value;
          const obj = {
            url: this.input,
            type: type,
            dbname: "tabUrl",
          };
          this.$http
            .neewinsert(obj)
            .then((res) => {
              if (res.msg === "success") {
                this.value = "";
                this.input = "";
                this.changetab();
                this.$message({
                  message: "新增成功",
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
        } else {
          this.$notify.error({
            title: "错误",
            message: "请输入正确的url以及选择分区",
          });
        }
      } catch (e) {
        console.log(e);
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员",
          type: "error",
        });
      }
    },
    // 二级查询
    changeurl() {
      // console.log(this.radiourl);
      try {
        this.dimension = "";
        this.differences = "";
        this.diffrate = "";
        this.diffcode = "";
        this.domrate = "";
        this.textvalue = "";
        this.lastdom = "";
        this.newdom = "";
        this.fileData = [];
        this.picobj.lastpicture = "";
        this.picobj.newpicture = "";
        this.picobj.entrypicture = "";
        this.currenturl = this.radiourl;
        const url = this.radiourl;
        const obj = {
          url: url,
          dbname: "urlFiles",
        };
        this.$http
          .Ssearch(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.radiofile = "";
              res.data.forEach((element) => {
                this.fileData.push(element.filename);
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
    // 三级查询
    changefile() {
      console.log(this.radiofile);
      try {
        const file = this.radiofile;
        const obj = {
          file: file,
          dbname: "fileImgs",
        };
        this.$http
          .Tsearch(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.picobj.lastpicture = res.data[0].firstimg;
              this.picobj.newpicture = res.data[0].secondimg;
              this.picobj.entrypicture = res.data[0].diffimg;
              this.dimension = res.data[0].dimension
                ? res.data[0].dimension
                : "";
              this.differences = res.data[0].diffdifferences
                ? res.data[0].diffdifferences
                : "";
              this.diffrate = res.data[0].diffdifferences
                ? (res.data[0].diffdifferences / res.data[0].dimension).toFixed(
                    2
                  ) *
                    100 +
                  "%"
                : "";
              this.diffcode = res.data[0].result ? res.data[0].result : "";
              this.textvalue = res.data[0].diffdom ? res.data[0].diffdom : "";
              this.lastdom = res.data[0].lastdom ? res.data[0].lastdom : "";
              this.newdom = res.data[0].newdom ? res.data[0].newdom : "";
              this.domrate = res.data[0].domrate
                ? res.data[0].domrate + "%"
                : "";
              this.$message({
                message: "查询成功",
                type: "success",
              });
            } else {
              this.dimension = "";
              this.differences = "";
              this.diffrate = "";
              this.diffcode = "";
              this.picobj.lastpicture = "";
              this.picobj.newpicture = "";
              this.picobj.entrypicture = "";
              this.domrate = "";
              this.textvalue = "";
              this.lastdom = "";
              this.newdom = "";
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
    // 一级查询
    changetab() {
      // console.log(this.radio);
      try {
        this.currenturl = "";
        this.dimension = "";
        this.differences = "";
        this.diffrate = "";
        this.diffcode = "";
        this.picobj.lastpicture = "";
        this.picobj.newpicture = "";
        this.picobj.entrypicture = "";
        this.domrate = "";
        this.textvalue = "";
        this.lastdom = "";
        this.newdom = "";
        this.urlData = [];
        this.fileData = [];
        const type = this.radio;
        const obj = {
          type: type,
          dbname: "tabUrl",
        };
        this.$http
          .Fsearch(obj)
          .then((res) => {
            if (res.msg === "success") {
              res.data.forEach((element) => {
                this.urlData.push(element.url);
              });
              this.radiourl = "";
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
    rundomdiff() {
      // console.log(this.radio);
      try {
        if (this.radiourl) {
          this.flag = true;
          const url = this.radiourl;
          const obj = {
            url: url,
          };
          this.$http
            .handsrun(obj)
            .then((res) => {
              if (res.msg === "success") {
                this.changeurl();
                this.flag = false;
                this.$message({
                  message: "执行成功~",
                  type: "success",
                });
              } else {
                this.flag = false;
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
        } else {
          this.$notify.error({
            title: "错误",
            message: "请选择你要进行测试的url",
          });
        }
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
  .titleinfo {
    color: rgb(94, 109, 130);
  }
}
.radiotitle {
  margin: 20px;
}
.title {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-weight: 400;
  font-size: 28px;
}
.search {
  display: inline-flex;
  width: 70%;
}
.inputbutton {
  margin-right: 10px;
}
.picturetitle {
  display: flow-root;
  text-align: center;
  margin: 10px;
  font-size: 20px;
  font-weight: 400;
  color: rgb(94, 109, 130);
}
.lasttitle {
  display: inline-flex;
  float: left;
  padding-left: 20%;
}
.newtitle {
  display: inline-flex;
  float: right;
  padding-right: 20%;
}
.search {
  display: inline-flex;
  float: right;
  width: 50%;
}
.inputbutton {
  margin-right: 10px;
}
.el-radio-button + .el-radio-button {
  margin-left: 10px;
}
.imgposition {
  height: 830px;
  overflow-y: auto;
  width: 100%;
  margin-top: 15px;
}
.textinfo {
  height: 830px;
  overflow-y: auto;
  width: 100%;
  margin-top: 15px;
}
table.diff {
  border-collapse: collapse;
  border: 1px solid darkgray;
  white-space: pre-wrap;
}
table.diff tbody {
  font-family: Courier, monospace;
}
table.diff tbody th {
  font-family: verdana, arial, "Bitstream Vera Sans", helvetica, sans-serif;
  background: #eed;
  font-size: 11px;
  font-weight: normal;
  border: 1px solid #bbc;
  color: #886;
  padding: 0.3em 0.5em 0.1em 2em;
  text-align: right;
  vertical-align: top;
}
table.diff thead {
  border-bottom: 1px solid #bbc;
  background: #efefef;
  font-family: Verdana;
}
table.diff thead th.texttitle {
  text-align: left;
}
table.diff tbody td {
  padding: 0px 0.4em;
  padding-top: 0.4em;
  vertical-align: top;
}
table.diff .empty {
  background-color: #ddd;
}
table.diff .replace {
  background-color: #fd8;
}
table.diff .delete {
  background-color: #e99;
}
table.diff .skip {
  background-color: #efefef;
  border: 1px solid #aaa;
  border-right: 1px solid #bbc;
}
table.diff .insert {
  background-color: #9e9;
}
table.diff th.author {
  text-align: right;
  border-top: 1px solid #bbc;
  background: #efefef;
}
</style>
<style type="text/css">
table.diff {
  border-collapse: collapse;
  border: 1px solid darkgray;
  white-space: pre-wrap;
}
table.diff tbody {
  font-family: Courier, monospace;
}
table.diff tbody th {
  font-family: verdana, arial, "Bitstream Vera Sans", helvetica, sans-serif;
  background: #eed;
  font-size: 11px;
  font-weight: normal;
  border: 1px solid #bbc;
  color: #886;
  padding: 0.3em 0.5em 0.1em 2em;
  text-align: right;
  vertical-align: top;
}
table.diff thead {
  border-bottom: 1px solid #bbc;
  background: #efefef;
  font-family: Verdana;
}
table.diff thead th.texttitle {
  text-align: left;
}
table.diff tbody td {
  padding: 0px 0.4em;
  padding-top: 0.4em;
  vertical-align: top;
}
table.diff .empty {
  background-color: #ddd;
}
table.diff .replace {
  background-color: #fd8;
}
table.diff .delete {
  background-color: #e99;
}
table.diff .skip {
  background-color: #efefef;
  border: 1px solid #aaa;
  border-right: 1px solid #bbc;
}
table.diff .insert {
  background-color: #9e9;
}
table.diff th.author {
  text-align: right;
  border-top: 1px solid #bbc;
  background: #efefef;
}
</style>
