<template>
    <div id="questionaireView">
        <h3>{{questionaire.title}}</h3>
        <el-form :model="questionaire" ref="questionaire">
            <el-card shadow="always" v-for="(quesArr, ind) in questionsWrapped" v-bind:key="ind"
            :name="ind + 1">
                <div slot="header">
                    {{(ind + 1) + ': ' + 
                    quesArr.find(q => q.type == 1 || q.type == 2 || q.type == 3).text}}
                </div>
                <div v-for="(question, index) in quesArr" v-bind:key="index">
                    <el-form-item v-if="question.type == 1">
                        <el-input v-model="responseItemsWrapped[ind][index].text"></el-input>
                    </el-form-item>
                    <radio-view v-if="question.type == 2"
                    v-bind:radioChoices="question.radioChoices"
                    :response="responseItemsWrapped[ind][index]">
                    </radio-view>
                    <checkbox-view v-if="question.type == 4"
                    v-bind:question="question"
                    :response="responseItemsWrapped[ind][index]">
                    </checkbox-view>
                </div>
            </el-card>
            <el-card shadow="always">
                <el-row>
                    <el-button type="primary" @click="submit">提交</el-button>
                </el-row>
            </el-card>
        </el-form>
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
        submitResponse } from '@/apis/questionaire';
import radioView from './radioView.vue';
import checkboxView from './checkboxView.vue';
export default {
    name: 'questionaireView',
    components: {
        radioView,
        checkboxView,
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
            responseItemsWrapped: [],
        }
    },

    mounted: function() {
        this.loadQuestionaire();
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
                            this.questionsWrapped.push([]);
                            this.responseItemsWrapped.push([]);
                        }
                        this.questionaire.questions.forEach(q => {
                            this.questionsWrapped[q.order - 1].push(q);
                            let responseItem = {
                                quesId: q.id,
                                text: null,
                                radio: null,
                                checkbox: null,
                            };
                            this.responseItemsWrapped[q.order - 1].push(responseItem);
                        });
                        console.log(this.questionsWrapped);
                    });
                });
            } 
        },
        submit() {
            let response = {
                questionaireId: this.questionaire.id,
                items: this.responseItemsWrappedToResponseItems(),
            };
            console.log(response);
            submitResponse(response).then((res) => {
                console.log('saved!');
                this.$notify({
                    title: '成功',
                    message: '问卷提交成功！',
                    type: 'success'
                });
            }).catch(error => {
                console.log(error.response);
                this.$notify.error({
                    title: '错误',
                    message: '问卷提交过程中有错误！'
                });
            });
        },
        responseItemsWrappedToResponseItems() {
            let responseItems = [];
            for (let rArr of this.responseItemsWrapped) {
                responseItems = responseItems.concat(rArr);
            }
            return responseItems;
        },
    },
    
}
</script>