<template>
    <div id="pageHeader">
      <el-row :gutter="10" id="header-row">
        <el-col :xs="24" :md="12" id="title-col">
          <h1>调查问卷</h1>
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
</style>

<script>
export default {
  name: 'pageHeaderNotLogin',
  data() {
    return {
    }
  },
  mounted: function() {
  },
  methods: {

  }
}
</script>