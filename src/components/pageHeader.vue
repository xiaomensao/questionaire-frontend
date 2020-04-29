<template>
    <div id="pageHeader">
      <el-row :gutter="10" id="header-row">
        <el-col :xs="24" :md="12" id="title-col">
          <h1>问卷管理系统</h1>
        </el-col>
        <el-col :xs="24" :md="12" id="user-col">
          <div id="user-info">
            <!-- <el-avatar icon="el-icon-message-solid"></el-avatar> -->
            <el-dropdown>
              <span class="el-dropdown-link">
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{userName}}</el-dropdown-item>
                <el-dropdown-item divided>设置</el-dropdown-item>
                <el-dropdown-item>登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          </el-col>
      </el-row>
    </div>
</template>

<style scoped>
  #header-row {
    display: flex;
  }

  #title-col {
    display: flex;
  }

  #title-col h1 {
    font-weight: bold;
  }
  
  #user-col {
    display: flex;
  }

  #user-info {
    margin-left: auto;
    margin-top: auto;
    margin-bottom: auto;
  }
</style>

<script>
export default {
  name: 'pageHeader',
  data() {
    return {
      userName: null,
    }
  },
  mounted: function() {
      this.loadUserName();
  },
  methods: {
    loadUserName() {
      this.userName = window.localStorage.getItem('userName');
    }

  }
}
</script>