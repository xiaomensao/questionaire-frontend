<template>
  <div>
    <el-form-item>
      <el-input placeholder="请输入选项" v-model="question.text"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'checkboxEdit',
  props: ['question'],
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