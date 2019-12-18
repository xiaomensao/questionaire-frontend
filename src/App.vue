<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div id="notLogin" v-if="isNotInLogin()">
      <el-container>
        <el-aside>
          <side-menu></side-menu>
        </el-aside>
          <el-container>
            <page-header></page-header>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
    </div>
    <div id="login" v-else>
      <router-view></router-view> 
    </div>
  </div>
</template>

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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
