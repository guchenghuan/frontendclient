<template>
  <div class="titles">
    <div style="margin-top: 10px">
      <div style="display: inline-block; width: 50%">transfersize</div>
      <div style="display: inline-block">contentSize</div>
    </div>
    <div
      id="score"
      style="width: 50%; height: 400px; display: inline-block"
    ></div>
    <div
      id="ttfb"
      style="width: 50%; height: 400px; display: inline-block"
    ></div>
    <div style="margin-top: 10px; margin-bottom: 10px">domains-speed</div>
    <div
      id="speed"
      style="width: 100%; height: 600px; display: inline-block"
    ></div>
    <div style="margin-top: 10px; margin-bottom: 10px">try</div>
    <div
      id="try"
      style="width: 100%; height: 600px; display: inline-block"
    ></div>
    <div class="titles">
      <el-radio-group v-model="radio1">
        <el-radio-button label="域名-历史数据"></el-radio-button>
      </el-radio-group>
    </div>
    <el-table
      :data="tableDatadomain"
      border
      stripe
      style="width: 100%"
      :cell-style="tableRowClassNamedomain"
    >
      <el-table-column prop="name" label="域名" width="300"> </el-table-column>
      <el-table-column prop="transo" label="传输大小-1" width="120">
      </el-table-column>
      <el-table-column prop="transt" label="传输大小-2" width="120">
      </el-table-column>
      <el-table-column prop="transrate" label="传输同比"> </el-table-column>
      <el-table-column prop="contento" label="文本大小-1" width="120">
      </el-table-column>
      <el-table-column prop="contentt" label="文本大小-2" width="120">
      </el-table-column>
      <el-table-column prop="contentrate" label="文本同比"> </el-table-column>
      <el-table-column prop="speedo" label="下载速度-1" width="120">
      </el-table-column>
      <el-table-column prop="speedt" label="下载速度-2" width="120">
      </el-table-column>
      <el-table-column prop="speedrate" label="速度同比"> </el-table-column>
    </el-table>
    <div class="titles">
      <el-radio-group v-model="radio2">
        <el-radio-button label="数据归纳汇总"></el-radio-button>
      </el-radio-group>
    </div>
    <el-table
      :data="tableDatasummary"
      border
      style="width: 100%"
      :cell-style="tableRowClassNamesummary"
    >
      <el-table-column prop="reql" label="请求总数-1" width="110">
      </el-table-column>
      <el-table-column prop="reqn" label="请求总数-2" width="110">
      </el-table-column>
      <el-table-column prop="reqrate" label="请求同比"> </el-table-column>
      <el-table-column prop="doml" label="域名-1" width="110">
      </el-table-column>
      <el-table-column prop="domn" label="域名-2" width="110">
      </el-table-column>
      <el-table-column prop="domrate" label="域名同比"> </el-table-column>
      <el-table-column prop="transl" label="传输大小-1" width="110">
      </el-table-column>
      <el-table-column prop="transn" label="传输大小-2" width="110">
      </el-table-column>
      <el-table-column prop="transrate" label="传输同比"> </el-table-column>
      <el-table-column prop="conl" label="文本大小-1" width="110">
      </el-table-column>
      <el-table-column prop="conn" label="文本大小-2" width="110">
      </el-table-column>
      <el-table-column prop="conrate" label="文本同比"> </el-table-column>
    </el-table>
    <div class="titles">
      <el-radio-group v-model="radio3">
        <el-radio-button label="文本大小比较"></el-radio-button>
      </el-radio-group>
    </div>
    <el-table
      :data="tableDatacontent"
      border
      style="width: 100%"
      :cell-style="tableRowClassNamecontent"
    >
      <el-table-column prop="htmll" label="html-1" width="90">
      </el-table-column>
      <el-table-column prop="htmln" label="html-2" width="90">
      </el-table-column>
      <el-table-column prop="htmlrate" label="html同比"> </el-table-column>
      <el-table-column prop="cssl" label="css-1" width="90"> </el-table-column>
      <el-table-column prop="cssn" label="css-2" width="90"> </el-table-column>
      <el-table-column prop="cssrate" label="css同比"> </el-table-column>
      <el-table-column prop="jsl" label="javascript-1" width="110">
      </el-table-column>
      <el-table-column prop="jsn" label="javascript-2" width="110">
      </el-table-column>
      <el-table-column prop="jsrate" label="js同比"> </el-table-column>
      <el-table-column prop="imgl" label="image-1" width="90">
      </el-table-column>
      <el-table-column prop="imgn" label="image-2" width="90">
      </el-table-column>
      <el-table-column prop="imgrate" label="img同比"> </el-table-column>
      <el-table-column prop="otherl" label="other-1" width="90">
      </el-table-column>
      <el-table-column prop="othern" label="other-2" width="90">
      </el-table-column>
      <el-table-column prop="otherrate" label="其他同比"> </el-table-column>
    </el-table>
    <div style="display: inline-block; width: 49%; margin-right: 10px">
      <div class="titles">
        <el-radio-group v-model="radio4">
          <el-radio-button label="历史较大资源文件如下"></el-radio-button>
        </el-radio-group>
      </div>
      <el-table
        :data="tableDatalargesto"
        border
        stripe
        height="550"
        style="width: 100%"
      >
        <el-table-column prop="name" label="文件名"> </el-table-column>
        <el-table-column prop="transferSize" label="传输大小" width="200">
        </el-table-column>
        <el-table-column prop="contentSize" label="文本大小" width="200">
        </el-table-column>
      </el-table>
    </div>
    <div style="display: inline-block; width: 49%">
      <div class="titles">
        <el-radio-group v-model="radio5">
          <el-radio-button label="本次较大资源文件如下"></el-radio-button>
        </el-radio-group>
      </div>
      <el-table
        :data="tableDatalargestt"
        border
        stripe
        height="550"
        style="width: 100%"
      >
        <el-table-column prop="name" label="文件名"> </el-table-column>
        <el-table-column prop="transferSize" label="传输大小" width="200">
        </el-table-column>
        <el-table-column prop="contentSize" label="文本大小" width="200">
        </el-table-column>
      </el-table>
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
import BackToTop from "@/components/BackToTop";
export default {
  name: "webquailtyinfo",
  components: { BackToTop },
  data() {
    return {
      radio1: "域名-历史数据",
      radio2: "数据归纳汇总",
      radio3: "文本大小比较",
      radio4: "历史较大资源文件如下",
      radio5: "本次较大资源文件如下",
      tableDatadomain: [],
      tableDatasummary: [],
      tableDatacontent: [],
      tableDatalargesto: [],
      tableDatalargestt: [],
      eachopinions: ["html(KB)", "js(KB)", "css(KB)", "img(KB)", "other(KB)"],
      domainopinions: [
        "s1.hdslb.com",
        "upos-sz-mirrorhw.bilivideo.com",
        "upos-sz-mirrorcos.bilivideo.com",
        "data.bilibili.com",
        "i0.hdslb.com",
        "static.hdslb.com",
        "i2.hdslb.com",
        "i1.hdslb.com",
      ],
      eachdatas: [],
      scorehtmldata: [],
      scorecssdata: [],
      scorejsdata: [],
      scoreimgdata: [],
      scoreotherdata: [],
      ttfbhtmldata: [],
      ttfbcssdata: [],
      ttfbjsdata: [],
      ttfbimgdata: [],
      ttfbotherdata: [],
      sodata: [],
      uposhwdata: [],
      uposcosdata: [],
      Datadata: [],
      ifdata: [],
      staticdata: [],
      isdata: [],
      itdata: [],
    };
  },
  mounted() {
    this.gethistorydata();
  },
  methods: {
    drawPiesscore(id) {
      var me = this;
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        legend: {
          data: this.eachopinions,
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
            data: this.eachdatas,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "html(KB)",
            type: "line",
            smooth: true,
            data: this.scorehtmldata,
          },
          {
            name: "css(KB)",
            type: "line",
            smooth: true,
            data: this.scorecssdata,
          },
          {
            name: "js(KB)",
            type: "line",
            smooth: true,
            data: this.scorejsdata,
          },
          {
            name: "img(KB)",
            type: "line",
            smooth: true,
            data: this.scoreimgdata,
          },
          {
            name: "other(KB)",
            type: "line",
            smooth: true,
            data: this.scoreotherdata,
          },
        ],
      });
    },
    drawPiesttfb(id) {
      var me = this;
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        legend: {
          data: this.eachopinions,
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
            data: this.eachdatas,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "html(KB)",
            type: "line",
            smooth: true,
            data: this.ttfbhtmldata,
          },
          {
            name: "css(KB)",
            type: "line",
            smooth: true,
            data: this.ttfbcssdata,
          },
          {
            name: "js(KB)",
            type: "line",
            smooth: true,
            data: this.ttfbjsdata,
          },
          {
            name: "img(KB)",
            type: "line",
            smooth: true,
            data: this.ttfbimgdata,
          },
          {
            name: "other(KB)",
            type: "line",
            smooth: true,
            data: this.ttfbotherdata,
          },
        ],
      });
    },
    drawPiesspeed(id) {
      var me = this;
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        legend: {
          data: this.domainopinions,
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
            data: this.eachdatas,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "s1.hdslb.com",
            type: "line",
            smooth: true,
            data: this.sodata,
          },
          {
            name: "upos-sz-mirrorhw.bilivideo.com",
            type: "line",
            smooth: true,
            data: this.uposhwdata,
          },
          {
            name: "upos-sz-mirrorcos.bilivideo.com",
            type: "line",
            smooth: true,
            data: this.uposcosdata,
          },
          {
            name: "data.bilibili.com",
            type: "line",
            smooth: true,
            data: this.Datadata,
          },
          {
            name: "i0.hdslb.com",
            type: "line",
            smooth: true,
            data: this.ifdata,
          },
          {
            name: "static.hdslb.com",
            type: "line",
            smooth: true,
            data: this.staticdata,
          },
          {
            name: "i2.hdslb.com",
            type: "line",
            smooth: true,
            data: this.isdata,
          },
          {
            name: "i1.hdslb.com",
            type: "line",
            smooth: true,
            data: this.itdata,
          },
        ],
      });
    },
    drawPiestry(id) {
      var me = this;
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        legend: {},
        tooltip: {
          trigger: "axis",
          showContent: false,
        },
        dataset: {
          source: [
            ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
            ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
          ],
        },
        xAxis: { type: "category", boundaryGap: false },
        yAxis: { gridIndex: 0 },
        grid: { top: "55%", containLabel: true },
        series: [
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          {
            type: "pie",
            id: "pie",
            radius: "30%",
            center: ["50%", "25%"],
            label: {
              formatter: "{b}: {@2012} ({d}%)",
            },
            encode: {
              itemName: "product",
              value: "2012",
              tooltip: "2012",
            },
          },
        ],
      });

      setTimeout(function () {
        this.charts.on("updateAxisPointer", function (event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            this.charts.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)",
                },
                encode: {
                  value: dimension,
                  tooltip: dimension,
                },
              },
            });
          }
        });
      }, 0);
    },
    tableRowClassNamedomain(row, column) {
      if (row.column.label === "传输同比") {
        if (row.row.transrate.indexOf("下降") != -1) {
          return "color: red";
        } else {
          return "color: rgb(103 194 58)";
        }
      } else if (row.column.label === "文本同比") {
        if (row.row.contentrate.indexOf("下降") != -1) {
          return "color: red";
        } else {
          return "color: rgb(103 194 58)";
        }
      } else if (row.column.label === "速度同比") {
        if (row.row.speedrate.indexOf("下降") != -1) {
          return "color: red";
        } else {
          return "color: rgb(103 194 58)";
        }
      } else {
        return "";
      }
    },
    tableRowClassNamesummary(row, column) {
      // 文本同比传输同比域名同比请求同比
      if (row.column.label === "文本同比") {
        if (row.row.conrate.indexOf("下降") != -1) {
          return "color: red";
        } else {
          return "color: rgb(103 194 58)";
        }
      } else if (row.column.label === "传输同比") {
        if (row.row.transrate.indexOf("下降") != -1) {
          return "color: red";
        } else {
          return "color: rgb(103 194 58)";
        }
      } else if (row.column.label === "域名同比") {
        if (row.row.domrate.indexOf("下降") != -1) {
          return "color: red";
        } else {
          return "color: rgb(103 194 58)";
        }
      } else if (row.column.label === "请求同比") {
        if (row.row.reqrate.indexOf("下降") != -1) {
          return "color: red";
        } else {
          return "color: rgb(103 194 58)";
        }
      } else {
        return "";
      }
    },
    tableRowClassNamecontent(row, column) {
      if (row.column.label === "html同比") {
        if (row.row.htmlrate.indexOf("下降") != -1) {
          return "color: red";
        } else {
          return "color: rgb(103 194 58)";
        }
      } else if (row.column.label === "css同比") {
        if (row.row.cssrate.indexOf("下降") != -1) {
          return "color: red";
        } else {
          return "color: rgb(103 194 58)";
        }
      } else if (row.column.label === "js同比") {
        if (row.row.jsrate.indexOf("下降") != -1) {
          return "color: red";
        } else {
          return "color: rgb(103 194 58)";
        }
      } else if (row.column.label === "img同比") {
        if (row.row.imgrate.indexOf("下降") != -1) {
          return "color: red";
        } else {
          return "color: rgb(103 194 58)";
        }
      } else if (row.column.label === "其他同比") {
        if (row.row.otherrate.indexOf("下降") != -1) {
          return "color: red";
        } else {
          return "color: rgb(103 194 58)";
        }
      } else {
        return "";
      }
    },
    calculate(num1, num2) {
      if (num1.includes("KB")) {
        num1 = parseFloat(num1) / 1024;
      } else if (num1.includes("MB")) {
        num1 = parseFloat(num1);
      } else {
        num1 = parseFloat(num1) / 1024 / 1024;
      }
      if (num2.includes("KB")) {
        num2 = parseFloat(num2) / 1024;
      } else if (num2.includes("MB")) {
        num2 = parseFloat(num2);
      } else {
        num2 = parseFloat(num2) / 1024 / 1024;
      }
      return num2 <= num1
        ? "上升 " + this.resolenum((num1 - num2) / num1)
        : "下降 " + this.resolenum((num2 - num1) / num1);
    },
    resolenum(newnums) {
      let num = newnums * 100;
      let numStr = num.toString();
      let index = numStr.indexOf(".");
      let result = numStr.slice(0, index + 3);
      return result;
    },
    resolespeednum(newnums) {
      let num = newnums;
      let numStr = num.toString();
      let index = numStr.indexOf(".");
      let result = numStr.slice(0, index + 3);
      return result;
    },
    resolespeed(numo, numt) {
      if (numo.includes("KB")) {
        return (
          this.resolespeednum(
            ((parseFloat(numo) / parseFloat(numt)) * 1000) / 1024
          ) + " MB/s"
        );
      } else if (numo.includes("MB")) {
        return (
          this.resolespeednum((parseFloat(numo) / parseFloat(numt)) * 1000) +
          " MB/s"
        );
      } else {
        return (
          this.resolespeednum(
            ((parseFloat(numo) / parseFloat(numt)) * 1000) / 1024 / 1024
          ) + " MB/s"
        );
      }
    },
    resolespeedline(transfer, timevalue) {
      if (transfer.includes("KB")) {
        return this.resolespeednum(
          ((parseFloat(transfer) / parseFloat(timevalue)) * 1000) / 1024
        );
      } else if (transfer.includes("MB")) {
        return this.resolespeednum(
          (parseFloat(transfer) / parseFloat(timevalue)) * 1000
        );
      } else {
        return this.resolespeednum(
          ((parseFloat(transfer) / parseFloat(timevalue)) * 1000) / 1024 / 1024
        );
      }
    },
    getvalue(arr, sumvalue) {
      var newvalue;
      arr.forEach((element) => {
        if (element.name === sumvalue) {
          //   console.log(element.value);
          newvalue = element.value;
        }
      });
      return newvalue;
    },
    getcontentvalue(arr, sumvalue) {
      var newcontentvalue;
      arr.forEach((element) => {
        if (element.name === sumvalue) {
          //   console.log(element.value);
          newcontentvalue = element.contentSize;
        }
      });
      return newcontentvalue;
    },
    getcontentsize(arr, sumvalue) {
      var newcontentsize;
      arr.forEach((element) => {
        if (element.name === sumvalue) {
          //   console.log(element.value);
          newcontentsize = element.contentSize;
        }
      });
      return parseFloat(newcontentsize);
    },
    gettransfersize(arr, sumvalue) {
      var newtransfersize;
      arr.forEach((element) => {
        if (element.name === sumvalue) {
          //   console.log(element.value);
          newtransfersize = element.transferSize;
        }
      });
      return parseFloat(newtransfersize);
    },
    gethistorydata() {
      try {
        const obj = {
          option: "gethistorydata",
        };
        this.$http
          .gethistorydata(obj)
          .then((res) => {
            if (res.msg === "success") {
              res.domaintransfer.forEach((element) => {
                this.eachdatas.push(element.Date.slice(5, 10));
              });
              this.eachdatas.reverse();
              // 处理domain trans
              var newtableDatadomain = [];
              var lastdomaintransfer = res.domaintransfer[1].data;
              var nowdomaintransfer = res.domaintransfer[0].data;
              for (var i = 0; i < nowdomaintransfer.length; i++) {
                for (var j = 0; j < lastdomaintransfer.length; j++) {
                  if (
                    nowdomaintransfer[i].name === lastdomaintransfer[j].name
                  ) {
                    const newobjdomain = {
                      name: nowdomaintransfer[i].name,
                      transo: lastdomaintransfer[j].transfervalue,
                      transt: nowdomaintransfer[i].transfervalue,
                      transrate:
                        this.calculate(
                          lastdomaintransfer[j].transfervalue,
                          nowdomaintransfer[i].transfervalue
                        ) + " %",
                      contento: lastdomaintransfer[j].Contentvalue,
                      contentt: nowdomaintransfer[i].Contentvalue,
                      contentrate:
                        this.calculate(
                          lastdomaintransfer[j].Contentvalue,
                          nowdomaintransfer[i].Contentvalue
                        ) + " %",
                    };
                    newtableDatadomain.push(newobjdomain);
                  }
                }
              }
              // 处理domain 用时
              var newtableDomain = [];
              var lastDomain = res.Domain[1].data;
              var nowDomain = res.Domain[0].data;
              for (var i = 0; i < nowDomain.length; i++) {
                for (var j = 0; j < lastDomain.length; j++) {
                  if (nowDomain[i].name === lastDomain[j].name) {
                    const domobj = {
                      name: nowDomain[i].name,
                      speedo: lastDomain[j].value,
                      speedt: nowDomain[i].value,
                    };
                    newtableDomain.push(domobj);
                  }
                }
              }

              // 处理最终数据
              var latestdomaindata = [];
              for (var i = 0; i < newtableDatadomain.length; i++) {
                for (var j = 0; j < newtableDomain.length; j++) {
                  if (newtableDatadomain[i].name === newtableDomain[j].name) {
                    var lastspeed = this.resolespeed(
                      newtableDatadomain[i].transo,
                      newtableDomain[j].speedo
                    );
                    var nowspeed = this.resolespeed(
                      newtableDatadomain[i].transt,
                      newtableDomain[j].speedt
                    );
                    const latestobj = {
                      name: newtableDatadomain[i].name,
                      transo: newtableDatadomain[i].transo,
                      transt: newtableDatadomain[i].transt,
                      transrate: newtableDatadomain[i].transrate,
                      contento: newtableDatadomain[i].contento,
                      contentt: newtableDatadomain[i].contentt,
                      contentrate: newtableDatadomain[i].contentrate,
                      speedo: lastspeed,
                      speedt: nowspeed,
                      speedrate: this.calculate(nowspeed, lastspeed) + " %",
                    };
                    latestdomaindata.push(latestobj);
                  }
                }
              }

              // 处理汇总数据
              var newtableDatasummary = [];
              var lastsummary = res.summary[1].data;
              var nowsummary = res.summary[0].data;
              const newobj = {
                reql: this.getvalue(lastsummary, "Total requests"),
                reqn: this.getvalue(nowsummary, "Total requests"),
                reqrate:
                  this.calculate(
                    this.getvalue(lastsummary, "Total requests"),
                    this.getvalue(nowsummary, "Total requests")
                  ) + " %",
                doml: this.getvalue(lastsummary, "Total domains"),
                domn: this.getvalue(nowsummary, "Total domains"),
                domrate:
                  this.calculate(
                    this.getvalue(lastsummary, "Total domains"),
                    this.getvalue(nowsummary, "Total domains")
                  ) + " %",
                transl: this.getvalue(lastsummary, "Total transfer size"),
                transn: this.getvalue(nowsummary, "Total transfer size"),
                transrate:
                  this.calculate(
                    this.getvalue(lastsummary, "Total transfer size"),
                    this.getvalue(nowsummary, "Total transfer size")
                  ) + " %",
                conl: this.getvalue(lastsummary, "Total content size"),
                conn: this.getvalue(nowsummary, "Total content size"),
                conrate:
                  this.calculate(
                    this.getvalue(lastsummary, "Total content size"),
                    this.getvalue(nowsummary, "Total content size")
                  ) + " %",
              };
              newtableDatasummary.push(newobj);

              // 处理文本大小
              var newtableDatacontent = [];
              var lastcontent = res.content[1].data;
              var nowcontent = res.content[0].data;
              const contentobj = {
                htmll: this.getcontentvalue(lastcontent, "html"),
                htmln: this.getcontentvalue(nowcontent, "html"),
                htmlrate:
                  this.calculate(
                    this.getcontentvalue(lastcontent, "html"),
                    this.getcontentvalue(nowcontent, "html")
                  ) + " %",
                cssl: this.getcontentvalue(lastcontent, "css"),
                cssn: this.getcontentvalue(nowcontent, "css"),
                cssrate:
                  this.calculate(
                    this.getcontentvalue(lastcontent, "css"),
                    this.getcontentvalue(nowcontent, "css")
                  ) + " %",
                jsl: this.getcontentvalue(lastcontent, "javascript"),
                jsn: this.getcontentvalue(nowcontent, "javascript"),
                jsrate:
                  this.calculate(
                    this.getcontentvalue(lastcontent, "javascript"),
                    this.getcontentvalue(nowcontent, "javascript")
                  ) + " %",
                imgl: this.getcontentvalue(lastcontent, "image"),
                imgn: this.getcontentvalue(nowcontent, "image"),
                imgrate:
                  this.calculate(
                    this.getcontentvalue(lastcontent, "image"),
                    this.getcontentvalue(nowcontent, "image")
                  ) + " %",
                otherl: this.getcontentvalue(lastcontent, "other"),
                othern: this.getcontentvalue(nowcontent, "other"),
                otherrate:
                  this.calculate(
                    this.getcontentvalue(lastcontent, "other"),
                    this.getcontentvalue(nowcontent, "other")
                  ) + " %",
              };
              newtableDatacontent.push(contentobj);

              // 处理contentsize
              var newscorehtmldata = [];
              var newscorecssdata = [];
              var newscorejsdata = [];
              var newscoreimgdata = [];
              var newscoreotherdata = [];
              res.content.forEach((ele) => {
                const htmlconsize = this.getcontentsize(ele.data, "html");
                newscorehtmldata.push(htmlconsize);
                const cssconsize = this.getcontentsize(ele.data, "css");
                newscorecssdata.push(cssconsize);
                const jsconsize =
                  this.getcontentsize(ele.data, "javascript") * 1024;
                newscorejsdata.push(jsconsize);
                const imgconsize = this.getcontentsize(ele.data, "image");
                newscoreimgdata.push(imgconsize);
                const otherconsize =
                  this.getcontentsize(ele.data, "other") * 1024;
                newscoreotherdata.push(otherconsize);
              });
              this.scorehtmldata = newscorehtmldata.reverse();
              this.scorecssdata = newscorecssdata.reverse();
              this.scorejsdata = newscorejsdata.reverse();
              this.scoreimgdata = newscoreimgdata.reverse();
              this.scoreotherdata = newscoreotherdata.reverse();

              // 处理transersize
              var newttfbhtmldata = [];
              var newttfbcssdata = [];
              var newttfbjsdata = [];
              var newttfbimgdata = [];
              var newttfbotherdata = [];
              res.content.forEach((ele) => {
                const htmlconsize = this.gettransfersize(ele.data, "html");
                newttfbhtmldata.push(htmlconsize);
                const cssconsize = this.gettransfersize(ele.data, "css");
                newttfbcssdata.push(cssconsize);
                const jsconsize =
                  this.gettransfersize(ele.data, "javascript") * 1024;
                newttfbjsdata.push(jsconsize);
                const imgconsize = this.gettransfersize(ele.data, "image");
                newttfbimgdata.push(imgconsize);
                const otherconsize =
                  this.gettransfersize(ele.data, "other") * 1024;
                newttfbotherdata.push(otherconsize);
              });
              this.ttfbhtmldata = newttfbhtmldata.reverse();
              this.ttfbcssdata = newttfbcssdata.reverse();
              this.ttfbjsdata = newttfbjsdata.reverse();
              this.ttfbimgdata = newttfbimgdata.reverse();
              this.ttfbotherdata = newttfbotherdata.reverse();

              // resolve speed data   resolespeedline
              var speedlen = res.Domain.length;
              var domainspeeds = [];
              for (var item = 0; item < speedlen; item++) {
                const nowdomaindata = res.Domain[item].data;
                const nowdomaintransterdata = res.domaintransfer[item].data;
                for (
                  var itemdomain = 0;
                  itemdomain < nowdomaindata.length;
                  itemdomain++
                ) {
                  for (
                    var itemtranster = 0;
                    itemtranster < nowdomaintransterdata.length;
                    itemtranster++
                  ) {
                    if (
                      nowdomaindata[itemdomain].name ===
                      nowdomaintransterdata[itemtranster].name
                    ) {
                      var domainspeed = {
                        name: nowdomaindata[itemdomain].name,
                        speed:
                          this.resolespeedline(
                            nowdomaintransterdata[itemtranster].transfervalue,
                            nowdomaindata[itemdomain].value
                          ) < 1
                            ? this.resolespeednum(
                                this.resolespeedline(
                                  nowdomaintransterdata[itemtranster]
                                    .transfervalue,
                                  nowdomaindata[itemdomain].value
                                ) * 10
                              )
                            : this.resolespeedline(
                                nowdomaintransterdata[itemtranster]
                                  .transfervalue,
                                nowdomaindata[itemdomain].value
                              ),
                      };
                      domainspeeds.push(domainspeed);
                    }
                  }
                }
              }
              domainspeeds.forEach((eachspeed) => {
                if (eachspeed.name === "s1.hdslb.com") {
                  this.sodata.push(eachspeed.speed);
                } else if (
                  eachspeed.name === "upos-sz-mirrorhw.bilivideo.com"
                ) {
                  this.uposhwdata.push(eachspeed.speed);
                } else if (
                  eachspeed.name === "upos-sz-mirrorcos.bilivideo.com"
                ) {
                  this.uposcosdata.push(eachspeed.speed);
                } else if (eachspeed.name === "data.bilibili.com") {
                  this.Datadata.push(eachspeed.speed);
                } else if (eachspeed.name === "i0.hdslb.com") {
                  this.ifdata.push(eachspeed.speed);
                } else if (eachspeed.name === "static.hdslb.com") {
                  this.staticdata.push(eachspeed.speed);
                } else if (eachspeed.name === "i2.hdslb.com") {
                  this.isdata.push(eachspeed.speed);
                } else if (eachspeed.name === "i1.hdslb.com") {
                  this.itdata.push(eachspeed.speed);
                }
              });
              this.sodata = this.sodata.reverse();
              this.uposhwdata = this.uposhwdata.reverse();
              this.uposcosdata = this.uposcosdata.reverse();
              this.Datadata = this.Datadata.reverse();
              this.ifdata = this.ifdata.reverse();
              this.staticdata = this.staticdata.reverse();
              this.isdata = this.isdata.reverse();
              this.itdata = this.itdata.reverse();

              this.tableDatasummary = newtableDatasummary;
              this.tableDatacontent = newtableDatacontent;
              this.tableDatadomain = latestdomaindata;
              this.tableDatalargesto = res.LargesAsserts[1].data;
              this.tableDatalargestt = res.LargesAsserts[0].data;

              this.$nextTick(function () {
                this.drawPiesscore("score");
                this.drawPiesttfb("ttfb");
                this.drawPiesspeed("speed");
                this.drawPiestry("try");
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
  },
};
</script>

<style lang="scss" scoped>
.newwave {
  margin: 20px;
}
.titles {
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>

   