<template>
    <div id="questionaireList">
        <h2>问卷</h2>
        <el-form :model="questionaire" ref="questionaire">
            <el-form-item label="问卷标题">
                <el-input placeholder="请输入问卷标题" v-model="questionaire.title"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getAllQuestionaire } from '@/apis/questionaire';

export default {
    name: 'questionaireList',
    components: {
    },

    data() {
        return {
            questionaire: {
                title: '',
            }, 
        }
    },

    mounted: function() {
        this.questionairesLoad();
    },

    methods: {
        questionairesLoad() {
            getAllQuestionaire().then((res) => {
                console.log(res);
                this.questionaireList = res.data;
            });
        },
        createNewQuestionaire() {
            this.$router.push("/home");
        }

    }
    
}
</script>