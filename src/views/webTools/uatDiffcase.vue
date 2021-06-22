<template>
  <div class="newwave">
    <h2
      style="
        font-weight: 400;
        color: rgb(31 47 61);
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
      "
    >
      Uat-Diff-实例：
      <el-link
        href="https://uat-www.xxxxxxx.com/video/BV1Xe4y1a7FL"
        target="_blank"
        type="primary"
      >
        https://uat-www.xxxxxxx.com/video/BV1Xe4y1a7FL
      </el-link>
    </h2>
    <div class="domdiffinfo">
      <el-table
        :data="diffinfo"
        border
        style="width: 100%"
        :cell-style="tableRowClassName"
      >
        <el-table-column prop="filename" label="运行批次" width="250">
        </el-table-column>
        <el-table-column prop="pagecate" label="分区" width="150">
        </el-table-column>
        <el-table-column label="页面链接" width="400" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-link :href="scope.row.url" target="_blank" type="primary">{{
              scope.row.url
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="diffrate" label="picdiff差异率" width="180">
        </el-table-column>
        <el-table-column prop="domrate" label="domdiff差异率" width="180">
        </el-table-column>
        <el-table-column prop="runcoderesult" label="结果" width="150">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-divider></el-divider>
    <h2
      style="
        font-weight: 400;
        color: rgb(31 47 61);
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
      "
    >
      数据汇总
    </h2>
    <el-table :data="sumaryinfo" border style="width: 60%">
      <el-table-column prop="pagecategory" label="页面分类"> </el-table-column>
      <el-table-column prop="nums" label="数量" width="120"> </el-table-column>
      <el-table-column prop="length" label="运行次数" width="150">
      </el-table-column>
      <el-table-column prop="successrate" label="成功率" width="150">
      </el-table-column>
      <el-table-column prop="domrates" label="dom差异范围" width="200">
      </el-table-column>
      <el-table-column prop="picrates" label="pic差异范围" width="200">
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <h2
      style="
        font-weight: 400;
        color: rgb(31 47 61);
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
      "
    >
      差异趋势
    </h2>
    <div
      id="player"
      style="width: 100%; height: 800px; overflow: auto hidden"
    ></div>
    <el-dialog title="Diff详情" :visible.sync="dialogTableVisible" width="80%">
      <div class="picturetitle">图像对比</div>
      <img style="width: 100%" :src="entrypicture" />
      <div class="picturetitle">dom树对比</div>
      <div id="diffoutput" v-html="textvalue" class="textinfo"></div>
    </el-dialog>
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
import echarts from "echarts";
import BackToTop from "@/components/BackToTop";
export default {
  name: "uatDiffcase",
  components: { BackToTop },
  data() {
    return {
      dialogTableVisible: false,
      textvalue: "",
      entrypicture: "",
      diffinfo: [],
      sumaryinfo: [],
      playeropinions: ["picDiff-rate", "domDiff-rate"],
      picdiffdatas: [],
      domdiffdatas: [],
      eachplayerdatas: [],
    };
  },
  mounted() {
    this.getpagehistory();
  },
  methods: {
    tableRowClassName(row) {
      if (row.column.label === "结果") {
        if (row.row.runcoderesult === "Fail") {
          return "color: red";
        } else if (row.row.runcoderesult === "SUCESS") {
          return "color: rgb(103 194 58)";
        }
      } else {
        return "";
      }
    },
    handleClick(row) {
      console.log(row);
      try {
        const file = row.filename;
        const obj = {
          file: file,
          dbname: "uatautorundiff",
        };
        this.$http
          .Tsearch(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.dialogTableVisible = true;
              this.textvalue = res.data[0].diffdom;
              this.entrypicture = res.data[0].diffimg;
              this.$message({
                message: "查询成功",
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
    // 历史查询
    getpagehistory() {
      // console.log(this.radiofile);
      try {
        // const file = this.radiofile;
        const obj = {
          dbname: "uatautorundiff",
        };
        this.$http
          .getuatpageinfo(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.diffinfo = res.data;
              if (res.data && res.data !== "no data") {
                res.data.forEach((eleplayer) => {
                  this.picdiffdatas.push(parseFloat(eleplayer.diffrate));
                  this.domdiffdatas.push(parseFloat(eleplayer.domrate));
                  this.eachplayerdatas.push(eleplayer.date.slice(5, 10));
                });
                this.picdiffdatas.reverse();
                this.domdiffdatas.reverse();
                this.eachplayerdatas.reverse();
              } else {
                this.picdiffdatas = [];
                this.domdiffdatas = [];
              }
              var uatfail = this.resolvesucrate(res.data);
              var uatlen = res.data.length;
              var firstdiffratesdata = this.revesediffrate(res.data);
              var firstdomratesdata = this.revesedomrate(res.data);
              var firstobj = {
                pagecategory: "uat播放页",
                length: res.data === "no data" ? 0 : res.data.length,
                nums: 1,
                successrate:
                  uatfail === 0
                    ? 100 + "%"
                    : this.resolenum((uatlen - uatfail) / uatlen) + "%",
                picrates:
                  firstdiffratesdata[0] +
                  "%" +
                  " - " +
                  firstdiffratesdata[firstdiffratesdata.length - 1] +
                  "%",
                domrates:
                  firstdomratesdata[0] +
                  "%" +
                  " - " +
                  firstdomratesdata[firstdomratesdata.length - 1] +
                  "%",
              };
              this.sumaryinfo.push(firstobj);
              this.$nextTick(function () {
                this.drawplayerPies("player");
              });
              this.$message({
                message: "查询成功",
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
    // 计算成功率
    resolvesucrate(data) {
      var prenum = 0;
      if (data !== "no data") {
        const newdatas = data;
        newdatas.forEach((item) => {
          if (item.runcoderesult === "Fail") {
            prenum++;
          }
        });
      } else {
        prenum = 0;
      }
      return prenum;
    },
    // 保留两位数
    resolenum(newnums) {
      let num = newnums * 100;
      let numStr = num.toString();
      let index = numStr.indexOf(".");
      let result = numStr.slice(0, index + 3);
      return result;
    },
    // 处理rate排序
    revesediffrate(data) {
      const newdiffratedatas = [];
      if (data !== "no data") {
        data.forEach((item) => {
          newdiffratedatas.push(parseFloat(item.diffrate));
        });
        var minnewdiffratedatas = this.mintomax(newdiffratedatas);
      } else {
        var minnewdiffratedatas = [0, 0];
      }

      return minnewdiffratedatas;
    },
    // 处理domrate排序
    revesedomrate(data) {
      const newdomratedatas = [];
      if (data !== "no data") {
        data.forEach((item) => {
          newdomratedatas.push(parseFloat(item.domrate));
        });
        var minnewdomratedatas = this.mintomax(newdomratedatas);
      } else {
        var minnewdomratedatas = [0, 0];
      }
      return minnewdomratedatas;
    },
    // 从小到大排序
    mintomax(arr) {
      const newarr = arr;
      for (var i = 1; i < newarr.length; i++) {
        //内层循环：控制每轮比较次数  数组长度-i
        for (var j = 0; j < newarr.length - i; j++) {
          //如果当前的元素(j)大于下一个元素(j+1)，则交换位置
          if (newarr[j] > newarr[j + 1]) {
            var t = newarr[j];
            newarr[j] = newarr[j + 1];
            newarr[j + 1] = t;
          }
        }
      }
      return newarr;
    },
    drawplayerPies(id) {
      var me = this;
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        legend: {
          data: this.playeropinions,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.eachplayerdatas,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "picDiff-rate",
            type: "line",
            smooth: true,
            data: this.picdiffdatas,
          },
          {
            name: "domDiff-rate",
            type: "line",
            smooth: true,
            data: this.domdiffdatas,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.newwave {
  margin: 20px;
}
.domdiffinfo {
  height: 830px;
  overflow-y: auto;
  width: 100%;
  margin-top: 15px;
}
.picturetitle {
  display: flow-root;
  text-align: left;
  margin: 10px;
  font-size: 20px;
  font-weight: 400;
  color: rgb(94, 109, 130);
}
.textinfo {
  height: 830px;
  overflow-y: auto;
  width: 100%;
  margin-top: 15px;
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
