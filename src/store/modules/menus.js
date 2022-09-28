import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {

        menuList: [
            {
                name: 'SysManage',
                title: '系统管理',
                icon: 'el-icon-s-operation',
                path: '',
                children:[
                    {
                        name: 'UserManage',
                        title: '用户管理',
                        icon: 'el-icon-s-custom',
                        path: '/sys/users',
                        children: []
                    },
                    {
                        name: 'RoleManage',
                        title: '角色管理',
                        icon: 'el-icon-s-check',
                        path: '/sys/roles',
                        children: []
                    }
                ]
            },
            {
                name: 'SysTools',
                title: '系统工具',
                icon: 'el-icon-setting',
                path: '',
                children:[
                    {
                        name: 'DataQuery',
                        title: '数据字典',
                        icon: 'el-icon-tickets',
                        path: '/sys/data',
                        children: []
                    },

                ]
            },
        ],
        permList: [],

        hasRoutes: false,

        editableTabsValue: 'Index',
        editableTabs: [{
            title: '首页',
            name: 'Index',
        }]

    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus
        },
        setPermList(state, perms) {
            state.permList = perms
        },
        changeRouteStatus(state, hasRoutes) {
            state.hasRoutes = hasRoutes
        },

        addTab(state,tab){

            let index = state.editableTabs.findIndex(e => e.name === tab.name)

            if (index === -1) {
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name,
                });
            }

            state.editableTabsValue = tab.name;
        },
        resetState: (state) => {
            state.menuList = []
            state.permList = []

            state.hasRoutes = false
            state.editableTabsValue = 'Index'
            state.editableTabs = [{
                title: '首页',
                name: 'Index',
            }]
        }


    },
    actions: {
    },

}