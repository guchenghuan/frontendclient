<template>
  <div class="app-container">
    <div class="header">
      <el-radio-group v-model="radio1">
        <el-radio-button label="播放器核心/常规case"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="search">
      <el-input
        placeholder="请输入查找对象"
        v-model="input"
        clearable
        class="inputbutton"
      ></el-input>
      <el-button type="primary" @click="searchcase()">用例查找</el-button>
    </div>
    <div class="tablechange">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
        element-loading-text="正在执行，请稍候..."
        :cell-style="tableRowClassName"
      >
        <el-table-column
          fixed
          prop="id"
          label="序号"
          width="60"
        ></el-table-column>
        <el-table-column prop="name" label="case场景"></el-table-column>
        <!-- <el-table-column prop="rate" label="成功率" width="80"></el-table-column> -->
        <el-table-column
          prop="date"
          label="更新时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="result"
          label="结果"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="comment"
          label="备注"
          width="350"
        ></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="handleClick(scope.row)"
              >执行</el-button
            >
            <el-button size="mini" type="info" @click="handleLog(scope.row)"
              >日志</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="newinbut">
        <el-button type="primary" @click="insertnewcase()">用例新增</el-button>
        <el-button type="primary" @click="getAllcase()">一键拉取</el-button>
      </div>
    </div>
    <div class="pagelist">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        background
        :page-size="10"
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next, jumper"
        :total="totalnums"
      ></el-pagination>
    </div>
    <el-dialog
      title="删除提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>确定删除本条case吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="caseDelCancel()">取 消</el-button>
        <el-button type="primary" @click="caseDelCheck()">确 定</el-button>
      </span>
    </el-dialog>
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
    <el-dialog title="编辑videoCase" :visible.sync="dialogFormVisible">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="case场景">
          <div>{{ formLabelAlign.name }}</div>
        </el-form-item>
        <el-form-item label="成功率">
          <div>{{ formLabelAlign.rate }}</div>
        </el-form-item>
        <el-form-item label="更新时间">
          <div>{{ formLabelAlign.date }}</div>
        </el-form-item>
        <el-form-item label="状态">
          <div>{{ formLabelAlign.status }}</div>
        </el-form-item>
        <el-form-item label="结果">
          <div>{{ formLabelAlign.result }}</div>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="3"
            v-model="formLabelAlign.comment"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="videoEdit()">取 消</el-button>
        <el-button type="primary" @click="videocheck()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增case" :visible.sync="dialognewFormVisible">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="case场景">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.comment"></el-input>
        </el-form-item>
        <!-- <el-form-item label="更新时间">
          <el-input v-model="form.Date"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
        <el-form-item label="结果">
          <el-input v-model="form.results"></el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formcancel()">取 消</el-button>
        <el-button type="primary" @click="formcheck()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <div>{{form}}</div> -->
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
export default {
  name: "video",
  data() {
    return {
      loading: true,
      broserloading: false,
      currentPage3: 1,
      totalnums: 0,
      radio1: "播放器核心/常规case",
      centerDialogVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialognewFormVisible: false, //jianrong
      labelPosition: "left",
      input: "",
      driverValue: "",
      formLabelAlign: {
        id: "",
        name: "",
        rate: "",
        date: "",
        status: "",
        result: "",
        comment: "",
      },
      tableData: [],
      gridData: [],
      form: {
        id: "",
        name: "",
        rate: "",
        date: "",
        status: "",
        result: "",
        comment: "",
      },
      deletevideoData: {},
      gonewinsertid: "",
    };
  },
  mounted: {},
  created() {
    this.getAllcase();
  },
  computed: {},
  methods: {
    tableRowClassName(row, column) {
      if (row.column.label === "结果") {
        if (row.row.result === "Fail") {
          return "color: red";
        } else if (row.row.result === "PASS") {
          return "color: rgb(103 194 58)";
        }
      } else {
        return "";
      }
    },
    handleEdit(index, row) {
      //   console.log(row);
      this.dialogFormVisible = true;
      this.formLabelAlign.id = row.id;
      this.formLabelAlign.name = row.name;
      this.formLabelAlign.rate = row.rate;
      this.formLabelAlign.date = row.date;
      this.formLabelAlign.status = row.status;
      this.formLabelAlign.result = row.result;
      this.formLabelAlign.comment = row.comment;
    },
    handleClick(row) {
      try {
        this.loading = true;
        const id = row.id;
        const obj = {
          args: id,
          rundbname: "videoruncase",
        };
        this.$http
          .performcase(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.getAllcase();
              this.loading = false;
              this.$message({
                showClose: true,
                message: "执行成功",
                type: "success",
              });
            } else {
              this.getAllcase();
              this.loading = false;
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
            this.$message({
              showClose: true,
              message: "服务好像出问题了，请联系管理员",
              type: "error",
            });
          });
      } catch (e) {
        this.loading = false;
        console.log(e);
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员",
          type: "error",
        });
      }
    },
    handleLog(row) {
      try {
        const id = row.id;
        const obj = {
          id: id,
          dbname: "videologcase",
        };
        this.$http
          .getLoginfo(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.gridData = res.data;
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
        this.dialogTableVisible = true;
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
      this.deletevideoData = row;
      this.centerDialogVisible = true;
    },
    insertnewcase() {
      this.dialognewFormVisible = true;
    },
    searchcase() {
      try {
        //   if (this.input) {
        const obj = {
          dbname: "videomaincase",
          casename: this.input,
          limitnum: 1,
        };
        this.$http
          .searchvideocase(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.tableData = res.data;
              this.currentPage3 = 1;
              this.$message({
                message: "搜索成功",
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
        //   } else {
        //     this.$message({
        //       message: "请输入您想查询的信息~",
        //       type: "error",
        //     });
        //   }
      } catch (e) {
        console.log(e);
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员",
          type: "error",
        });
      }
    },
    formcancel() {
      this.dialognewFormVisible = false;
      this.form = {
        id: "",
        name: "",
        rate: "",
        date: "",
        status: "",
        result: "",
        comment: "",
      };
    },

    resolvedate() {
      //   debugger;
      var date = new Date();
      var d = new Date(date);
      var month = d.getMonth() + 1;
      var m = month < 10 ? "0" + month : month;
      var day = d.getDate();
      var dd = day < 10 ? "0" + day : day;
      var H = d.getHours();
      var h = H < 10 ? "0" + H : H;
      var M = d.getMinutes();
      var mm = M < 10 ? "0" + M : M;
      var S = d.getSeconds();
      var s = S < 10 ? "0" + S : S;
      var resDate = d.getFullYear() + "-" + m + "-" + dd;
      var resTime = h + ":" + mm + ":" + s;
      var alldate = resDate + " " + resTime;
      return alldate;
    },
    formcheck() {
      //   debugger;
      try {
        const newdate = this.resolvedate();
        if (this.form && this.form.name && this.form.comment) {
          const myobj = {
            id: this.gonewinsertid + 1,
            name: this.form.name,
            rate: this.form.rate || 0,
            date: this.form.date || newdate,
            status: this.form.status || "未执行",
            result: this.form.result || "waiting",
            comment: this.form.comment || "",
            isdel: 0,
            desc: "等待",
            state: "wait",
          };
          const obj = {
            dbnamef: "counters",
            dbnames: "videomaincase",
            myobj,
          };
          this.$http
            .videocasenewinsert(obj)
            .then((res) => {
              if (res.msg === "success") {
                this.getAllcase();
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
          this.dialognewFormVisible = false;
          this.form = {
            id: "",
            name: "",
            rate: "",
            date: "",
            status: "",
            result: "",
            comment: "",
          };
        } else {
          this.$message({
            message: "请填写完整信息",
            type: "error",
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
    getAllcase() {
      // 一键拉取
      try {
        this.loading = true;
        var limnum;
        if (this.currentPage3 === 1) {
          limnum = 1;
        } else {
          limnum = this.currentPage3;
        }
        const obj = {
          dbname: "videomaincase",
          limitnum: limnum,
        };
        this.$http
          .getcaseinfo(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.loading = false;
              this.tableData = res.data;
              this.totalnums = res.length;
              this.gonewinsertid = res.lastid;
              this.input = "";
              // this.$message({
              //   message: "加载成功",
              //   type: "success",
              // });
            } else {
              this.loading = false;
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
            this.$message({
              showClose: true,
              message: "服务好像出问题了，请联系管理员",
              type: "error",
            });
          });
      } catch (e) {
        console.log(e);
        this.loading = false;
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员",
          type: "error",
        });
      }
    },
    videoEdit() {
      this.dialogFormVisible = false;
    },
    videocheck() {
      try {
        const newdate = this.resolvedate();
        if (this.formLabelAlign && this.formLabelAlign.comment) {
          const obj = {
            updatenum: this.formLabelAlign.id,
            dbname: "videomaincase",
            comment: this.formLabelAlign.comment,
          };
          this.$http
            .editconform(obj)
            .then((res) => {
              if (res.msg === "success") {
                this.getAllcase();
                this.$message({
                  message: "编辑成功~",
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
          this.dialogFormVisible = false;
        } else {
          this.$message({
            message: "备注信息不可为空~",
            type: "error",
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
    caseDelCancel() {
      this.centerDialogVisible = false;
    },
    caseDelCheck() {
      try {
        if (this.deletevideoData) {
          const obj = {
            id: this.deletevideoData.id,
            dbname: "videomaincase",
          };
          this.$http
            .deleteconform(obj)
            .then((res) => {
              if (res.msg === "success") {
                this.getAllcase();
                this.$message({
                  message: "删除成功~",
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
          this.centerDialogVisible = false;
        } else {
          this.$message({
            message: "为获取到该case-id值~",
            type: "error",
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
    handleCurrentChange(val) {
      try {
        //   if (this.input) {
        var limnum;
        if (val === 1) {
          limnum = 1;
        } else {
          limnum = val;
        }
        const obj = {
          dbname: "videomaincase",
          casename: this.input,
          limitnum: limnum,
        };
        this.$http
          .searchvideocase(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.tableData = res.data;
              // this.$message({
              //   message: "搜索成功",
              //   type: "success",
              // });
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
        //   } else {
        //     this.$message({
        //       message: "请输入您想查询的信息~",
        //       type: "error",
        //     });
        //   }
      } catch (e) {
        console.log(e);
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员",
          type: "error",
        });
      }
    },
    getList() {
      var interfaces = os.networkInterfaces();
      for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (
            alias.family === "IPv4" &&
            alias.address !== "127.0.0.1" &&
            !alias.internal
          ) {
            return alias.address;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  margin-left: 20px;
}
.tablechange {
  margin-top: 20px;
}
.newinbut {
  margin-top: 20px;
}
.header {
  display: inline-block;
}
.search {
  display: inline-flex;
  float: right;
  width: 50%;
}
.inputbutton {
  margin-right: 10px;
}
.impcase {
  display: none;
}
.newwave {
  margin-top: 20px;
}
.pagelist {
  margin-top: 10px;
  text-align: center;
}
// .el-table .warning-row {
//   background: oldlace;
// }
// .el-table .success-row {
//   background: #f0f9eb;
// }
</style>
