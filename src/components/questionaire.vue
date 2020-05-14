<template>
    <div id="questionaireEdit">
        <el-steps v-bind:active="questionaire.status-1" finish-status="success" simple>
            <el-step v-for="status in questionaireStatus" v-bind:key="status.id" 
                :title="status.name"></el-step>
        </el-steps>
        <el-form :model="questionaire" ref="questionaire" :disabled="this.questionaire.status != 1">
            <el-card shadow="always">
                <div slot="header">
                    <h3>问卷信息</h3>
                </div>
                <el-form-item label="标题"
                :rules="fieldRequiredRule(questionaire.title, '此项不能为空')"
                :prop="'title'"
                class="is-required">
                    <el-input placeholder="请输入问卷标题" v-model="questionaire.title"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" :rows="2"
                    placeholder="请输入问卷简介" v-model="questionaire.description"></el-input>
                </el-form-item>
                <!-- <el-form-item label="问卷状态">
                    <el-select v-model="questionaire.status" placeholder="请选择问卷状态">
                        <el-option v-for="status in questionaireStatus" v-bind:key="status.id"
                        :label="status.name" :value="status.id"></el-option>
                    </el-select>
                </el-form-item> -->
            </el-card>
            <el-card shadow="always">
                <div slot="header">
                    <h3>问卷问题</h3>
                </div>
                <el-collapse>
                    <el-collapse-item v-for="(quesArr, ind) in questionsWrapped" v-bind:key="ind"
                    :name="ind + 1">
                        <template slot="title">
                            <div class="collapse-title-wrapper">
                                <div class="collapse-title">
                                    {{'题目' + (ind + 1) + ': ' + 
                                    quesArr.find(q => [1, 2, 3].includes(q.type)).text}}
                                </div>
                                <div class="collapse-action">
                                    <el-button @click="deleteQuestion(ind)" type="text" size="small">删除</el-button>
                                </div>
                            </div>
                        </template>
                        <div v-for="(question, index) in quesArr" v-bind:key="index">
                            <el-form-item label="题目类型" v-if="question.type <= 3">
                                <el-select v-model="question.type" placeholder="题目类型"
                                @change="onSelectedTypeChange($event, ind)">
                                    <el-option v-for="type in parentQuestionType" v-bind:key="type.id"
                                    :label="type.name" :value="type.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="question.type <= 3"
                            :rules="fieldRequiredRule(question.text, '此项不能为空')"
                            :prop="'question_text_prop_' + ind + '_' + index">
                                <el-input placeholder="请输入题目" v-model="question.text"></el-input>
                            </el-form-item>
                            <radio-edit v-if="question.type == 2" v-bind:radioChoices="question.radioChoices">
                            </radio-edit>
                            <h4 v-if="question.type == 3">多选选项</h4>
                            <el-form-item v-if="question.type == 3">
                                <el-button v-if="question.type == 3" type="primary" 
                                @click="createNewCheckbox(quesArr)">创建一个新选项</el-button>
                            </el-form-item>
                            <el-row v-if="question.type == 4">
                                <el-col :xs="24" :md="12">
                                    <checkbox-edit v-bind:question="question">
                                    </checkbox-edit>
                                </el-col>
                                <el-col :xs="24" :md="12">
                                    <el-button type="danger" icon="el-icon-close" @click="removeCheckbox(quesArr, index)"></el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="createNewQuestion">创建一个新问题</el-button>
                </el-form-item>
            </el-card>
        </el-form>
        <el-card shadow="always">
            <el-row>
                <el-button type="primary" @click="submitQuestionaire(false)"
                v-if="this.questionaire.status == 1">保存</el-button>
                <el-button type="primary" @click="goToView"
                v-if="this.$route.params.id > 0">预览</el-button>
                <el-button type="primary" @click="submitQuestionaire(true)"
                v-if="this.$route.params.id > 0 && this.questionaire.status == 1">
                保存并发布</el-button>
                <el-button type="primary" @click="updateQuestionaireStatus(3)"
                v-if="this.$route.params.id > 0 && this.questionaire.status == 2">
                关闭</el-button>
            </el-row>
        </el-card>
    </div>
</template>

<style scoped>
    .collapse-title-wrapper {
        display: flex;
        width: 100%;
    }
    .collapse-title {
        display: flex;
    }

    .collapse-action {
        display: flex;
        margin-left: auto;
    }
</style>

<script>
import { getAllQuestionaireStatus, getAllQuestionType, 
        saveQuestionaire, getQuestionaire, getQuestions,
        updateQuestionaire } from '@/apis/questionaire';
import radioEdit from './edit/radioEdit.vue';
import checkboxEdit from './edit/checkboxEdit.vue';
import { fieldRequiredRule } from '../utils/formValidation.js';
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
                description: '',
                id: -1,
                status: 1,
                questions: [],
            }, 
            questionaireStatus: [],
            questionType: [],
            parentQuestionType: [],
            maxOrder: 0,
            questionsWrapped: [],
        }
    },

    mounted: function() {
        this.loadQuestionaire();
        this.loadStatusType();
    },

    methods: {
        fieldRequiredRule,
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
            this.maxOrder += 1;
            let question = {
                id: -1,
                type: 1,
                text: '',
                radioChoices: [],
                order: this.maxOrder,
            };
            this.questionsWrapped.push([question]);
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
        },
        submitQuestionaire(ifSend) {
            this.$refs['questionaire'].validate((valid) => {
                if (valid) {
                    let action = '保存';
                    if (ifSend) {
                        this.questionaire.status = 2;
                        action += '并发布';
                    }
                    this.questionaire.questions = this.questionsWrappedToQuestions();
                    console.log(this.questionaire);
                    saveQuestionaire(this.questionaire).then((res) => {
                        console.log('saved!');
                        this.$notify({
                            title: '成功',
                            message: '问卷' + action + '成功！',
                            type: 'success'
                        });
                    }).catch(error => {
                        console.log(error.response);
                        this.$notify.error({
                            title: '错误',
                            message: '问卷' + action + '过程中有错误！'
                        });
                    });
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '有内容未填写！'
                    });
                    return false;
                }
            }); 
        },
        onSelectedTypeChange($event, index) {
            let newType = parseInt($event);
            const quesArr = this.questionsWrapped[index];
            if (newType != 3) {
                // clear all checkbox questions in quesArr
                this.$set(this.questionsWrapped, index, quesArr.filter(q => q.type != 4));
            }
            if (newType != 2) {
                quesArr.forEach(q => {
                    q.radioChoices = [];
                });
            }
            console.log(this.questionsWrapped);
        },
        questionsWrappedToQuestions() {
            let questions = [];
            for (let qw of this.questionsWrapped) {
                questions = questions.concat(qw);
            }
            return questions;
        },
        deleteQuestion(index) {
            if (confirm('你确定要删除此题吗？')) {
                this.questionsWrapped.splice(index, 1);
                this.maxOrder -= 1;
                this.rearrangeOrder();
            }
            
        },
        rearrangeOrder() {
            this.questionsWrapped.forEach((quesArr, index) => {
                quesArr.forEach(q => {
                    q.order = index + 1;
                });
            });
        },
        goToView() {
            let viewRoute = this.$router.resolve("/questionaireView/" + this.$route.params.id);
            window.open(viewRoute.href, '_blank');
        },
        updateQuestionaireStatus(statusId) {
            let item = {
                status: statusId
            };
            updateQuestionaire(this.questionaire.id, item).then((res) => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
        },
        removeCheckbox(quesArr, index) {
            if (confirm('你确定要删除该选项吗？')) {
                quesArr.splice(index, 1);
            }
        }
    },
    
}
</script>