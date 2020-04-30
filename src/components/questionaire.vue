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
            <el-collapse v-model="activeNames">
                <el-collapse-item v-for="(quesArr, order) in questionsWrapped" v-bind:key="order"
                    :title="'题目' + (order + 1)" :name="order + 1">
                    <div v-for="(question, index) in quesArr" v-bind:key="index">
                        <el-form-item label="题目类型" v-if="question.type <= 3">
                            <el-select v-model="question.type" placeholder="题目类型">
                                <el-option v-for="type in parentQuestionType" v-bind:key="type.id"
                                :label="type.name" :value="type.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="question.type <= 3">
                            <el-input placeholder="请输入题目" v-model="question.text"></el-input>
                        </el-form-item>
                        <radio-edit v-if="question.type == 2" v-bind:radioChoices="question.radioChoices">
                        </radio-edit>
                        <h4 v-if="question.type == 3">多选选项</h4>
                        <el-form-item v-if="question.type <= 3">
                            <el-button v-if="question.type == 3" type="primary" 
                            @click="createNewCheckbox(quesArr)">创建一个新选项</el-button>
                        </el-form-item>
                        <checkbox-edit v-if="question.type == 4" v-bind:question="question"></checkbox-edit>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <br/>
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
import radioEdit from './radioEdit.vue';
import checkboxEdit from './checkboxEdit.vue';
export default {
    name: 'questionaire',
    components: {
        radioEdit,
        checkboxEdit,
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
            parentQuestionType: [],
            maxOrder: 0,
            questionsWrapped: [],
            activeNames: [],
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
                        const quesArrLength = this.questionaire.questions.length;
                        if (quesArrLength > 0) {
                            this.maxOrder = this.questionaire.questions[quesArrLength - 1].order;
                            console.log(this.maxOrder);
                        }
                        for (let i = 0; i < this.maxOrder; i++) {
                            this.activeNames.push(i + 1);
                            this.questionsWrapped.push([]);
                        }
                        this.questionaire.questions.forEach(q => {
                            this.questionsWrapped[q.order - 1].push(q);
                        });
                        console.log(this.questionsWrapped);
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
                console.log(this.questionType);
                this.parentQuestionType = this.questionType.filter(q => q.parent == 0);
                console.log(this.parentQuestionType);
            });
        },
        createNewQuestion() {
            let question = {
                id: -1,
                type: 1,
                text: '',
                radioChoices: [],
                order: this.maxOrder + 1,
            };
            this.questionsWrapped.push([question]);
            this.questionaire.questions.push(question);
            this.activeNames.push(this.maxOrder + 1);
            this.maxOrder += 1;
        },
        createNewCheckbox(quesArr) {
            let order = 1;
            if (quesArr.length > 0) {
                order = quesArr[0].order;
            }
            let question = {
                id: -1,
                type: 4,
                text: '',
                radioChoices: [],
                order,
            };
            quesArr.push(question);
            this.questionaire.questions.push(question);
            console.log(this.questionaire);
            console.log(this.questionsWrapped);
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