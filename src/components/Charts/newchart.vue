<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div class="container">
    <div style="display: inline-block; width: 1800px">
      <div
        id="main"
        style="width: 840px; height: 500px; display: inline-block"
      ></div>
      <div
        id="mains"
        style="width: 840px; height: 500px; display: inline-block"
      ></div>
    </div>
    <el-dialog title="线上问题-技术导向" :visible.sync="dialogTableVisible">
      <el-table :data="tableData" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="id" width="40"></el-table-column> -->
        <el-table-column prop="name" label="描述" width="400"></el-table-column>
        <el-table-column prop="desc" label="原因"></el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="width: 45px; height: 25px"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="线上问题-网络" :visible.sync="netTableVisible">
      <el-table :data="tableDatanetwork" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="id" width="40"></el-table-column> -->
        <el-table-column prop="name" label="描述" width="400"></el-table-column>
        <el-table-column prop="desc" label="原因"></el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="width: 45px; height: 25px"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="线上问题-浏览器" :visible.sync="browserTableVisible">
      <el-table :data="tableDatabroeser" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="id" width="40"></el-table-column> -->
        <el-table-column prop="name" label="描述" width="400"></el-table-column>
        <el-table-column prop="desc" label="原因"></el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="width: 45px; height: 25px"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="线上问题-视频云" :visible.sync="videoTableVisible">
      <el-table :data="tableDatavideo" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="id" width="40"></el-table-column> -->
        <el-table-column prop="name" label="描述" width="400"></el-table-column>
        <el-table-column prop="desc" label="原因"></el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="width: 45px; height: 25px"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="线上问题-非bug" :visible.sync="nobugTableVisible">
      <el-table :data="tableDatanobug" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="id" width="40"></el-table-column> -->
        <el-table-column prop="name" label="描述" width="400"></el-table-column>
        <el-table-column prop="desc" label="原因"></el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="width: 45px; height: 25px"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="线上问题-待确认" :visible.sync="checkTableVisible">
      <el-table :data="tableDatacheck" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="id" width="40"></el-table-column> -->
        <el-table-column prop="name" label="描述" width="400"></el-table-column>
        <el-table-column prop="desc" label="原因"></el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="width: 45px; height: 25px"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="线上问题-技术导向" :visible.sync="dialogTableVisibleweb">
      <el-table :data="tableDataweb" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="id" width="40"></el-table-column> -->
        <el-table-column prop="name" label="描述" width="400"></el-table-column>
        <el-table-column prop="desc" label="原因"></el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="width: 45px; height: 25px"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="线上问题-网络" :visible.sync="netTableVisibleweb">
      <el-table :data="tableDatanetworkweb" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="id" width="40"></el-table-column> -->
        <el-table-column prop="name" label="描述" width="400"></el-table-column>
        <el-table-column prop="desc" label="原因"></el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="width: 45px; height: 25px"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="线上问题-浏览器" :visible.sync="browserTableVisibleweb">
      <el-table :data="tableDatabroeserweb" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="id" width="40"></el-table-column> -->
        <el-table-column prop="name" label="描述" width="400"></el-table-column>
        <el-table-column prop="desc" label="原因"></el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="width: 45px; height: 25px"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="线上问题-视频云" :visible.sync="videoTableVisibleweb">
      <el-table :data="tableDatavideoweb" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="id" width="40"></el-table-column> -->
        <el-table-column prop="name" label="描述" width="400"></el-table-column>
        <el-table-column prop="desc" label="原因"></el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="width: 45px; height: 25px"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="线上问题-非bug" :visible.sync="nobugTableVisibleweb">
      <el-table :data="tableDatanobugweb" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="id" width="40"></el-table-column> -->
        <el-table-column prop="name" label="描述" width="400"></el-table-column>
        <el-table-column prop="desc" label="原因"></el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="width: 45px; height: 25px"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="线上问题-待确认" :visible.sync="checkTableVisibleweb">
      <el-table :data="tableDatacheckweb" stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="id" width="40"></el-table-column> -->
        <el-table-column prop="name" label="描述" width="400"></el-table-column>
        <el-table-column prop="desc" label="原因"></el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              style="width: 45px; height: 25px"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <div class="prodesc">
      <span>问题描述：</span>
      <div class="search">
        <el-input
          placeholder="填写问题描述"
          v-model="input"
          clearable
          class="inputbutton"
          type="textarea"
          :rows="2"
        ></el-input>
      </div>
    </div>
    <div class="prodesc">
      <span>问题原因：</span>
      <div class="search">
        <el-input
          placeholder="填写问题原因"
          v-model="inputinfo"
          clearable="true"
          class="inputbutton"
          type="textarea"
          :rows="2"
        ></el-input>
      </div>
    </div>
    <div class="prodesc">
      <span>问题分类：</span>
      <div class="search">
        <el-select
          v-model="value"
          clearable
          placeholder="分类"
          style="margin-right: 5px"
        >
          <el-option
            style="padding-left: 20px"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="prodesc">
      <span>问题分区：</span>
      <div class="search">
        <el-radio v-model="radio" label="1">web页面</el-radio>
        <el-radio v-model="radio" label="2" style="margin-left: 5px"
          >播放器</el-radio
        >
      </div>
    </div>
    <el-button
      type="primary"
      size="small"
      style="width: 90px; height: 35px"
      @click="newinputdata()"
      >问题新增</el-button
    >
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "index",
  data() {
    return {
      radio: "",
      input: "",
      inputinfo: "",
      options: [
        {
          value: 1,
          label: "技术关系（研发+测试）",
        },
        {
          value: 2,
          label: "网络问题",
        },
        {
          value: 3,
          label: "浏览器问题",
        },
        {
          value: 4,
          label: "非bug",
        },
        {
          value: 5,
          label: "视频源文件",
        },
        {
          value: 6,
          label: "未复现",
        },
      ],
      value: "",
      charts: "",
      opinion: [
        "技术关系（研发+测试）",
        "网络问题",
        "浏览器问题",
        "非bug",
        "视频源文件",
        "未复现",
      ],
      opinionData: [],
      opinions: [
        "技术关系（研发+测试）",
        "网络问题",
        "浏览器问题",
        "非bug",
        "视频源文件",
        "未复现",
      ],
      opinionsData: [],
      dialogTableVisible: false,
      netTableVisible: false,
      browserTableVisible: false,
      videoTableVisible: false,
      nobugTableVisible: false,
      checkTableVisible: false,
      tableData: [],
      tableDatanetwork: [],
      tableDatabroeser: [],
      tableDatavideo: [],
      tableDatanobug: [],
      tableDatacheck: [],
      dialogTableVisibleweb: false,
      netTableVisibleweb: false,
      browserTableVisibleweb: false,
      videoTableVisibleweb: false,
      nobugTableVisibleweb: false,
      checkTableVisibleweb: false,
      tableDataweb: [],
      tableDatanetworkweb: [],
      tableDatabroeserweb: [],
      tableDatavideoweb: [],
      tableDatanobugweb: [],
      tableDatacheckweb: [],
      vediolength: 0,
      weblength: 0,
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
      this.charts.on("click", function (param) {
        if (param.data.index === 1) {
          me.dialogTableVisible = true;
        } else if (param.data.index === 2) {
          me.netTableVisible = true;
        } else if (param.data.index === 3) {
          me.browserTableVisible = true;
        } else if (param.data.index === 4) {
          me.nobugTableVisible = true;
        } else if (param.data.index === 5) {
          me.videoTableVisible = true;
        } else if (param.data.index === 6) {
          me.checkTableVisible = true;
        }
      });
      this.charts.setOption({
        title: {
          text: "播放器-线上问题数量归类",
          subtext: "问题总数：" + this.vediolength + " 个",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.opinion,
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "70%",
            center: ["40%", "50%"],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            data: this.opinionData,
          },
        ],
      });
    },
    drawPies(id) {
      var me = this;
      this.charts = echarts.init(document.getElementById(id));
      this.charts.on("click", function (param) {
        if (param.data.index === 1) {
          me.dialogTableVisibleweb = true;
        } else if (param.data.index === 2) {
          me.netTableVisibleweb = true;
        } else if (param.data.index === 3) {
          me.browserTableVisibleweb = true;
        } else if (param.data.index === 4) {
          me.nobugTableVisibleweb = true;
        } else if (param.data.index === 5) {
          me.videoTableVisibleweb = true;
        } else if (param.data.index === 6) {
          me.checkTableVisibleweb = true;
        }
      });
      this.charts.setOption({
        title: {
          text: "web页面-线上问题数量归类",
          subtext: "问题总数：" + this.weblength + " 个",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.opinions,
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "70%",
            center: ["40%", "50%"],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            data: this.opinionsData,
          },
        ],
      });
    },
    newinputdata() {
      try {
        if (this.input && this.inputinfo && this.radio && this.value) {
          const obj = {
            name: this.input,
            desc: this.inputinfo,
            type: this.radio,
            category: this.value,
          };
          this.$http
            .insertproblemdata(obj)
            .then((res) => {
              if (res.msg === "success") {
                this.getdata();
                this.$message({
                  message: "数据新增成功~",
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
            message: "请输入完整信息",
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
    getdata() {
      try {
        const obj = {
          option: "getwebquailtydata",
        };
        this.$http
          .getproblemdata(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.tableData = res.tableData;
              this.tableDatanetwork = res.tableDatanetwork;
              this.tableDatabroeser = res.tableDatabroeser;
              this.tableDatavideo = res.tableDatavideo;
              this.tableDatanobug = res.tableDatanobug;
              this.tableDatacheck = res.tableDatacheck;
              this.tableDataweb = res.tableDataweb;
              this.tableDatanetworkweb = res.tableDatanetworkweb;
              this.tableDatabroeserweb = res.tableDatabroeserweb;
              this.tableDatavideoweb = res.tableDatavideoweb;
              this.tableDatanobugweb = res.tableDatanobugweb;
              this.tableDatacheckweb = res.tableDatacheckweb;
              this.vediolength = res.videolen;
              this.weblength = res.weblen;

              this.opinionData = [
                {
                  value: res.tableData.length,
                  name: "技术关系（研发+测试）",
                  index: 1,
                },
                {
                  value: res.tableDatanetwork.length,
                  name: "网络问题",
                  index: 2,
                },
                {
                  value: res.tableDatabroeser.length,
                  name: "浏览器问题",
                  index: 3,
                },
                { value: res.tableDatanobug.length, name: "非bug", index: 4 },
                {
                  value: res.tableDatavideo.length,
                  name: "视频源文件",
                  index: 5,
                },
                { value: res.tableDatacheck.length, name: "未复现", index: 6 },
              ];
              this.opinionsData = [
                {
                  value: res.tableDataweb.length,
                  name: "技术关系（研发+测试）",
                  index: 1,
                },
                {
                  value: res.tableDatanetworkweb.length,
                  name: "网络问题",
                  index: 2,
                },
                {
                  value: res.tableDatabroeserweb.length,
                  name: "浏览器问题",
                  index: 3,
                },
                {
                  value: res.tableDatanobugweb.length,
                  name: "非bug",
                  index: 4,
                },
                {
                  value: res.tableDatavideoweb.length,
                  name: "视频源文件",
                  index: 5,
                },
                {
                  value: res.tableDatacheckweb.length,
                  name: "未复现",
                  index: 6,
                },
              ];

              this.$nextTick(function () {
                this.drawPie("main");
                this.drawPies("mains");
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
    handleDelete(row) {
      console.log(row);
      try {
        const obj = {
          name: row.name,
          type: row.type,
        };
        this.$http
          .delproblemdata(obj)
          .then((res) => {
            if (res.msg === "success") {
              (this.dialogTableVisible = false),
                (this.netTableVisible = false),
                (this.browserTableVisible = false),
                (this.videoTableVisible = false),
                (this.nobugTableVisible = false),
                (this.checkTableVisible = false),
                (this.dialogTableVisibleweb = false),
                (this.netTableVisibleweb = false),
                (this.browserTableVisibleweb = false),
                (this.videoTableVisibleweb = false),
                (this.nobugTableVisibleweb = false),
                (this.checkTableVisibleweb = false),
                this.getdata();
              this.$message({
                message: "数据删除成功~",
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
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.container {
  display: inline-block;
}
.search-button {
  margin-top: 30px;
  padding: 10px 20px;
}
.search {
  display: inline-flex;
  width: 70%;
}
.inputbutton {
  margin-right: 10px;
}
.prodesc {
  margin-bottom: 10px;
}
</style>