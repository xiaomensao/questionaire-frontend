<template>
    <div id="questionaireViewComponent">
        <h3>{{questionaire.title}}</h3>
        <el-form :model="questionaire" ref="questionaire" v-bind:disabled="disabled">
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
        </el-form>
    </div>
</template>

<script>
import { getQuestionaire, getQuestions,
        submitResponse } from '@/apis/questionaire';
import radioView from './view/radioView.vue';
import checkboxView from './view/checkboxView.vue';
export default {
    name: 'questionaireViewComponent',
    props: ['questionaire', 'questionsWrapped', 'responseItemsWrapped', 'disabled'],
    components: {
        radioView,
        checkboxView,
    },
    data() {
        return {
        }
    },

    mounted: function() {
    },

    methods: {
    },
    
}
</script>