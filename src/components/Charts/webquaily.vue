<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div class="container">
    <div style="margin-bottom: 10px">
      竞品数据比对表
      <span style="margin-left: 30px; color: red"
        >A站访问403 紧急解决中...
      </span>
    </div>
    <div
      id="main"
      style="width: 100%; height: 800px; overflow: auto hidden"
    ></div>
    <div style="display: inline-block; margin-top: 10px">本站数据对照</div>
    <el-link
      href="http://172.16.39.188:9527/#/webquality/webquailtyinfo"
      type="warning"
      style="margin-left: 30px"
      >查看历史详情</el-link
    >
    <div
      id="own"
      style="width: 100%; height: 800px; overflow: auto hidden"
    ></div>
    <div style="display: inline-block; margin-top: 10px">
      播放器加载--开始/结束(时间)
    </div>
    <div
      style="
        display: inline-block;
        float: right;
        margin-top: 10px;
        margin-bottom: 10px;
      "
    >
      <span style="margin-right: 15px">时间筛选</span>
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="timerchange"
      >
      </el-date-picker>
    </div>
    <div
      id="player"
      style="width: 100%; height: 800px; overflow: auto hidden"
    ></div>
    <div style="margin-top: 10px">
      <div>最大内容绘制</div>
      <div
        id="fcp"
        style="width: 100%; height: 500px; display: inline-block"
      ></div>
      <div>首屏</div>
    </div>
    <div
      id="shoup"
      style="width: 100%; height: 500px; display: inline-block"
    ></div>
    <div style="margin-top: 10px">
      <div>性能得分</div>
    </div>
    <div
      id="score"
      style="width: 100%; height: 500px; display: inline-block"
    ></div>
    <div>TTFB</div>
    <div
      id="ttfb"
      style="width: 100%; height: 500px; display: inline-block"
    ></div>
    <div style="margin-top: 10px">
      <div>首次内容绘制</div>
    </div>
    <div
      id="fpaint"
      style="width: 100%; height: 500px; display: inline-block"
    ></div>
    <div>页面绘制99%</div>
    <div
      id="lpaint"
      style="width: 100%; height: 500px; display: inline-block"
    ></div>
    <div style="margin-top: 10px">
      <div>CLS</div>
    </div>
    <div
      id="cls"
      style="width: 100%; height: 500px; display: inline-block"
    ></div>
    <div>Speed-index</div>
    <div
      id="speed"
      style="width: 100%; height: 500px; display: inline-block"
    ></div>
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
import { SUCCESS } from "dropzone";
import BackToTop from "@/components/BackToTop";
export default {
  components: { BackToTop },
  name: "bridge",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value2: "",
      charts: "",
      opinion: ["bilibili", "acfun", "aiqiyi", "tencent", "xigua", "youku"],
      opinions: ["bilibili-last", "bilibili-new"],
      eachopinions: [
        "bilibili",
        "acfun",
        "aiqiyi",
        "tencent",
        "xigua",
        "youku",
      ],
      playeropinions: ["PlayerMediaLoading-start", "PlayerMediaLoading-end"],
      playerstarttimedata: [],
      playerendtimedata: [],
      xdata: [
        "性能得分",
        "TTFB",
        "首次内容绘制",
        "最大内容绘制",
        "CLS",
        "Speed-Index",
        "页面渲染99%",
        "首屏",
      ],
      xdatas: [
        "性能得分",
        "TTFB",
        "首次内容绘制",
        "最大内容绘制",
        "CLS",
        "Speed-Index",
        "页面渲染99%",
        "首屏",
        "img-size(kb)",
        "Html-size(kb)",
        "Css-size(kb)",
        "Js-size(MB)",
        "Total-size(MB)",
        "Fully-Loaded",
      ],
      eachdatas: [],
      eachplayerdatas: [],
      bilibiliData: [],
      xiguaData: [],
      tencentData: [],
      aiqiyiData: [],
      youkuData: [],
      acfunData: [],
      lastbilibiliData: [],

      fcpacfundata: [],
      fcpaiqiyidata: [],
      fcptencentdata: [],
      fcpxiguadata: [],
      fcpbilibilidata: [],
      fcpyoukudata: [],

      shoupacfundata: [],
      shoupaiqiyidata: [],
      shouptencentdata: [],
      shoupxiguadata: [],
      shoupbilibilidata: [],
      shoupyoukudata: [],

      scoreacfundata: [],
      scoreaiqiyidata: [],
      scoretencentdata: [],
      scorexiguadata: [],
      scorebilibilidata: [],
      scoreyoukudata: [],

      ttfbacfundata: [],
      ttfbaiqiyidata: [],
      ttfbtencentdata: [],
      ttfbxiguadata: [],
      ttfbbilibilidata: [],
      ttfbyoukudata: [],

      fpaintacfundata: [],
      fpaintaiqiyidata: [],
      fpainttencentdata: [],
      fpaintxiguadata: [],
      fpaintbilibilidata: [],
      fpaintyoukudata: [],

      lpaintacfundata: [],
      lpaintaiqiyidata: [],
      lpainttencentdata: [],
      lpaintxiguadata: [],
      lpaintbilibilidata: [],
      lpaintyoukudata: [],

      clsacfundata: [],
      clsaiqiyidata: [],
      clstencentdata: [],
      clsxiguadata: [],
      clsbilibilidata: [],
      clsyoukudata: [],

      speedacfundata: [],
      speedaiqiyidata: [],
      speedtencentdata: [],
      speedxiguadata: [],
      speedbilibilidata: [],
      speedyoukudata: [],
    };
  },
  //调用
  mounted() {
    this.getdata();
  },
  methods: {
    drawPie(id) {
      var me = this;
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        legend: {
          data: this.opinion,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
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
            data: this.xdata,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "bilibili",
            type: "bar",
            barWidth: 20,
            label: {
              show: true,
              position: "top",
            },
            data: this.bilibiliData,
          },
          {
            name: "xigua",
            type: "bar",
            barWidth: 20,
            label: {
              show: true,
              position: "top",
            },
            data: this.xiguaData,
          },
          {
            name: "tencent",
            type: "bar",
            barWidth: 20,
            label: {
              show: true,
              position: "top",
            },
            data: this.tencentData,
          },
          {
            name: "aiqiyi",
            type: "bar",
            barWidth: 20,
            label: {
              show: true,
              position: "top",
            },
            data: this.aiqiyiData,
          },
          {
            name: "youku",
            type: "bar",
            barWidth: 20,
            label: {
              show: true,
              position: "top",
            },
            // stack: "搜索引擎",
            data: this.youkuData,
          },
          {
            name: "acfun",
            type: "bar",
            barWidth: 20,
            label: {
              show: true,
              position: "top",
            },
            // stack: "搜索引擎",
            data: this.acfunData,
          },
        ],
      });
    },
    drawPies(id) {
      var me = this;
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        legend: {
          data: this.opinions,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
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
            data: this.xdatas,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "bilibili-last",
            type: "bar",
            barWidth: 30,
            label: {
              show: true,
              position: "top",
            },
            data: this.lastbilibiliData,
          },
          {
            name: "bilibili-new",
            type: "bar",
            barWidth: 30,
            label: {
              show: true,
              position: "top",
            },
            data: this.bilibiliData,
          },
        ],
      });
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
            name: "PlayerMediaLoading-start",
            type: "line",
            smooth: true,
            data: this.playerstarttimedata,
          },
          {
            name: "PlayerMediaLoading-end",
            type: "line",
            smooth: true,
            data: this.playerendtimedata,
          },
        ],
      });
    },
    drawPiesfcp(id) {
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
            name: "bilibili",
            type: "line",
            smooth: true,
            data: this.fcpbilibilidata,
          },
          {
            name: "acfun",
            type: "line",
            smooth: true,
            data: this.fcpacfundata,
          },
          {
            name: "aiqiyi",
            type: "line",
            smooth: true,
            data: this.fcpaiqiyidata,
          },
          {
            name: "tencent",
            type: "line",
            smooth: true,
            data: this.fcptencentdata,
          },
          {
            name: "xigua",
            type: "line",
            smooth: true,
            data: this.fcpxiguadata,
          },
          {
            name: "youku",
            type: "line",
            smooth: true,
            data: this.fcpyoukudata,
          },
        ],
      });
    },
    drawPiesshoup(id) {
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
            name: "bilibili",
            type: "line",
            smooth: true,
            data: this.shoupbilibilidata,
          },
          {
            name: "acfun",
            type: "line",
            smooth: true,
            data: this.shoupacfundata,
          },
          {
            name: "aiqiyi",
            type: "line",
            smooth: true,
            data: this.shoupaiqiyidata,
          },
          {
            name: "tencent",
            type: "line",
            smooth: true,
            data: this.shouptencentdata,
          },
          {
            name: "xigua",
            type: "line",
            smooth: true,
            data: this.shoupxiguadata,
          },
          {
            name: "youku",
            type: "line",
            smooth: true,
            data: this.shoupyoukudata,
          },
        ],
      });
    },
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
            name: "bilibili",
            type: "line",
            smooth: true,
            data: this.scorebilibilidata,
          },
          {
            name: "acfun",
            type: "line",
            smooth: true,
            data: this.scoreacfundata,
          },
          {
            name: "aiqiyi",
            type: "line",
            smooth: true,
            data: this.scoreaiqiyidata,
          },
          {
            name: "tencent",
            type: "line",
            smooth: true,
            data: this.scoretencentdata,
          },
          {
            name: "xigua",
            type: "line",
            smooth: true,
            data: this.scorexiguadata,
          },
          {
            name: "youku",
            type: "line",
            smooth: true,
            data: this.scoreyoukudata,
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
            name: "bilibili",
            type: "line",
            smooth: true,
            data: this.ttfbbilibilidata,
          },
          {
            name: "acfun",
            type: "line",
            smooth: true,
            data: this.ttfbacfundata,
          },
          {
            name: "aiqiyi",
            type: "line",
            smooth: true,
            data: this.ttfbaiqiyidata,
          },
          {
            name: "tencent",
            type: "line",
            smooth: true,
            data: this.ttfbtencentdata,
          },
          {
            name: "xigua",
            type: "line",
            smooth: true,
            data: this.ttfbxiguadata,
          },
          {
            name: "youku",
            type: "line",
            smooth: true,
            data: this.ttfbyoukudata,
          },
        ],
      });
    },
    drawPiesfpaint(id) {
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
            name: "bilibili",
            type: "line",
            smooth: true,
            data: this.fpaintbilibilidata,
          },
          {
            name: "acfun",
            type: "line",
            smooth: true,
            data: this.fpaintacfundata,
          },
          {
            name: "aiqiyi",
            type: "line",
            smooth: true,
            data: this.fpaintaiqiyidata,
          },
          {
            name: "tencent",
            type: "line",
            smooth: true,
            data: this.fpainttencentdata,
          },
          {
            name: "xigua",
            type: "line",
            smooth: true,
            data: this.fpaintxiguadata,
          },
          {
            name: "youku",
            type: "line",
            smooth: true,
            data: this.fpaintyoukudata,
          },
        ],
      });
    },
    drawPieslpaint(id) {
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
            name: "bilibili",
            type: "line",
            smooth: true,
            data: this.lpaintbilibilidata,
          },
          {
            name: "acfun",
            type: "line",
            smooth: true,
            data: this.lpaintacfundata,
          },
          {
            name: "aiqiyi",
            type: "line",
            smooth: true,
            data: this.lpaintaiqiyidata,
          },
          {
            name: "tencent",
            type: "line",
            smooth: true,
            data: this.lpainttencentdata,
          },
          {
            name: "xigua",
            type: "line",
            smooth: true,
            data: this.lpaintxiguadata,
          },
          {
            name: "youku",
            type: "line",
            smooth: true,
            data: this.lpaintyoukudata,
          },
        ],
      });
    },
    drawPiescls(id) {
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
            name: "bilibili",
            type: "line",
            smooth: true,
            data: this.clsbilibilidata,
          },
          {
            name: "acfun",
            type: "line",
            smooth: true,
            data: this.clsacfundata,
          },
          {
            name: "aiqiyi",
            type: "line",
            smooth: true,
            data: this.clsaiqiyidata,
          },
          {
            name: "tencent",
            type: "line",
            smooth: true,
            data: this.clstencentdata,
          },
          {
            name: "xigua",
            type: "line",
            smooth: true,
            data: this.clsxiguadata,
          },
          {
            name: "youku",
            type: "line",
            smooth: true,
            data: this.clsyoukudata,
          },
        ],
      });
    },
    drawPiesspeed(id) {
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
            name: "bilibili",
            type: "line",
            smooth: true,
            data: this.speedbilibilidata,
          },
          {
            name: "acfun",
            type: "line",
            smooth: true,
            data: this.speedacfundata,
          },
          {
            name: "aiqiyi",
            type: "line",
            smooth: true,
            data: this.speedaiqiyidata,
          },
          {
            name: "tencent",
            type: "line",
            smooth: true,
            data: this.speedtencentdata,
          },
          {
            name: "xigua",
            type: "line",
            smooth: true,
            data: this.speedxiguadata,
          },
          {
            name: "youku",
            type: "line",
            smooth: true,
            data: this.speedyoukudata,
          },
        ],
      });
    },
    getdata() {
      try {
        const obj = {
          option: "getwebquailtydata",
          datefirst: "",
          datesecond: "",
        };
        this.$http
          .getquailtydata(obj)
          .then((res) => {
            if (res.msg === "success") {
              // player
              if (res.playerdatas && res.playerdatas !== "no data") {
                res.playerdatas.forEach((eleplayer) => {
                  this.playerstarttimedata.push(eleplayer.start);
                  this.playerendtimedata.push(eleplayer.end);
                  this.eachplayerdatas.push(eleplayer.Date.slice(5, 10));
                });
                this.playerstarttimedata.reverse();
                this.playerendtimedata.reverse();
                this.eachplayerdatas.reverse();
              } else {
                this.playerstarttimedata = [];
                this.playerendtimedata = [];
              }

              // bilibili
              res.bilibilidata.forEach((element) => {
                this.eachdatas.push(element.Date.slice(5, 10));
              });
              this.eachdatas.reverse();
              const bilidata = res.data[4];
              const newbilibili = [];
              newbilibili.push(
                bilidata.Performance,
                bilidata.TTFB,
                bilidata.FCP,
                bilidata.LCP,
                bilidata.CLS,
                bilidata.SpeedIndex,
                bilidata.Visual99,
                bilidata.firstPaint,
                bilidata.imgsize,
                bilidata.Htmlsize,
                bilidata.Csssize,
                bilidata.Jssize,
                bilidata.Totalsize,
                bilidata.FullyLoaded
              );
              this.bilibiliData = newbilibili;
              // acfun
              const acdata = res.data[5];
              const newac = [];
              newac.push(
                acdata.Performance,
                acdata.TTFB,
                acdata.FCP,
                acdata.LCP,
                acdata.CLS,
                acdata.SpeedIndex,
                acdata.Visual99,
                acdata.firstPaint
              );
              this.acfunData = newac;
              // aqiyi
              const aqiyidata = res.data[3];
              const newaqiyi = [];
              newaqiyi.push(
                aqiyidata.Performance,
                aqiyidata.TTFB,
                aqiyidata.FCP,
                aqiyidata.LCP,
                aqiyidata.CLS,
                aqiyidata.SpeedIndex,
                aqiyidata.Visual99,
                aqiyidata.firstPaint
              );
              this.aiqiyiData = newaqiyi;
              // tencent
              const tendata = res.data[2];
              const newten = [];
              newten.push(
                tendata.Performance,
                tendata.TTFB,
                tendata.FCP,
                tendata.LCP,
                tendata.CLS,
                tendata.SpeedIndex,
                tendata.Visual99,
                tendata.firstPaint
              );
              this.tencentData = newten;
              // xigua
              const xiguadata = res.data[1];
              const newbxigua = [];
              newbxigua.push(
                xiguadata.Performance,
                xiguadata.TTFB,
                xiguadata.FCP,
                xiguadata.LCP,
                xiguadata.CLS,
                xiguadata.SpeedIndex,
                xiguadata.Visual99,
                xiguadata.firstPaint
              );
              this.xiguaData = newbxigua;
              // youku
              const youkudata = res.data[0];
              const newyouku = [];
              newyouku.push(
                youkudata.Performance,
                youkudata.TTFB,
                youkudata.FCP,
                youkudata.LCP,
                youkudata.CLS,
                youkudata.SpeedIndex,
                youkudata.Visual99,
                youkudata.firstPaint
              );
              this.youkuData = newyouku;

              const lastbilibilidata = res.data[10];
              const lastbilibili = [];
              lastbilibili.push(
                lastbilibilidata.Performance,
                lastbilibilidata.TTFB,
                lastbilibilidata.FCP,
                lastbilibilidata.LCP,
                lastbilibilidata.CLS,
                lastbilibilidata.SpeedIndex,
                lastbilibilidata.Visual99,
                lastbilibilidata.firstPaint,
                lastbilibilidata.imgsize,
                lastbilibilidata.Htmlsize,
                lastbilibilidata.Csssize,
                lastbilibilidata.Jssize,
                lastbilibilidata.Totalsize,
                lastbilibilidata.FullyLoaded
              );
              this.lastbilibiliData = lastbilibili;
              // console.log("bilibiliData: ", this.bilibiliData)
              res.bilibilidata.forEach((element) => {
                this.fcpbilibilidata.push(element.LCP);
                this.shoupbilibilidata.push(element.firstPaint);
                this.scorebilibilidata.push(element.Performance);
                this.ttfbbilibilidata.push(element.TTFB);
                this.clsbilibilidata.push(element.CLS);
                this.fpaintbilibilidata.push(element.FCP);
                this.lpaintbilibilidata.push(element.Visual99);
                this.speedbilibilidata.push(element.SpeedIndex);
              });
              this.fcpbilibilidata.reverse();
              this.shoupbilibilidata.reverse();
              this.scorebilibilidata.reverse();
              this.ttfbbilibilidata.reverse();
              this.clsbilibilidata.reverse();
              this.fpaintbilibilidata.reverse();
              this.lpaintbilibilidata.reverse();
              this.speedbilibilidata.reverse();
              res.acfundata.forEach((element) => {
                this.fcpacfundata.push(element.LCP);
                this.shoupacfundata.push(element.firstPaint);
                this.scoreacfundata.push(element.Performance);
                this.ttfbacfundata.push(element.TTFB);
                this.clsacfundata.push(element.CLS);
                this.fpaintacfundata.push(element.FCP);
                this.lpaintacfundata.push(element.Visual99);
                this.speedacfundata.push(element.SpeedIndex);
              });
              res.aiqiyidata.forEach((element) => {
                this.fcpaiqiyidata.push(element.LCP);
                this.shoupaiqiyidata.push(element.firstPaint);
                this.scoreaiqiyidata.push(element.Performance);
                this.ttfbaiqiyidata.push(element.TTFB);
                this.clsaiqiyidata.push(element.CLS);
                this.fpaintaiqiyidata.push(element.FCP);
                this.lpaintaiqiyidata.push(element.Visual99);
                this.speedaiqiyidata.push(element.SpeedIndex);
              });
              res.tencentdata.forEach((element) => {
                this.fcptencentdata.push(element.LCP);
                this.shouptencentdata.push(element.firstPaint);
                this.scoretencentdata.push(element.Performance);
                this.ttfbtencentdata.push(element.TTFB);
                this.clstencentdata.push(element.CLS);
                this.fpainttencentdata.push(element.FCP);
                this.lpainttencentdata.push(element.Visual99);
                this.speedtencentdata.push(element.SpeedIndex);
              });
              res.xiguadata.forEach((element) => {
                this.fcpxiguadata.push(element.LCP);
                this.shoupxiguadata.push(element.firstPaint);
                this.scorexiguadata.push(element.Performance);
                this.ttfbxiguadata.push(element.TTFB);
                this.clsxiguadata.push(element.CLS);
                this.fpaintxiguadata.push(element.FCP);
                this.lpaintxiguadata.push(element.Visual99);
                this.speedxiguadata.push(element.SpeedIndex);
              });
              res.youkudata.forEach((element) => {
                this.fcpyoukudata.push(element.LCP);
                this.shoupyoukudata.push(element.firstPaint);
                this.scoreyoukudata.push(element.Performance);
                this.ttfbyoukudata.push(element.TTFB);
                this.clsyoukudata.push(element.CLS);
                this.fpaintyoukudata.push(element.FCP);
                this.lpaintyoukudata.push(element.Visual99);
                this.speedyoukudata.push(element.SpeedIndex);
              });
              this.fcpacfundata.reverse();
              this.shoupacfundata.reverse();
              this.scoreacfundata.reverse();
              this.ttfbacfundata.reverse();
              this.clsacfundata.reverse();
              this.fpaintacfundata.reverse();
              this.lpaintacfundata.reverse();
              this.speedacfundata.reverse();
              this.fcpaiqiyidata.reverse();
              this.shoupaiqiyidata.reverse();
              this.scoreaiqiyidata.reverse();
              this.ttfbaiqiyidata.reverse();
              this.clsaiqiyidata.reverse();
              this.fpaintaiqiyidata.reverse();
              this.lpaintaiqiyidata.reverse();
              this.speedaiqiyidata.reverse();
              this.fcptencentdata.reverse();
              this.shouptencentdata.reverse();
              this.scoretencentdata.reverse();
              this.ttfbtencentdata.reverse();
              this.clstencentdata.reverse();
              this.fpainttencentdata.reverse();
              this.lpainttencentdata.reverse();
              this.speedtencentdata.reverse();
              this.fcpxiguadata.reverse();
              this.shoupxiguadata.reverse();
              this.scorexiguadata.reverse();
              this.ttfbxiguadata.reverse();
              this.clsxiguadata.reverse();
              this.fpaintxiguadata.reverse();
              this.lpaintxiguadata.reverse();
              this.speedxiguadata.reverse();
              this.fcpyoukudata.reverse();
              this.shoupyoukudata.reverse();
              this.scoreyoukudata.reverse();
              this.ttfbyoukudata.reverse();
              this.clsyoukudata.reverse();
              this.fpaintyoukudata.reverse();
              this.lpaintyoukudata.reverse();
              this.speedyoukudata.reverse();

              this.$nextTick(function () {
                this.drawPie("main");
                this.drawPies("own");
                this.drawPiesfcp("fcp");
                this.drawPiesshoup("shoup");
                this.drawPiesscore("score");
                this.drawPiesttfb("ttfb");
                this.drawPiesfpaint("fpaint");
                this.drawPieslpaint("lpaint");
                this.drawPiescls("cls");
                this.drawPiesspeed("speed");
                this.drawplayerPies("player");
              });
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
    timerchange() {
      if (this.value2) {
        try {
          const datefirst = this.resolvedate(this.value2[0]);
          const datesecond = this.resolvedate(this.value2[1]);
          const obj = {
            option: "getwebquailtydata",
            datefirst: datefirst,
            datesecond: datesecond,
          };
          this.$http
            .getquailtydata(obj)
            .then((res) => {
              if (res.msg === "success") {
                this.playerstarttimedata = [];
                this.playerendtimedata = [];
                this.eachplayerdatas = [];
                this.eachdatas = [];
                this.fcpbilibilidata = [];
                this.shoupbilibilidata = [];
                this.scorebilibilidata = [];
                this.ttfbbilibilidata = [];
                this.clsbilibilidata = [];
                this.fpaintbilibilidata = [];
                this.lpaintbilibilidata = [];
                this.speedbilibilidata = [];
                this.fcpacfundata = [];
                this.shoupacfundata = [];
                this.scoreacfundata = [];
                this.ttfbacfundata = [];
                this.clsacfundata = [];
                this.fpaintacfundata = [];
                this.lpaintacfundata = [];
                this.speedacfundata = [];
                this.fcpaiqiyidata = [];
                this.shoupaiqiyidata = [];
                this.scoreaiqiyidata = [];
                this.ttfbaiqiyidata = [];
                this.clsaiqiyidata = [];
                this.fpaintaiqiyidata = [];
                this.lpaintaiqiyidata = [];
                this.speedaiqiyidata = [];
                this.fcptencentdata = [];
                this.shouptencentdata = [];
                this.scoretencentdata = [];
                this.ttfbtencentdata = [];
                this.clstencentdata = [];
                this.fpainttencentdata = [];
                this.lpainttencentdata = [];
                this.speedtencentdata = [];
                this.fcpxiguadata = [];
                this.shoupxiguadata = [];
                this.scorexiguadata = [];
                this.ttfbxiguadata = [];
                this.clsxiguadata = [];
                this.fpaintxiguadata = [];
                this.lpaintxiguadata = [];
                this.speedxiguadata = [];
                this.fcpyoukudata = [];
                this.shoupyoukudata = [];
                this.scoreyoukudata = [];
                this.ttfbyoukudata = [];
                this.clsyoukudata = [];
                this.fpaintyoukudata = [];
                this.lpaintyoukudata = [];
                this.speedyoukudata = [];
                if (res.playerdatas && res.playerdatas !== "no data") {
                  res.playerdatas.forEach((eleplayer) => {
                    this.playerstarttimedata.push(eleplayer.start);
                    this.playerendtimedata.push(eleplayer.end);
                    this.eachplayerdatas.push(eleplayer.Date.slice(5, 10));
                  });
                  this.playerstarttimedata.reverse();
                  this.playerendtimedata.reverse();
                  this.eachplayerdatas.reverse();
                }

                if (res.bilibilidata && res.bilibilidata !== "no data") {
                  res.bilibilidata.forEach((element) => {
                    this.eachdatas.push(element.Date.slice(5, 10));
                  });
                  this.eachdatas.reverse();
                }

                const bilidata = res.data[4];
                const newbilibili = [];
                newbilibili.push(
                  bilidata.Performance,
                  bilidata.TTFB,
                  bilidata.FCP,
                  bilidata.LCP,
                  bilidata.CLS,
                  bilidata.SpeedIndex,
                  bilidata.Visual99,
                  bilidata.firstPaint,
                  bilidata.imgsize,
                  bilidata.Htmlsize,
                  bilidata.Csssize,
                  bilidata.Jssize,
                  bilidata.Totalsize,
                  bilidata.FullyLoaded
                );
                this.bilibiliData = newbilibili;

                const acdata = res.data[5];
                const newac = [];
                newac.push(
                  acdata.Performance,
                  acdata.TTFB,
                  acdata.FCP,
                  acdata.LCP,
                  acdata.CLS,
                  acdata.SpeedIndex,
                  acdata.Visual99,
                  acdata.firstPaint
                );
                this.acfunData = newac;

                const aqiyidata = res.data[3];
                const newaqiyi = [];
                newaqiyi.push(
                  aqiyidata.Performance,
                  aqiyidata.TTFB,
                  aqiyidata.FCP,
                  aqiyidata.LCP,
                  aqiyidata.CLS,
                  aqiyidata.SpeedIndex,
                  aqiyidata.Visual99,
                  aqiyidata.firstPaint
                );
                this.aiqiyiData = newaqiyi;

                const tendata = res.data[2];
                const newten = [];
                newten.push(
                  tendata.Performance,
                  tendata.TTFB,
                  tendata.FCP,
                  tendata.LCP,
                  tendata.CLS,
                  tendata.SpeedIndex,
                  tendata.Visual99,
                  tendata.firstPaint
                );
                this.tencentData = newten;

                const xiguadata = res.data[1];
                const newbxigua = [];
                newbxigua.push(
                  xiguadata.Performance,
                  xiguadata.TTFB,
                  xiguadata.FCP,
                  xiguadata.LCP,
                  xiguadata.CLS,
                  xiguadata.SpeedIndex,
                  xiguadata.Visual99,
                  xiguadata.firstPaint
                );
                this.xiguaData = newbxigua;

                const youkudata = res.data[0];
                const newyouku = [];
                newyouku.push(
                  youkudata.Performance,
                  youkudata.TTFB,
                  youkudata.FCP,
                  youkudata.LCP,
                  youkudata.CLS,
                  youkudata.SpeedIndex,
                  youkudata.Visual99,
                  youkudata.firstPaint
                );
                this.youkuData = newyouku;

                const lastbilibilidata = res.data[11];
                const lastbilibili = [];
                lastbilibili.push(
                  lastbilibilidata.Performance,
                  lastbilibilidata.TTFB,
                  lastbilibilidata.FCP,
                  lastbilibilidata.LCP,
                  lastbilibilidata.CLS,
                  lastbilibilidata.SpeedIndex,
                  lastbilibilidata.Visual99,
                  lastbilibilidata.firstPaint,
                  lastbilibilidata.imgsize,
                  lastbilibilidata.Htmlsize,
                  lastbilibilidata.Csssize,
                  lastbilibilidata.Jssize,
                  lastbilibilidata.Totalsize,
                  lastbilibilidata.FullyLoaded
                );
                this.lastbilibiliData = lastbilibili;

                if (res.bilibilidata && res.bilibilidata !== "no data") {
                  res.bilibilidata.forEach((element) => {
                    this.fcpbilibilidata.push(element.LCP);
                    this.shoupbilibilidata.push(element.firstPaint);
                    this.scorebilibilidata.push(element.Performance);
                    this.ttfbbilibilidata.push(element.TTFB);
                    this.clsbilibilidata.push(element.CLS);
                    this.fpaintbilibilidata.push(element.FCP);
                    this.lpaintbilibilidata.push(element.Visual99);
                    this.speedbilibilidata.push(element.SpeedIndex);
                  });
                  this.fcpbilibilidata.reverse();
                  this.shoupbilibilidata.reverse();
                  this.scorebilibilidata.reverse();
                  this.ttfbbilibilidata.reverse();
                  this.clsbilibilidata.reverse();
                  this.fpaintbilibilidata.reverse();
                  this.lpaintbilibilidata.reverse();
                  this.speedbilibilidata.reverse();
                }
                if (res.acfundata && res.acfundata !== "no data") {
                  res.acfundata.forEach((element) => {
                    this.fcpacfundata.push(element.LCP);
                    this.shoupacfundata.push(element.firstPaint);
                    this.scoreacfundata.push(element.Performance);
                    this.ttfbacfundata.push(element.TTFB);
                    this.clsacfundata.push(element.CLS);
                    this.fpaintacfundata.push(element.FCP);
                    this.lpaintacfundata.push(element.Visual99);
                    this.speedacfundata.push(element.SpeedIndex);
                  });
                }
                if (res.aiqiyidata && res.aiqiyidata !== "no data") {
                  res.aiqiyidata.forEach((element) => {
                    this.fcpaiqiyidata.push(element.LCP);
                    this.shoupaiqiyidata.push(element.firstPaint);
                    this.scoreaiqiyidata.push(element.Performance);
                    this.ttfbaiqiyidata.push(element.TTFB);
                    this.clsaiqiyidata.push(element.CLS);
                    this.fpaintaiqiyidata.push(element.FCP);
                    this.lpaintaiqiyidata.push(element.Visual99);
                    this.speedaiqiyidata.push(element.SpeedIndex);
                  });
                }
                if (res.tencentdata && res.tencentdata !== "no data") {
                  res.tencentdata.forEach((element) => {
                    this.fcptencentdata.push(element.LCP);
                    this.shouptencentdata.push(element.firstPaint);
                    this.scoretencentdata.push(element.Performance);
                    this.ttfbtencentdata.push(element.TTFB);
                    this.clstencentdata.push(element.CLS);
                    this.fpainttencentdata.push(element.FCP);
                    this.lpainttencentdata.push(element.Visual99);
                    this.speedtencentdata.push(element.SpeedIndex);
                  });
                }
                if (res.xiguadata && res.xiguadata !== "no data") {
                  res.xiguadata.forEach((element) => {
                    this.fcpxiguadata.push(element.LCP);
                    this.shoupxiguadata.push(element.firstPaint);
                    this.scorexiguadata.push(element.Performance);
                    this.ttfbxiguadata.push(element.TTFB);
                    this.clsxiguadata.push(element.CLS);
                    this.fpaintxiguadata.push(element.FCP);
                    this.lpaintxiguadata.push(element.Visual99);
                    this.speedxiguadata.push(element.SpeedIndex);
                  });
                }
                if (res.youkudata && res.youkudata !== "no data") {
                  res.youkudata.forEach((element) => {
                    this.fcpyoukudata.push(element.LCP);
                    this.shoupyoukudata.push(element.firstPaint);
                    this.scoreyoukudata.push(element.Performance);
                    this.ttfbyoukudata.push(element.TTFB);
                    this.clsyoukudata.push(element.CLS);
                    this.fpaintyoukudata.push(element.FCP);
                    this.lpaintyoukudata.push(element.Visual99);
                    this.speedyoukudata.push(element.SpeedIndex);
                  });
                }
                this.fcpacfundata.reverse();
                this.shoupacfundata.reverse();
                this.scoreacfundata.reverse();
                this.ttfbacfundata.reverse();
                this.clsacfundata.reverse();
                this.fpaintacfundata.reverse();
                this.lpaintacfundata.reverse();
                this.speedacfundata.reverse();
                this.fcpaiqiyidata.reverse();
                this.shoupaiqiyidata.reverse();
                this.scoreaiqiyidata.reverse();
                this.ttfbaiqiyidata.reverse();
                this.clsaiqiyidata.reverse();
                this.fpaintaiqiyidata.reverse();
                this.lpaintaiqiyidata.reverse();
                this.speedaiqiyidata.reverse();
                this.fcptencentdata.reverse();
                this.shouptencentdata.reverse();
                this.scoretencentdata.reverse();
                this.ttfbtencentdata.reverse();
                this.clstencentdata.reverse();
                this.fpainttencentdata.reverse();
                this.lpainttencentdata.reverse();
                this.speedtencentdata.reverse();
                this.fcpxiguadata.reverse();
                this.shoupxiguadata.reverse();
                this.scorexiguadata.reverse();
                this.ttfbxiguadata.reverse();
                this.clsxiguadata.reverse();
                this.fpaintxiguadata.reverse();
                this.lpaintxiguadata.reverse();
                this.speedxiguadata.reverse();
                this.fcpyoukudata.reverse();
                this.shoupyoukudata.reverse();
                this.scoreyoukudata.reverse();
                this.ttfbyoukudata.reverse();
                this.clsyoukudata.reverse();
                this.fpaintyoukudata.reverse();
                this.lpaintyoukudata.reverse();
                this.speedyoukudata.reverse();

                this.$nextTick(function () {
                  this.drawPie("main");
                  this.drawPies("own");
                  this.drawPiesfcp("fcp");
                  this.drawPiesshoup("shoup");
                  this.drawPiesscore("score");
                  this.drawPiesttfb("ttfb");
                  this.drawPiesfpaint("fpaint");
                  this.drawPieslpaint("lpaint");
                  this.drawPiescls("cls");
                  this.drawPiesspeed("speed");
                  this.drawplayerPies("player");
                });
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
      } else {
        this.playerstarttimedata = [];
        this.playerendtimedata = [];
        this.eachplayerdatas = [];
        this.eachdatas = [];
        this.fcpbilibilidata = [];
        this.shoupbilibilidata = [];
        this.scorebilibilidata = [];
        this.ttfbbilibilidata = [];
        this.clsbilibilidata = [];
        this.fpaintbilibilidata = [];
        this.lpaintbilibilidata = [];
        this.speedbilibilidata = [];
        this.fcpacfundata = [];
        this.shoupacfundata = [];
        this.scoreacfundata = [];
        this.ttfbacfundata = [];
        this.clsacfundata = [];
        this.fpaintacfundata = [];
        this.lpaintacfundata = [];
        this.speedacfundata = [];
        this.fcpaiqiyidata = [];
        this.shoupaiqiyidata = [];
        this.scoreaiqiyidata = [];
        this.ttfbaiqiyidata = [];
        this.clsaiqiyidata = [];
        this.fpaintaiqiyidata = [];
        this.lpaintaiqiyidata = [];
        this.speedaiqiyidata = [];
        this.fcptencentdata = [];
        this.shouptencentdata = [];
        this.scoretencentdata = [];
        this.ttfbtencentdata = [];
        this.clstencentdata = [];
        this.fpainttencentdata = [];
        this.lpainttencentdata = [];
        this.speedtencentdata = [];
        this.fcpxiguadata = [];
        this.shoupxiguadata = [];
        this.scorexiguadata = [];
        this.ttfbxiguadata = [];
        this.clsxiguadata = [];
        this.fpaintxiguadata = [];
        this.lpaintxiguadata = [];
        this.speedxiguadata = [];
        this.fcpyoukudata = [];
        this.shoupyoukudata = [];
        this.scoreyoukudata = [];
        this.ttfbyoukudata = [];
        this.clsyoukudata = [];
        this.fpaintyoukudata = [];
        this.lpaintyoukudata = [];
        this.speedyoukudata = [];
        this.getdata();
      }
    },
    resolvedate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.container {
  display: inline-block;
  width: 100%;
}
.search-button {
  margin-top: 30px;
  padding: 10px 20px;
}
.text {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 10px 20px;
}
</style>