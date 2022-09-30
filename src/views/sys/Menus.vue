<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
          prop="name"
          label="名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="permCode"
          label="权限编码"
          width="180">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="图标">
      </el-table-column>
      <el-table-column
          prop="type"
          label="类型"
          width="180">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.type === 0">目录</el-tag>
          <el-tag size="small" v-else-if="scope.row.type === 1" type="success">菜单</el-tag>
          <el-tag size="small" v-else-if="scope.row.type === 2" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="path"
          label="菜单路径"
          width="180">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status === 1" type="success">正常</el-tag>
          <el-tag size="small" v-else-if="scope.row.status === 0" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="operate"
          label="操作">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "Menus.vue",
  data()
  {
    return {
      tableData: []
    }
  },
  methods:{
    getMenus(){
      this.tableData = [{
        id: 1,
        name: '系统管理',
        permCode: 'sys:manage',
        icon: 'el-icon-s-operation',
        type: 0,
        path: '',
        status: 1,
        operate: '',
        children: [{
          id: 11,
          name: '菜单管理',
          permCode: 'sys:menus:list',
          icon: 'el-icon-s-operation',
          type: 1,
          path: '',
          status: 1,
          operate: '',
          children: [{
            id:111,
            name: '编辑菜单',
            permCode: 'sys:menus:update',
            icon: 'el-icon-s-operation',
            type: 2,
            path: '',
            status: 1,
            operate: '',
            children: []
          }]
        }]
      }]
    }
  },
  created() {
    this.getMenus()
  }
}

</script>

<style scoped>

</style>