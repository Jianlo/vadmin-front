<template>
  <div>

    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchForm.roleName"
            placeholder="角色名"
            clearable
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getRoleList">搜索</el-button>
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
          prop = "name"
          label="名称"
          width="120">
      </el-table-column>

      <el-table-column
          prop="code"
          label="编码"
          width="120">
      </el-table-column>


      <el-table-column
          prop="describe"
          label="描述">
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
          <el-button type="text" @click="permHandle(scope.row.id)">分配权限</el-button>
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
        <el-form-item label="角色名称" prop="roleName" label-width="100px">
          <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="唯一编码" prop="code" label-width="100px">
          <el-input v-model="editForm.code" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="describe" label-width="100px">
          <el-input v-model="editForm.describe" autocomplete="off"></el-input>
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

    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="permDialogFormVisible" width="600px" >

      <el-form :model="permForm">
        <el-tree
            :data="permTreeData"
            show-checkbox
            ref="permTree"
            :check-strictly=checkStrictly
            node-key="id"
            :default-expand-all=true
            :props="defaultProps">
        </el-tree>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="permDialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitPermHandle('roleForm')">确 定</el-button>
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
        roleName: ''
      },
      delBtnStatus: true,
      tableData:[{
        id:3,
        name: '管理员',
        code: 'admin',
        describe: '拥有管理员操作相关权限',
        status:true
      },{
        id:5,
        name: '普通用户',
        code: 'user',
        describe: '拥有普通用户操作相关权限',
        status:true
      }],
      multipleSelection: [],
      total: 0,
      size: 10,
      current: 1,
      dialogVisible:false,
      editForm: {

      },

      editFormRules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入唯一编码', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      },

      permDialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      permForm: {},
      permTreeData:  [
        {
          "id": 1,
          "created": "2021-01-15T18:58:18",
          "updated": "2021-01-15T18:58:20",
          "statu": 1,
          "parentId": 0,
          "name": "系统管理",
          "path": "",
          "perms": "sys:manage",
          "component": "",
          "type": 0,
          "icon": "el-icon-s-operation",
          "ordernum": 1,
          "children": [
            {
              "id": 2,
              "created": "2021-01-15T19:03:45",
              "updated": "2021-01-15T19:03:48",
              "statu": 1,
              "parentId": 1,
              "name": "用户管理",
              "path": "/sys/users",
              "perms": "sys:user:list",
              "component": "sys/User",
              "type": 1,
              "icon": "el-icon-s-custom",
              "ordernum": 1,
              "children": [
                {
                  "id": 9,
                  "created": "2021-01-17T21:48:32",
                  "updated": null,
                  "statu": 1,
                  "parentId": 2,
                  "name": "添加用户",
                  "path": null,
                  "perms": "sys:user:save",
                  "component": null,
                  "type": 2,
                  "icon": null,
                  "ordernum": 1,
                  "children": []
                },
                {
                  "id": 10,
                  "created": "2021-01-17T21:49:03",
                  "updated": "2021-01-17T21:53:04",
                  "statu": 1,
                  "parentId": 2,
                  "name": "修改用户",
                  "path": null,
                  "perms": "sys:user:update",
                  "component": null,
                  "type": 2,
                  "icon": null,
                  "ordernum": 2,
                  "children": []
                },
                {
                  "id": 11,
                  "created": "2021-01-17T21:49:21",
                  "updated": null,
                  "statu": 1,
                  "parentId": 2,
                  "name": "删除用户",
                  "path": null,
                  "perms": "sys:user:delete",
                  "component": null,
                  "type": 2,
                  "icon": null,
                  "ordernum": 3,
                  "children": []
                },
                {
                  "id": 12,
                  "created": "2021-01-17T21:49:58",
                  "updated": null,
                  "statu": 1,
                  "parentId": 2,
                  "name": "分配角色",
                  "path": null,
                  "perms": "sys:user:role",
                  "component": null,
                  "type": 2,
                  "icon": null,
                  "ordernum": 4,
                  "children": []
                },
                {
                  "id": 13,
                  "created": "2021-01-17T21:50:36",
                  "updated": null,
                  "statu": 1,
                  "parentId": 2,
                  "name": "重置密码",
                  "path": null,
                  "perms": "sys:user:repass",
                  "component": null,
                  "type": 2,
                  "icon": null,
                  "ordernum": 5,
                  "children": []
                }
              ]
            },
            {
              "id": 3,
              "created": "2021-01-15T19:03:45",
              "updated": "2021-01-15T19:03:48",
              "statu": 1,
              "parentId": 1,
              "name": "角色管理",
              "path": "/sys/roles",
              "perms": "sys:role:list",
              "component": "sys/Role",
              "type": 1,
              "icon": "el-icon-rank",
              "ordernum": 2,
              "children": []
            },

          ]
        },
        {
          "id": 5,
          "created": "2021-01-15T19:06:11",
          "updated": null,
          "statu": 1,
          "parentId": 0,
          "name": "系统工具",
          "path": "",
          "perms": "sys:tools",
          "component": null,
          "type": 0,
          "icon": "el-icon-s-tools",
          "ordernum": 2,
          "children": [
            {
              "id": 6,
              "created": "2021-01-15T19:07:18",
              "updated": "2021-01-18T16:32:13",
              "statu": 1,
              "parentId": 5,
              "name": "数字字典",
              "path": "/sys/dicts",
              "perms": "sys:dict:list",
              "component": "sys/Dict",
              "type": 1,
              "icon": "el-icon-s-order",
              "ordernum": 1,
              "children": []
            }
          ]
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
      this.getRoleList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getRoleList()
    },
    getRoleList() {
      this.$axios.get("/sys/role/list", {
        params: {
          roleName: this.searchForm.roleName,
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

      this.$confirm('确定删除所选角色吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/sys/role/delete", ids).then(res => {
          this.$message({
            showClose: true,
            message: '恭喜你，操作成功',
            type: 'success',
            onClose: () => {
              this.getRoleList()
            }
          });
        })
      })

    },

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
          this.$axios.post('/sys/role/' + (this.editForm.id?'update' : 'save'), this.editForm)
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

    permHandle (id) {

      //获取权限列表
      this.$axios.get("/sys/perm/list").then(res => {
        this.permTreeData = res.data.data.records
      })

      this.permDialogFormVisible = true

      //获取该角色拥有的权限
      this.$axios.get('/sys/role/info/' + id).then(res => {
        this.permForm = res.data.data

        let permIds = []
        res.data.data.sysRoles.forEach(row => {
          permIds.push(row.id)
        })

        this.$refs.permTree.setCheckedKeys(permIds)
      })
    },
    submitPermHandle(formName) {
      var permIds = this.$refs.permTree.getCheckedKeys()

      console.log(permIds)

      this.$axios.post('/sys/role/perm/' + this.permForm.id, permIds).then(res => {
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() => {
            this.getRoleList()
          }
        });

        this.permDialogFormVisible = false
      })
    },


    created() {
      this.getRoleList()
    },


  }
}
</script>

<style scoped>

</style>