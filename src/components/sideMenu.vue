<template>
    <div id="sideMenu">
      <el-menu id="side-menu" mode="vertical" router>
        <el-menu-item index="/admin/home">主页</el-menu-item>
        <el-menu-item index="/admin/questionairelist">问卷列表</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </div>
</template>

<style scoped>
  #side-menu, #sideMenu {
    height: 100%;
  }
</style>

<script>
export default {
  name: 'sideMenu',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
#sideMenu {
  text-align: center;
}
</style>