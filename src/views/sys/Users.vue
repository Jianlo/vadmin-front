<template>
  <div>

    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.username"
            placeholder="用户名"
            clearable
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getUserList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="danger" :disabled="delBtnStatus" @click="delHandle(null)">批量删除</el-button>
      </el-form-item>

    </el-form>

    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
        @selection-change="handleSelectionChange">

      <el-table-column
          type="selection"
          width="55">
      </el-table-column>

      <el-table-column
          label="头像"
          width="50">
        <template slot-scope="scope">
          <el-avatar size="small" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column
          prop="username"
          label="用户名"
          width="120">
      </el-table-column>

      <el-table-column
          prop="roles"
          label="角色名称">
        <template slot-scope="scope">
          <el-tag size="small" type="info" v-for="item in scope.row.roles">{{item.name}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="email"
          label="邮箱">
      </el-table-column>

      <el-table-column
          prop="status"
          label="状态"
          width="150">
        <template slot-scope="scope">
          <el-switch @change="statusChange"
              style="display: block"
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="禁用">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column
          prop="operate"
          width="260px"
          label="操作">

        <template slot-scope="scope">
          <el-button type="text" @click="roleHandle(scope.row.id)">分配角色</el-button>
          <el-divider direction="vertical"></el-divider>

          <el-button type="text" @click="repassHandle(scope.row.id, scope.row.username)">重置密码</el-button>
          <el-divider direction="vertical"></el-divider>

<!--          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>-->
<!--          <el-divider direction="vertical"></el-divider>-->

          <el-button type="text" @click="delHandle(scope.row.id)">删除</el-button>


        </template>
      </el-table-column>

    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="current"
        :page-size="size"
        :total="total">
    </el-pagination>

    <!--新增对话框-->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名" prop="username" label-width="100px">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
          <el-alert
              title="初始密码为888888"
              :closable="false"
              type="info"
              style="line-height: 12px;"
          ></el-alert>
        </el-form-item>

        <el-form-item label="邮箱"  prop="email" label-width="100px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="状态"  prop="status" label-width="100px">
          <el-radio-group v-model="editForm.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible" width="600px">

      <el-form :model="roleForm">
        <el-tree
            :data="roleTreeData"
            show-checkbox
            ref="roleTree"
            :check-strictly=checkStrictly
            node-key="id"
            :default-expand-all=true
            :props="defaultProps">
        </el-tree>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitRoleHandle('roleForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "Users.vue",
  data(){
    return {
      status:true,
      searchForm:{
        username: ''
      },
      delBtnStatus: true,
      tableData:[{
        id:3,
        avatar: '',
        username: 'passer-by',
        roles: [{name:'管理员'},{name: '年度大会员'}],
        email: '2934316811@qq.com',
        status:true
      },{
        id:5,
        avatar: '',
        username: 'hhh',
        roles: [{name:'管理员'}],
        email: '2967611@qq.com',
        status:true
      }],
      multipleSelection: [],
      total: 0,
      size: 10,
      current: 1,
      dialogVisible:false,
      editForm:{

      },
      editFormRules: {
        username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      },
      roleDialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleForm: {},
      roleTreeData:  [
        {
          "id": 3,
          "created": "2021-01-04T10:09:14",
          "updated": "2021-01-30T08:19:52",
          "statu": 1,
          "name": "普通用户",
          "code": "normal",
          "remark": "只有基本查看功能",
          "menuIds": []
        },
        {
          "id": 6,
          "created": "2021-01-16T13:29:03",
          "updated": "2021-01-17T15:50:45",
          "statu": 1,
          "name": "超级管理员",
          "code": "admin",
          "remark": "系统默认最高权限，不可以编辑和任意修改",
          "menuIds": []
        }
      ],
      treeCheckedKeys: [],
      checkStrictly: true
    }
  },
  methods:{
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    statusChange(val){
      console.log(val)
      // todo:后端修改用户status
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      //删除按钮解除禁用
      this.delBtnStatus = val.length === 0
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getUserList()
    },
    getUserList() {
      this.$axios.get("/sys/user/list", {
        params: {
          username: this.searchForm.username,
          current: this.current,
          size: this.size
        }
      }).then(res => {
        this.tableData = res.data.data.records
        this.size = res.data.data.size
        this.current = res.data.data.current
        this.total = res.data.data.total
      })

    },

    delHandle(id) {

      var ids = []

      if (id) {
        ids.push(id)
      } else {
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
      }

      console.log(ids)

      this.$confirm('确定删除所选用户吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/sys/user/delete", ids).then(res => {
          this.$message({
            showClose: true,
            message: '恭喜你，操作成功',
            type: 'success',
            onClose: () => {
              this.getUserList()
            }
          });
        })
      })

    },

    // editHandle(id) {
    //   this.$axios.get('/sys/user/info/' + id).then(res => {
    //     this.editForm = res.data.data
    //
    //     this.dialogVisible = true
    //   })
    // },
    handleClose() {
      this.resetForm('editForm')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.editForm = {}
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sys/user/' + (this.editForm.id?'update' : 'save'), this.editForm)
              .then(res => {

                this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose:() => {
                    this.getUserList()
                  }
                });

                this.dialogVisible = false
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    roleHandle (id) {

      //获取角色列表
      this.$axios.get("/sys/role/list").then(res => {
        this.roleTreeData = res.data.data.records
      })

      this.roleDialogFormVisible = true

      //获取该用户拥有的角色
      this.$axios.get('/sys/user/info/' + id).then(res => {
        this.roleForm = res.data.data

        let roleIds = []
        res.data.data.sysRoles.forEach(row => {
          roleIds.push(row.id)
        })

        this.$refs.roleTree.setCheckedKeys(roleIds)
      })
    },
    submitRoleHandle(formName) {
      var roleIds = this.$refs.roleTree.getCheckedKeys()

      console.log(roleIds)

      this.$axios.post('/sys/user/role/' + this.roleForm.id, roleIds).then(res => {
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() => {
            this.getUserList()
          }
        });

        this.roleDialogFormVisible = false
      })
    },

    repassHandle(id, username) {

      this.$confirm('将重置用户【' + username + '】的密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/sys/user/repass", id).then(res => {
          this.$message({
            showClose: true,
            message: '恭喜你，操作成功',
            type: 'success',
            onClose: () => {
            }
          });
        })
      })
    },

    created() {
      this.getUserList()

      // this.$axios.get("/sys/role/list").then(res => {
      //   this.roleTreeData = res.data.data.records
      // })
    },


  }
}
</script>

<style scoped>

</style>