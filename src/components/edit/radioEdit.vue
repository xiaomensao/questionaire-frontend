<template>
  <div>
    <h4>单选选项</h4>
    <el-form-item>
      <el-button type="primary" @click="createNewRadio">创建一个新选项</el-button>
    </el-form-item>
    <el-row v-for="(rc, index) in radioChoices" v-bind:key="index">
      <el-col :xs="24" :md="12">
        <el-form-item 
        :rules="fieldRequiredRule(rc.text, '此项不能为空')"
        :prop="'radio_question_' + index">
          <el-input placeholder="请输入选项" v-model="rc.text"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="12">
        <el-button type="danger" icon="el-icon-close" @click="removeRadio(index)"></el-button>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import { fieldRequiredRule } from '../../utils/formValidation.js';
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
    fieldRequiredRule,
    createNewRadio() {
        let radio = {
            id: -1,
            text: '',
        };
        this.radioChoices.push(radio);
    },
    removeRadio(index) {
      if (confirm('你确定要删除该选项吗？')) {
        this.radioChoices.splice(index, 1);
      }
    }
  }
}
</script>