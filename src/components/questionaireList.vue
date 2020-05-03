<template>
    <div id="questionaireList">
        <h2>问卷列表</h2>
        <el-button type="primary" @click="createNewQuestionaire">添加新的问卷</el-button>
        <br/>
        <p v-if="questionaireList.length == 0">目前没有问卷</p>
        <br/>
        <el-table :data="questionaireList" strip border style="width: 100%">
            <el-table-column fixed prop="title" label="标题"></el-table-column>
            <el-table-column prop="created" label="创建日期"></el-table-column>
            <el-table-column prop="statusName" label="状态"></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="viewQuestionaire(scope.row)" type="text" size="small">预览</el-button>
                    <el-button @click="editQuestionaire(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="viewQuestionaireResult(scope.row)" type="text" size="small">回复</el-button>
                </template>
            </el-table-column>
        </el-table>
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
            this.$router.push("/admin/questionaire/-1");
        },
        editQuestionaire(row) {
            this.$router.push("/admin/questionaire/" + row.id);
        },
        viewQuestionaire(row) {
            let viewRoute = this.$router.resolve("/questionaireView/" + row.id);
            window.open(viewRoute.href, '_blank');
        },
        viewQuestionaireResult(row) {
            this.$router.push("/admin/questionaireResult/" + row.id);
        }

    }
    
}
</script>