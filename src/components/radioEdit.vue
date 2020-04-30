<template>
  <div>
    <h4>单选选项</h4>
    <el-form-item>
        <el-button type="primary" @click="createNewRadio">创建一个新选项</el-button>
    </el-form-item>
    <el-form-item v-for="(rc, index) in radioChoices" v-bind:key="index">
        <el-input placeholder="请输入选项" v-model="rc.text"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'radioEdit',
  props: ['radioChoices'],
  data() {
    return {
    }
  },
  mounted: function() {
  },
  methods: {
    createNewRadio() {
        let radio = {
            id: -1,
            text: '',
        };
        this.radioChoices.push(radio);
    },
  }
}
</script>