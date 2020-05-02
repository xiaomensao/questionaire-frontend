<template>
  <div>
    <el-form-item v-for="(rc, index) in radioChoices" v-bind:key="index">
      <el-radio v-model="response.radio" v-bind:label="rc.id">{{rc.text}}</el-radio>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'radioView',
  props: ['radioChoices', 'response'],
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