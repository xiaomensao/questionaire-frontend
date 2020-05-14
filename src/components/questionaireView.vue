<template>
    <div id="questionaireView">
        <questionaire-view-component
        v-bind:questionaire="questionaire"
        :questionsWrapped="questionsWrapped"
        :responseItemsWrapped="responseItemsWrapped"
        :disabled="disabled"></questionaire-view-component>
        <el-card shadow="always" v-if="questionaire.id > 0 && questionaire.status == 2">
            <el-row>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-row>
        </el-card>
        <p v-if="questionaire.id < 0">
            <el-alert type="info" :closable="false">
                <div slot="title">
                    该问卷还未发布或者已经关闭。
                </div>
            </el-alert>
        </p>
    </div>
</template>

<script>
import { getQuestionaire, getQuestions,
        submitResponse } from '@/apis/questionaire';
import questionaireViewComponent from './questionaireViewComponent.vue';
export default {
    name: 'questionaireView',
    components: {
        questionaireViewComponent,
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
            disabled: false,
        }
    },

    mounted: function() {
        this.disabled = this.$route.query.disabled == 1;
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