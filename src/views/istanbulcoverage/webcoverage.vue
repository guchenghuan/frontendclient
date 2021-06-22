<template>
  <div class="app-container">
    <div class="header">
      <el-radio-group v-model="radio1">
        <el-radio-button label="前端覆盖率收集历史" />
      </el-radio-group>
    </div>
    <div class="search">
      <el-input
        v-model="input"
        placeholder="请输入查找对象"
        clearable
        class="inputbutton"
      />
      <div class="newinbut">
        <el-button type="primary" @click="searchrate()">查找</el-button>
        <el-button type="primary" @click="insertnewrate()">项目新增</el-button>
        <el-button type="primary" @click="getAllrate()">全量拉取</el-button>
      </div>
    </div>
    <div class="tablechange">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
        element-loading-text="正在执行，请稍候..."
        :cell-style="tableRowClassName"
      >
        <el-table-column fixed prop="id" label="序号" width="60" />
        <el-table-column prop="name" label="项目">
          <template slot-scope="scope">
            <el-link type="primary" :href="scope.row.url" target="_blank">
              {{ scope.row.name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="servername" label="发布服务" width="200">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :href="riderhref + scope.row.servername"
              target="_blank"
            >
              {{ scope.row.servername }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="applicationname" label="Gitlab" width="300">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :href="scope.row.applicationname"
              target="_blank"
            >
              {{ scope.row.applicationname }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="branch" label="分支" width="100" />
        <el-table-column prop="environment" label="环境" width="60" />
        <!-- <el-table-column
          prop="coveragerate"
          label="覆盖率"
          width="80"
        ></el-table-column> -->
        <el-table-column prop="date" label="更新时间" width="180" />
        <el-table-column label="开/关" width="70">
          <template scope="scope">
            <el-switch
              v-model="scope.row.isSelected"
              @change="changeselect(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handlerateClick(scope.row)"
              >查看详情</el-button
            >
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagelist">
      <el-pagination
        :current-page.sync="currentPage3"
        background
        :page-size="10"
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next, jumper"
        :total="totalnums"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="新增覆盖率项目" :visible.sync="dialognewFormVisible">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="项目名称">
          <el-input
            v-model="form.name"
            placeholder="《青春有你3》9要舞起来（主题曲二创征稿活动）"
          />
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input
            v-model="form.url"
            placeholder="https://www.xxxxx.com/xxxx/activity-UXWxZNfS4.html"
          />
        </el-form-item>
        <el-form-item label="Gitlab">
          <el-input
            v-model="form.applicationname"
            placeholder="https://git.xxxxxx.co/xxxx/xxxx"
          />
        </el-form-item>
        <el-form-item label="分支">
          <el-input v-model="form.branch" placeholder="coverage" />
        </el-form-item>
        <el-form-item label="服务">
          <el-input
            v-model="form.servername"
            placeholder="jinkela-watchlater-static"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formcancel()">取 消</el-button>
        <el-button type="primary" @click="formcheck()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑更改项目详情" :visible.sync="dialogFormVisible">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="项目名称">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="formLabelAlign.url" />
        </el-form-item>
        <el-form-item label="Gitlab">
          <el-input v-model="formLabelAlign.applicationname" />
        </el-form-item>
        <el-form-item label="分支">
          <el-input v-model="formLabelAlign.branch" />
        </el-form-item>
        <el-form-item label="服务">
          <el-input v-model="formLabelAlign.servername" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="coverageEdit()">取 消</el-button>
        <el-button type="primary" @click="coveragecheck()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <div>{{form}}</div> -->
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
export default {
  name: "Video",
  data() {
    return {
      loading: false,
      riderhref: "",
      currentPage3: 1,
      totalnums: 0,
      radio1: "前端覆盖率收集历史",
      input: "",
      dialognewFormVisible: false, // jianrong
      dialogFormVisible: false,
      labelPosition: "left",
      formLabelAlign: {
        id: "",
        name: "",
        url: "",
        applicationname: "",
        servername: "",
        branch: "",
      },
      form: {
        id: "",
        name: "",
        url: "",
        applicationname: "",
        servername: "",
        branch: "",
      },
      tableData: [],
    };
  },
  computed: {},
  mounted: {},
  created() {
    this.getAllrate();
  },
  methods: {
    tableRowClassName(row, column) {
      if (row.column.label === "覆盖率") {
        if (parseFloat(row.row.coveragerate) >= 80) {
          return "color: rgb(103 194 58)";
        } else {
          return "color: red";
        }
      } else {
        return "";
      }
    },
    changeselect(row) {
      try {
        const myobj = {
          updatenum: row.id,
          branch: row.branch,
          applicationname: row.applicationname,
          isSelected: row.isSelected,
        };
        const obj = {
          myobj,
        };
        this.$http
          .tooglecoverage(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.getAllrate();
              if (JSON.parse(row.isSelected)) {
                this.$message({
                  message: "覆盖率开始收集",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "覆盖率已关闭",
                  type: "success",
                });
              }
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
    handlerateClick(row) {
      try {
        if (JSON.parse(row.isSelected)) {
          const myobj = {
            applicationname: row.applicationname,
            isSelected: row.isSelected,
          };
          const obj = {
            myobj,
          };
          this.$http
            .getnewfile(obj)
            .then((res) => {
              if (res.msg === "success") {
                window.open(
                  "https://xx.xx.xx.xx:8988/xxxxx/webcoverage?name=" +
                    row.servername,
                  "_blank"
                );
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
          this.$message({
            showClose: true,
            message: "覆盖率收集已关闭，查看详情打开失败！",
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
    insertnewrate() {
      this.dialognewFormVisible = true;
    },
    searchrate() {
      try {
        if (this.input) {
          const obj = {
            casename: this.input,
            limitnum: 1,
          };
          this.$http
            .searchcoverage(obj)
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
        } else {
          this.$message({
            message: "请输入您想查询的信息~",
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
    formcheck() {
      //   debugger;
      try {
        if (
          this.form &&
          this.form.name &&
          this.form.url &&
          this.form.applicationname &&
          this.form.servername &&
          this.form.branch
        ) {
          const myobj = {
            name: this.form.name,
            url: this.form.url,
            applicationname: this.form.applicationname,
            servername: this.form.servername,
            branch: this.form.branch,
          };
          const obj = {
            myobj,
          };
          this.$http
            .insertcoverage(obj)
            .then((res) => {
              if (res.msg === "success") {
                this.getAllrate();
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
            url: "",
            applicationname: "",
            servername: "",
            branch: "",
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
    formcancel() {
      this.dialognewFormVisible = false;
      this.form = {
        id: "",
        name: "",
        url: "",
        applicationname: "",
        servername: "",
        branch: "",
      };
    },
    getAllrate() {
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
          limitnum: limnum,
        };
        this.$http
          .getAllcoverage(obj)
          .then((res) => {
            if (res.msg === "success") {
              this.loading = false;
              this.tableData = res.data;
              this.totalnums = res.length;
              this.input = "";
              // this.$message({
              //   message: "加载成功",
              //   type: "success",
              // });
            } else {
              this.loading = false;
              this.tableData = [];
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
          casename: this.input,
          limitnum: limnum,
        };
        this.$http
          .searchcoverage(obj)
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
      } catch (e) {
        console.log(e);
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员",
          type: "error",
        });
      }
    },
    handleEdit(index, row) {
      //   console.log(row);
      this.dialogFormVisible = true;
      this.formLabelAlign.id = row.id;
      this.formLabelAlign.name = row.name;
      this.formLabelAlign.url = row.url;
      this.formLabelAlign.applicationname = row.applicationname;
      this.formLabelAlign.servername = row.servername;
      this.formLabelAlign.branch = row.branch;
    },
    coverageEdit() {
      this.dialogFormVisible = false;
    },
    coveragecheck() {
      try {
        if (
          this.formLabelAlign &&
          this.formLabelAlign.name &&
          this.formLabelAlign.url &&
          this.formLabelAlign.applicationname &&
          this.formLabelAlign.servername &&
          this.formLabelAlign.branch
        ) {
          const myobj = {
            updatenum: this.formLabelAlign.id,
            name: this.formLabelAlign.name,
            url: this.formLabelAlign.url,
            applicationname: this.formLabelAlign.applicationname,
            servername: this.formLabelAlign.servername,
            branch: this.formLabelAlign.branch,
          };
          const obj = {
            myobj,
          };
          this.$http
            .editcoverage(obj)
            .then((res) => {
              if (res.msg === "success") {
                this.getAllrate();
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
  width: 50%;
}
.header {
  display: inline-block;
}
.search {
  display: inline-flex;
  float: right;
  width: 80%;
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
