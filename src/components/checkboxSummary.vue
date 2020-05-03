<template>
  <div>
    <el-form-item>
      <el-checkbox v-model="response.checkbox">{{question.text}}</el-checkbox>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'checkboxView',
  props: ['question', 'response'],
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