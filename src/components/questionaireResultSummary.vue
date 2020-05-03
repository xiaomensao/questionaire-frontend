<template>
    <div id="questionaireResultSummary">
        <el-form>
            <el-card shadow="always" v-for="(quesArr, ind) in questionsWrapped" v-bind:key="ind"
                :name="ind + 1">
                <div slot="header">
                    {{(ind + 1) + ': ' + 
                    quesArr.find(q => q.type == 1 || q.type == 2 || q.type == 3).text}}
                </div>
                <div v-for="(question, index) in quesArr" v-bind:key="index">
                    <div v-if="question.type == 1">
                        <div v-for="(resItem, riInd) in responseItemsWrapped[ind][index]" v-bind:key="riInd">
                            <p>{{resItem.text}}</p>
                        </div>
                    </div>
                    <radio-summary v-if="question.type == 2"
                    v-bind:radioChoices="question.radioChoices"
                    :response="responseItemsWrapped[ind][index]">
                    </radio-summary>
                    <checkbox-summary v-if="question.type == 4"
                    v-bind:question="question"
                    :response="responseItemsWrapped[ind][index]">
                    </checkbox-summary>
                </div>
            </el-card>
        </el-form>
    </div>
</template>

<script>
import radioSummary from './radioSummary.vue';
import checkboxSummary from './checkboxSummary.vue';
export default {
    name: 'questionaireResultSummary',
    props: ['questionsWrapped', 'responseItemsWrapped'],
    components: {
        radioSummary,
        checkboxSummary
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