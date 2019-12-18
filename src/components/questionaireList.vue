<template>
    <div id="questionaireList">
        <h2>问卷列表</h2>
        <el-button type="primary" @click="createNewQuestionaire">添加新的问卷</el-button>
        <p v-if="questionaireList.length == 0">目前没有问卷</p>
        <ul id="example-1">
            <li v-for="questionaire in questionaireList" v-bind:key="questionaire">
                {{ questionaire }}
            </li>
        </ul>
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
            questionaireList: [],  
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
            this.$router.push("/questionaire");
        }

    }
    
}
</script>