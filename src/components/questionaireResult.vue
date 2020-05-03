<template>
    <div id="questionaireResult">
        <h3>{{questionaire.title}}</h3>
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-s-data"></i> 摘要</span>
                <questionaire-result-summary
                v-bind:questionsWrapped="questionsWrapped"
                :responseItemsWrapped="responseItemsWrapped"></questionaire-result-summary>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><i class="el-icon-tickets"></i> 个别</span>
                <questionaire-result-single></questionaire-result-single>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { getAllQuestionaireStatus, getAllQuestionType,
        getQuestionaire, getQuestions,
        getResponses } from '@/apis/questionaire';
import questionaireResultSummary from './questionaireResultSummary.vue';
import questionaireResultSingle from './questionaireResultSingle.vue';
export default {
    name: 'questionaireResult',
    components: {
        questionaireResultSummary,
        questionaireResultSingle
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
            responses: [],
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
                        for (let q of this.questionaire.questions) {
                            this.questionsWrapped[q.order - 1].push(q);
                            this.responseItemsWrapped[q.order - 1].push([]);
                        }
                        console.log(this.questionsWrapped);
                        getResponses(this.$route.params.id).then((res3) => {
                            Object.assign(this.responses, res3.data);
                            console.log(this.responses);
                            for (let r of this.responses) {
                                for (let i of r.items) {
                                    const quesArr = this.questionsWrapped[i.order - 1];
                                    const quesIndex = quesArr.findIndex(q => q.id == i.question);
                                    if (quesIndex >= 0) {
                                        this.responseItemsWrapped[i.order - 1][quesIndex].push(i);
                                    }
                                }
                            }
                            console.log(this.responseItemsWrapped);
                        });
                    });
                });
            } 
        },
    },
    
}
</script>