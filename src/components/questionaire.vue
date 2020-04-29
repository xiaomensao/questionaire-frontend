<template>
    <div id="questionaireList">
        <h2>问卷</h2>
        <el-form :model="questionaire" ref="questionaire">
            <el-form-item label="问卷标题">
                <el-input placeholder="请输入问卷标题" v-model="questionaire.title"></el-input>
            </el-form-item>
            <el-form-item label="问卷状态">
                <el-select v-model="questionaire.status" placeholder="请选择问卷状态">
                    <el-option v-for="status in questionaireStatus" v-bind:key="status.id"
                    :label="status.name" :value="status.id"></el-option>
                </el-select>
            </el-form-item>
            <div v-for="(question, index) in questionaire.questions" v-bind:key="index">
                <h3>{{'题目' + (index + 1)}}</h3>
                <el-form-item label="题目类型">
                    <el-select v-model="question.type" placeholder="题目类型">
                        <el-option v-for="type in questionType" v-bind:key="type.id"
                        :label="type.name" :value="type.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入题目" v-model="question.text"></el-input>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="createNewQuestion">创建一个新问题</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitQuestionaire">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getAllQuestionaireStatus, getAllQuestionType, 
        saveQuestionaire, getQuestionaire, getQuestions } from '@/apis/questionaire';
export default {
    name: 'questionaire',
    components: {
    },

    data() {
        return {
            questionaire: {
                title: '',
                id: -1,
                status: 1,
                questions: [],
            }, 
            questionaireStatus: [],
            questionType: [],
        }
    },

    mounted: function() {
        this.loadQuestionaire();
        this.loadStatusType();
    },

    methods: {
        loadQuestionaire() {
            if (this.$route.params.id > 0) {
                getQuestionaire(this.$route.params.id).then((res) => {
                    Object.assign(this.questionaire, res.data);
                    console.log(this.questionaire);
                    getQuestions(this.$route.params.id).then((res2) => {
                        this.$set(this.questionaire, 'questions', res2.data);
                        console.log(this.questionaire);
                    });
                });
            } 
        },
        loadStatusType() {
            getAllQuestionaireStatus().then((res) => {
                this.questionaireStatus = res.data;
                console.log(this.questionaireStatus);
            });
            getAllQuestionType().then((res) => {
                this.questionType = res.data;
            });
        },
        createNewQuestion() {
            let question = {
                id: -1,
                type: 1,
                text: '',
            };
            this.questionaire.questions.push(question);
        },
        submitQuestionaire() {
            saveQuestionaire(this.questionaire).then((res) => {
                console.log('saved!');
            }).catch(error => {
                console.log(error.response);
            });
        }

    }
    
}
</script>