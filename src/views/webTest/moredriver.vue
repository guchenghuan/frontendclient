<template>
  <div class="app-container">
    <div class="showtop">
      <div class="header">
        <el-radio-group v-model="radio1">
          <el-radio-button label="多浏览器兼容性测试"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="newwave">
        请选择webDriver：
        <el-select v-model="driverValue" clearable placeholder="请选择">
          <el-option label="chrome" value="chromedriver"></el-option>
          <el-option label="firefox" value="firefoxdriver"></el-option>
          <el-option label="IE" value="IEdriver"></el-option>
          <el-option label="Safari" value="Safaridriver"></el-option>
          <el-option label="Edge" value="Edgedriver"></el-option>
        </el-select>
      </div>
      <div class="settop">
        <div class="remindinfo">
          核心case一键执行
          <span
            style="margin: 0px 100px; color: rgb(189 110 110); font-size: 15px"
          >
            当前总计
            <span style="margin: 0px 5px"> {{ totalnums }}</span> 条case,
            正在执行第 <span style="margin: 0px 5px"> {{ input }}</span> 条case
            ...</span
          >
        </div>
        <span style="margin-left: 200px"
          >耗时：
          <div class="timer">
            <div ref="startTimer"></div>
          </div>
        </span>
      </div>
    </div>
    <div class="caseowner">
      <div class="processline">
        <el-steps
          :space="50"
          finish-status="success"
          direction="vertical"
          :active="20"
        >
          <el-step
            :title="item.name"
            :description="item.desc"
            :status="item.state"
            v-for="item in tableData"
            :key="item.id"
            :icon="item.icon"
          ></el-step>
        </el-steps>
      </div>
    </div>
    <el-dialog title="运行代码如下" :visible.sync="dialognewFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <div style="color: red; display: inline-block">
          (编辑后即生效，谨慎操作！)
        </div>
        <div class="codeinput">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 30 }"
            placeholder="请输入内容"
            v-model="ruleForm.textarea"
          >
          </el-input>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">更新</el-button>
          <el-button @click="resetForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="newinbut">
      <el-button type="primary" @click="getstartrun()">一键执行</el-button>
      <el-button type="primary" @click="getcodeinfo()">查看代码</el-button>
      <el-button type="primary" @click="getloginfo()">查看日志</el-button>
      <el-button type="primary" @click="resetcaseinfo()">状态重置</el-button>
    </div>
    <el-dialog title="日志信息" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="日期"
          width="200"
        ></el-table-column>
        <el-table-column
          property="action"
          label="操作"
          width="100"
        ></el-table-column>
        <el-table-column property="data" label="详细记录"></el-table-column>
      </el-table>
    </el-dialog>
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
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { SUCCESS } from "dropzone";
import BackToTop from "@/components/BackToTop";
export default {
  name: "moredriver",
  components: { BackToTop },
  data() {
    return {
      timer: "",
      content: "",
      hour: 0,
      minutes: 0,
      seconds: 0,
      totalnums: 0,
      input: 0,
      driverValue: "",
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#e7eaf1", // 按钮的背景颜色 The background color of the button
      },
      radio1: "多浏览器兼容性测试",
      dialogTableVisible: false,
      dialognewFormVisible: false,
      ruleForm: {
        textarea: `
      const { Builder, By, Key, until } = require('selenium-webdriver');
      const { Options } = require('selenium-webdriver/chrome');

      var driver = new Builder()
          .forBrowser('chrome')
          .setChromeOptions(new Options().excludeSwitches(["ignore-certificate-errors", 'user-data-dir="C:\\Users\\guchenghuan\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1"']))
          // .setChromeOptions(new Options().addArguments("--auto-open-devtools-for-tabs"))
          .build();

      (async function run() {  // https://www.xxxxxxx.com/video/BV1154y1m7j1
          try {
              await driver.get('https://www.xxxxxxx.com/video/BV1154y1m7j1')
              // await driver.manage().window().maximize();
              // await driver.sleep(2000)
              // 获取播放按钮
              let button1 = await driver.wait(until.elementLocated(By.className('xxxxxxx-player-iconfont-start')), 2000);
              // 开始播放
              await button1.click()
              // 播放进行两秒
              await driver.sleep(2000)
              // 再次获取播放内部暂停按钮
              let button2 = await driver.wait(until.elementLocated(By.className('xxxxxxx-player-video-wrap')), 2000);
              // 暂停播放
              await button2.click()
              // 等待一秒
              await driver.sleep(1000)
              // 获取当前播放时长
              const results = await driver.executeScript(function () {
                  //调用JavaScript获取当前视频时长
                  var result = window.player.getCurrentTime()
                  return result
              })
              // 若时长大于2秒，则可继续
              if (results > 2) {
                  await driver.sleep(2000)
                  await driver.quit()
              } else {
                  // 播放功能执行失败，break
                  console.log('视频播放未能执行')
              }
          } catch (e) {
              console.log(e)
          }
      })()
      `,
      },
      gridData: [],
      tableData: [],
      stepids: [],
    };
  },
  mounted() {
    // this.cutTimeDown();
  },
  created() {
    this.getAllcase();
  },
  destroyed() {
    // clearInterval(this.timer);
  },
  watch: {},
  computed: {},
  methods: {
    startTimer() {
      this.seconds += 1;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes = this.minutes + 1;
      }

      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hour = this.hour + 1;
      }
      this.$refs.startTimer.innerHTML =
        (this.hour < 10 ? "0" + this.hour : this.hour) +
        ":" +
        (this.minutes < 10 ? "0" + this.minutes : this.minutes) +
        ":" +
        (this.seconds < 10 ? "0" + this.seconds : this.seconds);
    },

    changeicon(num) {
      this.tableData[num - 1].icon = "el-icon-loading";
      this.input = num;
    },
    reseticon(num) {
      this.tableData[num - 1].icon = "";
      this.input = "";
    },
    runcases(num) {
      let goonstartnums = this.stepids[num - 1];
      const obj = {
        webDriver: this.driverValue,
        args: goonstartnums, //
      };
      this.changeicon(num);
      this.$http
        .drivercaserun(obj)
        .then((res) => {
          if (res.msg === "success") {
            if (num < this.tableData.length && typeof res.data === "string") {
              if (res.data.indexOf("结果为") != -1) {
                this.tableData[res.id - 1].desc = "成功";
                this.tableData[res.id - 1].state = "success";
                this.tableData[res.id - 1].icon = "";
              } else {
                this.tableData[res.id - 1].desc = "失败";
                this.tableData[res.id - 1].state = "error";
                this.tableData[res.id - 1].icon = "";
              }
              this.reseticon(num);
              num = num + 1;
              this.runcases(num);
            } else {
              this.input = 0;
              this.tableData[num - 1].icon = "";
              clearInterval(this.timer);
              this.$notify.error({
                title: "提示",
                message: "该驱动未找到对应的指令信息~ 换个试试吧",
              });
            }
          } else {
            this.input = 0;
            this.tableData[num - 1].icon = "";
            clearInterval(this.timer);
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
    },
    getstartrun() {
      try {
        this.timer = setInterval(this.startTimer, 1000);
        this.runcases(1);
      } catch (e) {
        console.log(e);
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员",
          type: "error",
        });
      }
    },
    getloginfo() {
      try {
        const obj = {
          dbname: "broserlogcase",
        };
        this.$http
          .getlogdatainfo(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.gridData = res.data;
              this.dialogTableVisible = true;
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
    getcodeinfo() {
      this.dialognewFormVisible = true;
    },
    resetcaseinfo() {
      try {
        const obj = {
          dbname: "videomaincase",
        };
        this.$http
          .resetmainvideo(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.$message({
                message: "重置成功",
                type: "success",
              });
              this.getAllcase();
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
    submitForm() {
      this.$message({
        message: "更新成功",
        type: "success",
      });
      this.dialognewFormVisible = false;
    },
    resetForm() {
      this.dialognewFormVisible = false;
    },
    getAllcase() {
      // 一键拉取
      try {
        const obj = {
          dbname: "videomaincase",
        };
        this.$http
          .getallcases(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.totalnums = res.data.length;
              this.tableData = res.data;
              res.data.forEach((element) => {
                this.stepids.push(element.id);
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
.app-container {
  margin-left: 20px;
}
.newinbut {
  margin-top: 20px;
}
.header {
  display: inline-block;
}
.newwave {
  margin-top: 20px;
}
.codeinput {
  margin: 10px 0;
}
.remindinfo {
  margin: 10px 0;
  padding: 5px;
  display: inline-block;
}
.processline {
  margin: 10px 0;
}
.caseowner {
  background-color: rgb(245, 245, 245);
  height: 660px;
  overflow-y: auto;
}
.buttotop {
  background-color: salmon;
}
.timer {
  display: inline-block;
}
.settop {
  background-color: rgb(245, 245, 245);
  margin-bottom: -10px;
  margin-top: 10px;
  height: 75px;
}
</style>
