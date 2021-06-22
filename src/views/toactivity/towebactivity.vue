<template>
  <div class="newwave">
    <div style="background-color: rgb(245, 245, 245); padding-bottom: 10px">
      <h2
        style="
          font-weight: 400;
          color: rgb(31 47 61);
          margin-block-start: 0.83em;
          margin-block-end: 0.83em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          display: inline-block;
        "
      >
        Tips:
      </h2>
      <br />
      <span
        style="
          padding: 5px 20px;
          color: rgb(189 110 110);
          font-size: 15px;
          display: flex;
        "
      >
        活动页面相关性能将根据前端测试QA标准，进行活动页面上线前的质量检测。当前，活动评测初期指定标准以测试同学设定数据为准。若有疑问，烦请咨询前端测试组相关人员~
      </span>
    </div>
    <div class="search">
      <el-input
        placeholder="输入需要测试的url"
        v-model="input"
        clearable
        class="inputbutton"
      ></el-input>
      <el-select
        v-model="value"
        clearable
        placeholder="选择活动页等级"
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
      <el-select
        v-model="values"
        clearable
        placeholder="选择类型"
        style="margin-right: 5px"
      >
        <el-option
          v-for="item in optionss"
          :key="item.values"
          :label="item.labels"
          :value="item.values"
        >
        </el-option>
      </el-select>
      <el-button type="primary" size="small" @click="startrunquailty()"
        >开始检测</el-button
      >
    </div>
    <el-divider content-position="left">页面检测集合</el-divider>
    <div class="caseowner">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          :name="index"
          v-for="(item, index) in quailtypagedata"
          :title="item.documentTitle"
          :key="item._id"
        >
          <el-divider>性能数据详情</el-divider>
          <div>
            页面链接:
            <el-link
              :href="item.url"
              type="primary"
              target="_blank"
              style="margin-left: 15px"
              >{{ item.url }}</el-link
            >

            <el-tag type="warning" style="float: right; margin-right: 15px">{{
              item.type === "1" ? "大型活动页" : "普通活动页"
            }}</el-tag>
          </div>
          <div>
            <div>
              性能得分：
              {{ item.score }}
            </div>
            <div>
              执行环境：
              {{ item.browser }}
            </div>
            <div>
              执行时间：
              {{ item.date }}
            </div>
            <div>
              网络环境：
              {{ item.networkConnectionType }}
            </div>
            <div>
              页面文本大小：
              {{ item.pageContentSize }}
            </div>
            <div>
              页面传输大小：
              {{ item.pageTransferSize }}
            </div>
            <div>
              首帧耗时:
              {{ item.timings.firstPaint }} ms
            </div>
            <div>
              首屏耗时:
              {{ item.timings.timings.domContentLoadedTime }} ms
            </div>
            <div>
              可交互耗时:
              {{ item.timings.timings.domInteractiveTime }} ms
            </div>
            <div>
              全部加载完成耗时：
              {{ item.timings.fullyLoaded }} ms
            </div>
          </div>
          <el-divider>数据节点明细</el-divider>
          <div>
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="浏览器从服务器、缓存或者本地资源接收到响应的第一个字节之时的 Unix毫秒时间戳"
                placement="top-start"
              >
                <span
                  >backEndTime： {{ item.timings.timings.backEndTime }} ms</span
                >
              </el-tooltip>
            </div>
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="为解析器发出 DOMContentLoaded 事件之前，即所有的需要被运行的脚本已经被解析之时的 Unix毫秒时间戳"
                placement="top-start"
              >
                <span
                  >domContentLoadedTime：
                  {{ item.timings.timings.domContentLoadedTime }} ms</span
                >
              </el-tooltip>
            </div>
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="这个属性被用于测量用户感受的加载网页的速度  在主文档的解析器结束工作，即 Document.readyState 改变为 'interactive' 并且相当于 readystatechange 事件被触发之时的 Unix毫秒时间戳"
                placement="top-start"
              >
                <span
                  >domInteractiveTime：
                  {{ item.timings.timings.domInteractiveTime }} ms</span
                >
              </el-tooltip>
            </div>
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="domainLookupEnd (解析域名结束时的 Unix毫秒时间戳) - domainLookupStart (域名开始解析之时的 Unix毫秒时间戳)"
                placement="top-start"
              >
                <span
                  >domainLookupTime：
                  {{ item.timings.timings.domainLookupTime }} ms</span
                >
              </el-tooltip>
            </div>
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="loadEventEnd (为 load 事件处理程序被终止，加载事件已经完成之时的 Unix毫秒时间戳) - responseEnd (浏览器从服务器、缓存或者本地资源接收响应的最后一个字节或者连接被关闭之时的 Unix毫秒时间戳)"
                placement="top-start"
              >
                <span
                  >frontEndTime：
                  {{ item.timings.timings.frontEndTime }} ms</span
                >
              </el-tooltip>
            </div>
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="responseEnd (浏览器从服务器、缓存或者本地资源接收响应的最后一个字节或者连接被关闭之时的 Unix毫秒时间戳) - responseStart (浏览器从服务器、缓存或者本地资源接收到响应的第一个字节之时的 Unix毫秒时间戳) "
                placement="top-start"
              >
                <span
                  >pageDownloadTime：
                  {{ item.timings.timings.pageDownloadTime }} ms</span
                >
              </el-tooltip>
            </div>
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="为 load 事件处理程序被终止，加载事件已经完成之时的 Unix毫秒时间戳"
                placement="top-start"
              >
                <span
                  >pageLoadTime：
                  {{ item.timings.timings.pageLoadTime }} ms</span
                >
              </el-tooltip>
            </div>
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="浏览器已经准备好去使用HTTP请求抓取文档之时的 Unix毫秒时间戳。这一时刻在检查应用的缓存之前"
                placement="top-start"
              >
                <span
                  >redirectionTime：
                  {{ item.timings.timings.redirectionTime }} ms</span
                >
              </el-tooltip>
            </div>
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="connectEnd (网络链接建立的时间节点) - connectStart (请求连接被发送到网络之时的Unix毫秒时间戳)"
                placement="top-start"
              >
                <span
                  >serverConnectionTime：
                  {{ item.timings.timings.serverConnectionTime }} ms</span
                >
              </el-tooltip>
            </div>
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="responseEnd (浏览器从服务器、缓存或者本地资源接收响应的最后一个字节或者连接被关闭之时的 Unix毫秒时间戳)  - requestStart (浏览器发送从服务器或者缓存获取实际文档的请求之时的 Unix毫秒时间戳)"
                placement="top-start"
              >
                <span
                  >serverResponseTime：
                  {{ item.timings.timings.serverResponseTime }} ms</span
                >
              </el-tooltip>
            </div>
          </div>
          <div style="margin-top: 10px">
            <el-button type="danger" size="small" @click="deleachquailty(item)"
              >删除</el-button
            >
            <el-button
              type="success"
              size="small"
              @click="searcheachquailty(item)"
              >优化建议</el-button
            >
          </div>
        </el-collapse-item>
      </el-collapse>
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
      活动页面-各级数据明细
    </h2>
    <div
      id="player"
      style="width: 100%; height: 800px; overflow: auto hidden"
    ></div>
    <el-dialog title="优化建议" :visible.sync="dialogTableVisible" width="90%">
      <el-divider>绩效建议</el-divider>
      <el-table :data="PerformanceData" stripe style="width: 100%">
        <el-table-column
          prop="title"
          label="主题"
          width="300"
        ></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column
          prop="advice"
          label="建议"
          width="500"
        ></el-table-column>
        <el-table-column
          prop="score"
          label="得分"
          width="100"
        ></el-table-column>
      </el-table>
      <el-divider>辅助功能建议</el-divider>
      <el-table :data="AccessibilityData" stripe style="width: 100%">
        <el-table-column
          prop="title"
          label="主题"
          width="300"
        ></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column
          prop="advice"
          label="建议"
          width="500"
        ></el-table-column>
        <el-table-column
          prop="score"
          label="得分"
          width="100"
        ></el-table-column>
      </el-table>
      <el-divider>最佳实践建议</el-divider>
      <el-table :data="BestpracticeData" stripe style="width: 100%">
        <el-table-column
          prop="title"
          label="主题"
          width="300"
        ></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column
          prop="advice"
          label="建议"
          width="500"
        ></el-table-column>
        <el-table-column
          prop="score"
          label="得分"
          width="100"
        ></el-table-column>
      </el-table>
      <el-divider>隐私权建议</el-divider>
      <el-table :data="PrivacyData" stripe style="width: 100%">
        <el-table-column
          prop="title"
          label="主题"
          width="300"
        ></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column
          prop="advice"
          label="建议"
          width="500"
        ></el-table-column>
        <el-table-column
          prop="score"
          label="得分"
          width="100"
        ></el-table-column>
      </el-table>
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
  name: "towebactivity",
  components: { BackToTop },
  data() {
    return {
      input: "",
      activeName: "1",
      quailtypagedata: [],
      dialogTableVisible: false,
      value: "",
      options: [
        {
          value: 1,
          label: "大型活动页",
        },
        {
          value: 2,
          label: "普通活动页",
        },
      ],
      values: "",
      optionss: [
        {
          values: 1,
          labels: "PC",
        },
        {
          values: 2,
          labels: "H5",
        },
      ],
      AccessibilityData: [],
      PerformanceData: [],
      BestpracticeData: [],
      PrivacyData: [],
      mainpiedata: [],
      piedata: [],
    };
  },
  mounted() {
    this.getallactivitydata();
  },
  methods: {
    drawplayerPies(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
          text: "性能数据占比分布",
          subtext: "均值",
          left: "center",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        tooltip: {},
        dataset: {
          source: [
            ["name", "首帧", "首屏", "得分", "加载完成"],
            this.mainpiedata,
            this.piedata,
          ],
        },
        series: [
          {
            type: "pie",
            name: "首帧 (ms)",
            radius: ["10%", "20%"],
            center: ["25%", "30%"],
            encode: {
              itemName: "name",
              value: "首帧",
            },
          },
          {
            type: "pie",
            name: "首屏 (ms)",
            radius: ["10%", "20%"],
            center: ["75%", "30%"],
            encode: {
              itemName: "name",
              value: "首屏",
            },
          },
          {
            type: "pie",
            name: "得分",
            radius: ["10%", "20%"],
            center: ["25%", "75%"],
            encode: {
              itemName: "name",
              value: "得分",
            },
          },
          {
            type: "pie",
            name: "加载完成 (ms)",
            radius: ["10%", "20%"],
            center: ["75%", "75%"],
            encode: {
              itemName: "name",
              value: "加载完成",
            },
          },
        ],
      });
    },
    startrunquailty() {
      try {
        if (this.input === "") {
          this.$notify.error({
            title: "警告",
            message: "URL不可为空！",
          });
        } else if (this.value === "") {
          this.$notify.error({
            title: "警告",
            message: "活动等级为必填项！",
          });
        } else if (this.values === "") {
          this.$notify.error({
            title: "警告",
            message: "容器类型为必填项！",
          });
        } else if (this.input != "" && this.value != "") {
          var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
          if (!reg.test(this.input)) {
            this.$notify.error({
              title: "错误",
              message: "请输入正确的URL~",
            });
          } else {
            this.$notify.success({
              title: "成功",
              message: "开始测试，请稍等~",
            });
            let newinput = this.input;
            let shortUrl = newinput.replace(/\?.*/, "");
            const obj = {
              activityurl: shortUrl,
              option: this.value,
              types: this.values,
            };
            this.$http
              .runactivity(obj)
              .then((res) => {
                if (res.msg === "success") {
                  this.getallactivitydata();
                } else {
                  // this.$message.error(res.msg)
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
                  message: "服务好像出问题了，请联系管理员 webactivity",
                  type: "error",
                });
              });
          }
        }
      } catch (e) {
        this.loading = false;
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员 try",
          type: "error",
        });
      }
    },
    searcheachquailty(e) {
      try {
        let eachurl = e.url;
        const obj = {
          activityurl: eachurl,
        };
        this.$http
          .geteachinfo(obj)
          .then((res) => {
            if (res.msg === "success") {
              (this.url = res.url),
                (this.AccessibilityData = this.getpagequailtyscore(
                  res.accessibility
                ));
              this.BestpracticeData = this.getpagequailtyscore(
                res.bestpractice
              );
              this.PerformanceData = this.getpagequailtyscore(res.performance);
              this.PrivacyData = this.getpagequailtyscore(res.privacy);
              this.dialogTableVisible = true;
            } else {
              // this.$message.error(res.msg)
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
              message: "服务好像出问题了，请联系管理员 webactivity",
              type: "error",
            });
          });
      } catch (e) {
        this.loading = false;
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员 try",
          type: "error",
        });
      }
    },
    deleachquailty(e) {
      try {
        let delurl = e.url;
        const obj = {
          activityurl: delurl,
        };
        this.$http
          .deleachinfo(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success",
              });
              this.getallactivitydata();
            } else {
              // this.$message.error(res.msg)
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
              message: "服务好像出问题了，请联系管理员 webactivity",
              type: "error",
            });
          });
      } catch (e) {
        this.loading = false;
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员 try",
          type: "error",
        });
      }
    },
    getallactivitydata() {
      try {
        const obj = {
          name: "webactivity",
        };
        this.$http
          .getallactivityinfo(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.$message({
                showClose: true,
                message: "拉取成功",
                type: "success",
              });
              this.quailtypagedata = res.data;
              this.mainpiedata = this.resolvescoreavg(res.mainavgdata);
              this.piedata = this.resolvescoreavg(res.avgdata);
              this.$nextTick(function () {
                this.drawplayerPies("player");
              });
            } else {
              // this.$message.error(res.msg)
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
              message: "服务好像出问题了，请联系管理员 webactivity",
              type: "error",
            });
          });
      } catch (e) {
        this.loading = false;
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员 try",
          type: "error",
        });
      }
    },
    // 通用方法，获取改进建议
    getpagequailtyscore(scoreobj) {
      const arr = [];
      const neewarr = [];
      var newobj = scoreobj.adviceList; //this.webcoach.advice.accessibility.adviceList;
      for (var k in newobj) {
        arr.push(newobj[k]);
      }
      arr.map((item) => {
        if (item.advice) {
          const obj = {
            description: item.description,
            advice: item.advice,
            title: item.title,
            score: item.score,
          };
          neewarr.push(obj);
        }
      });
      return neewarr;
    },
    // resolve scoreavg datas
    resolvescoreavg(avgdatas) {
      if (avgdatas !== "no data") {
        if (avgdatas[0].type === "1") {
          var newavgdatas = ["大型活动页"];
        } else {
          var newavgdatas = ["普通活动页"];
        }
        var avgscorearr = 0;
        var avgfirstPaintarr = 0;
        var avgfullyLoadedarr = 0;
        var avgdomContentLoadedTimearr = 0;
        var newavgarrlen;
        newavgarrlen = avgdatas.length;
        avgdatas.forEach((element) => {
          avgscorearr = avgscorearr + element.score;
        });
        avgdatas.forEach((element) => {
          avgfirstPaintarr = avgfirstPaintarr + element.timings.firstPaint;
        });
        avgdatas.forEach((element) => {
          avgfullyLoadedarr = avgfullyLoadedarr + element.timings.fullyLoaded;
        });
        avgdatas.forEach((element) => {
          avgdomContentLoadedTimearr =
            avgdomContentLoadedTimearr +
            element.timings.timings.domContentLoadedTime;
        });
        var newavgscorearr = this.resolenum(avgscorearr / newavgarrlen);
        var newavgfirstPaintarr = this.resolenum(
          avgfirstPaintarr / newavgarrlen
        );
        var newavgfullyLoadedarr = this.resolenum(
          avgfullyLoadedarr / newavgarrlen
        );
        var newavgdomContentLoadedTimearr = this.resolenum(
          avgdomContentLoadedTimearr / newavgarrlen
        );
        newavgdatas.push(
          newavgfirstPaintarr,
          newavgdomContentLoadedTimearr,
          newavgscorearr,
          newavgfullyLoadedarr
        );
        return newavgdatas;
      } else {
      }
    },
    // 保留两位数
    resolenum(newnums) {
      let num = newnums;
      let numStr = num.toString();
      let index = numStr.indexOf(".");
      let result = parseFloat(numStr.slice(0, index + 5));
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.newwave {
  margin: 20px;
}
.search {
  display: inline-flex;
  width: 80%;
  margin: 10px 0px;
}
.inputbutton {
  margin-right: 10px;
}
.caseowner {
  height: 670px;
  overflow-y: auto;
}
.item {
  margin: 4px;
}
</style>
