<template>
  <div>
    <el-form-item
    :rules="fieldRequiredRule(question.text, '此项不能为空')"
    :prop="'checkbox_question'">
      <el-input placeholder="请输入选项" v-model="question.text"></el-input>
    </el-form-item>
  </div>
</template>

<script>
import { fieldRequiredRule } from '../../utils/formValidation.js';
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
    fieldRequiredRule
  }
}
</script>