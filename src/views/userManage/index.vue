<template>
  <div class="outer">
    <div class="content">
      <header-handle></header-handle>
      <div class="list">
        <div class="search-bar">
          <span>用户管理</span>
          <!-- <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> -->
          <el-button type="primary" style="margin-left: auto;" @click="addNewUser('add')">新建用户</el-button>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="用户ID">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
          >
            <template slot-scope="scope">
              <span>{{scope.row.mobile && scope.row.mobile.length === 11 ? scope.row.mobile.replace(scope.row.mobile.substr(3, 4), "****") : scope.row.mobile}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="用户角色">
            <template slot-scope="scope">
              <span>{{scope.row.type === 1 ? '超级管理员' : '管理员'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="创建时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="浙政钉绑定">
            <template slot-scope="scope">
              <span>{{scope.row.is_bind ? '是' : '否'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="editItem('edit', scope.row)">编辑</el-button>
              <el-button type="text" style="color:#F56C6C;" @click="deleteItem(scope.row)">删除</el-button>
              <el-button type="text" style="color:#F56C6C;" v-if="scope.row.is_bind " @click="unbindItem(scope.row)">解绑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          class="pagination"
          :total="page.total">
        </el-pagination>
      </div>
    </div>

    <el-dialog
      :title="type === 'edit' ? '编辑用户信息' : '新建用户'"
      :visible.sync="addNewDialog"
      :close-on-click-modal="false"
      @closed="closedDialog"
      width="35%"
    >
      <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" placeholder="请输入用户名" v-model="form.userName" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input type="tel" placeholder="请输入手机号" v-model="form.mobile" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" placeholder="用户密码" v-model="form.password" style="width:70%;"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'js-md5';
import { adminList, addUser, deleteUser, editUser,unbindAccount } from '@/service/user'
import { login } from '@/service/user.js';
const validateUsername = (rule, value, callback) => {
  console.log(value, 'value')
  var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/;
  if (!value) {
    callback(new Error('请输入用户名'))
  } else if (value.trim().length > 20) {
    callback(new Error('请输入20位以内的用户名'))
  } else if(!reg.exec(value)) {
    callback(new Error('您输入的账号中含有非法字符，请重新输入'))
  } else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (value.length < 6 || value.length > 18) {
    callback(new Error('请输入长度为6-18位的密码'))
  } else {
    callback()
  }
}
const validateMobile = (rule, value, callback) => {
  if(!value) {
    callback(new Error('请输入手机号'));
  } else if(value.length != 11) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback();
  }
}
export default {
  name: 'userManage',
  data() {
    return {
      isLogin: false,
      admin_info: '',
      value: '',
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      addNewDialog: false,
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      type: '',
      curEditInfo: '',
      oldPass: ''
    }
  },
  mounted() {
    if(localStorage.getItem('token')) {
      this.isLogin = true
      if(localStorage.getItem('admin_info')) {
        this.admin_info = JSON.parse(localStorage.getItem('admin_info'))
        console.log(this.admin_info, 'admin_info')
      }
    } else {
      this.isLogin = false
    }
    this.getList()
  },
  methods: {
    /**
     * todo 获取用户列表
     */
    async getList() {
      let _data = await adminList({
        page: this.page.currentPage,
        page_size: this.page.pageSize
      })
      console.log(_data, 'data')
      if(_data.code === 0) {
        this.tableData = _data.data.rows
        let pageInfo = {
          currentPage: _data.data.page,
          pageSize: _data.data.page_size,
          total: _data.data.count
        }
        this.page = pageInfo
      } else {
        this.$message.error(_data.msg)
      }
    },
    handleSizeChange(e) {
      console.log(e, 'e')
      this.page.pageSize = e
      this.getList()
    },
    handleCurrentChange(e) {
      console.log(e, 'e')
      this.page.currentPage = e
      this.getList()
    },
    /**
     * todo 表单提交
     */
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if(valid) {
          if(this.type === 'edit') { // ! 编辑
            let pass = ''
            if(this.curEditInfo.password === this.form.password) {
              pass = this.form.password
            } else {
              pass = md5(this.form.password)
            }
            let _data = await editUser({
              user_name: this.form.userName,
              password: pass,
              mobile: this.form.mobile,
              id: this.curEditInfo.id
            })
            if(_data.code === 0) {
              this.$message.success('编辑成功')
              this.addNewDialog = false
              this.getList()
            } else {
              this.$message.error(_data.msg)
            }
          } else {  // ! 新增
            let _data = await addUser({
              user_name: this.form.userName,
              mobile: this.form.mobile,
              password: md5(this.form.password)
            })
            if(_data.code === 0) {
              this.page.currentPage = 1
              this.addNewDialog = false
              this.getList()
            } else {
              this.$message.error(_data.msg)
            }
          }
        } else {
          console.log('error!')
          return
        }
      })
    },
    /**
     * todo 重置
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    unbindItem(scope){     
        this.$confirm('此操作将解除与绑定浙的绑定, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const _data = await unbindAccount({
          admin_id: scope.id
        })
        if(_data.code === 0) {
          this.$message.success('解除绑定成功')
          this.page.currentPage = 1
          this.getList()
        } else {
          this.$message.error(_data.msg)
        }
      }).catch(() => {
                
      });
    },
    /**
     * todo 删除用户
     */
    deleteItem(scope) {
      this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const _data = await deleteUser({
          ids: scope.id
        })
        if(_data.code === 0) {
          this.page.currentPage = 1
          this.getList()
        } else {
          this.$message.error(_data.msg)
        }
      }).catch(() => {
                
      });
    },
    /**
     * todo 关闭弹窗
     */
    closedDialog() {
      let params = {
        userName: '',
        password: ''
      }
      this.form = params
      this.curEditInfo = ''
    },
    /**
     * todo 新增用户
     */
    addNewUser(type) {
      this.addNewDialog = true
      this.type = type
    },
    /**
     * todo 编辑用户
     */
    editItem(type, item) {
      this.addNewDialog = true
      this.type = type
      this.curEditInfo = item
      let params = {
        userName: item.user_name,
        password: item.password,
        mobile: item.mobile
      }
      this.form = params
    },
  }
}
</script>

<style lang="scss" scoped>
  .outer {
    background: rgba(11,34,54,1);
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .content {
    width: 100%;
    height: 100%;
    background: url(https://img.hzanchu.com/acimg/e7fbf2b92cc0342f8a4d928906eccdf3.png) no-repeat;
    background-size: 100%;
    overflow-y: scroll;
  }

  .handle {
    position: absolute;
    overflow: hidden;
    top: 10%;
    right: 3%;
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      margin-right: 50px;
      cursor: pointer;
      img {
        height: 50px;
        margin-right: 10px;
      }
      span {
        font-size: 44px;
        font-family: PingFang SC Regular, PingFang SC Regular-Regular;
        font-weight: 400;
        color: #75E3FF;
      }
      span:hover {
        text-decoration: underline;
      }
    }
  }
  .list {
    width: 2850px;
    overflow: hidden;
    margin: 260px auto 0;
    background: rgba(8, 44, 89, 0.85);
    padding: 0 60px;
    border-radius: 24px;
    .search-bar {
      display: flex;
      align-items: center;
      height: 240px;
      span {
        font-size: 56px;
        color: #fff;
        font-weight: 600;
      }
      .input-with-select {
        width: 600px;
        margin-left: auto;
      }
    }
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 30px 0;
  }
</style>

<style lang="scss">
  .list {
    .el-pagination__total {
      color: #fff;
    }
    .el-pagination .el-input__inner {
      background: transparent;
      color: #fff;
    }
    .el-pagination__jump {
      color: #fff;
    }
    .btn-prev,.btn-next {
      background: transparent;
      color: #fff;
    }
    .btn-prev:disabled {
      background: transparent;
    }
    .btn-next:disabled {
      background: transparent;
    }
    ul li {
      background: transparent;
      color: #fff;
    }
    .el-table, .el-table__expanded-cell {
      background: transparent;
    }
    .el-table .has-gutter {
      background: rgba(29,68,118,0.8);
      color: #fff;
    }
    .el-table th {
      background: transparent;
      border-bottom-color: rgba(29,68,118,1);
    }
    .el-table tr {
      background: transparent;
      color: #fff;
      td {  
        border-bottom-color: rgba(29,68,118,1);
      }
    }
    .el-table .el-table__body-wrapper tr:hover {
      td {
        background: rgba(29,68,118,0.8);
      }
    }
    .el-table::before {
      background: none;
    }
  }
</style>