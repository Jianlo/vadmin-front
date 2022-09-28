<template>
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
    <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
    >

    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "MenuTabs",
  data(){
    return {

    }
  },
  computed:{
    editableTabs: {
      get() {
        return this.$store.state.menus.editableTabs
      },
      set(val) {
        this.$store.state.menus.editableTabs = val
      }
    },
    editableTabsValue: {
      get() {
        return this.$store.state.menus.editableTabsValue
      },
      set(val) {
        this.$store.state.menus.editableTabsValue = val
      }
    }
  },
  methods:{
    removeTab(tabName) {

      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;

      if (tabName === 'Index') {
        return
      }

      if (activeName === tabName) {
        tabs.forEach((tab, index) => {
          if (tab.name === tabName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== tabName);
      this.$router.push({name: activeName})

    },
    clickTab (target) {
      this.$router.push({name: target.name})
    }
  }

}
</script>

<style scoped>

</style>