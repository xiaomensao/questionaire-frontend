<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div id="notLogin" v-if="isNotInLogin()">
      <el-container>
        <el-header id="page-header-wrapper">
          <page-header></page-header>
        </el-header>
        <el-container>
          <el-aside id="side-menu-wrapper">
            <side-menu></side-menu>
          </el-aside>
          <el-container>
            <el-main id="main-content">
              <router-view></router-view>
            </el-main>
            <el-footer>Footer</el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
    <div id="login" v-else>
      <router-view></router-view> 
    </div>
  </div>
</template>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #page-header-wrapper {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    z-index: 1020;
    background-color: #ecf5ff;
    color: #409EFF;
    border-color: #b3d8ff;
  }
  
  #side-menu-wrapper {
    width: 20% !important;
  }

  #main-content {
    min-height: 100vh;
  }
</style>

<script>

import pageHeader from './components/pageHeader.vue';
import sideMenu from './components/sideMenu.vue';
export default {
  name: 'app',
  components: {
      sideMenu,
      pageHeader,
  },
  methods: {
    isNotInLogin() {
      return this.$router.history.current["path"] !== "/login";
    }
  },
}
</script>
