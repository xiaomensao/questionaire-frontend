<template>
    <div id="questionaireResultSingle">
        <h3>个别</h3>
        <div class="block">
            <el-pagination
            :page-size="1"
            :current-page.sync="currentPage"
            layout="total, prev, pager, next, jumper"
            v-bind:total="responses.length">
            </el-pagination>
        </div>
        <div v-if="responseItemsWrappeds.length == 0">
            <p>
                <el-alert type="info" :closable="false">
                    <div slot="title">
                        暂时没有回复
                    </div>
                </el-alert>
            </p>
        </div>
        <questionaire-view-component
        v-if="responseItemsWrappeds.length > 0"
        v-bind:questionaire="questionaire"
        :questionsWrapped="questionsWrapped"
        :responseItemsWrapped="responseItemsWrappeds[currentPage - 1]"
        :disabled="true"></questionaire-view-component>
    </div>
</template>

<script>
import radioView from './view/radioView.vue';
import checkboxView from './view/checkboxView.vue';
import questionaireViewComponent from './questionaireViewComponent.vue';
export default {
    name: 'questionaireResultSingle',
    props: ['questionaire', 'questionsWrapped', 'responses'],
    watch: { 
        questionsWrapped: function(newVal, oldVal) { // watch it
            console.log('questionsWrapped changed: ', newVal, ' | was: ', oldVal);
            this.wrapResponseItems();
        },
        responses: function(newVal, oldVal) { // watch it
            console.log('responses changed: ', newVal, ' | was: ', oldVal);
            this.wrapResponseItems();
        }
    },
    components: {
        questionaireViewComponent,
    },

    data() {
        return {
            currentPage: 1,
            responseItemsWrappeds: [],
        }
    },

    mounted: function() {
        console.log('responses', this.responses);
        this.wrapResponseItems();
    },

    methods: {
        wrapResponseItems() {
            for (let response of this.responses) {
                let itemsWrapped = this.createItemsWrapped();
                for (let item of response.items) {
                    const quesArr = this.questionsWrapped[item.order - 1];
                    const quesIndex = quesArr.findIndex(q => q.id == item.question);
                    if (quesIndex >= 0) {
                        itemsWrapped[item.order - 1][quesIndex] = item;
                    }
                }
                this.responseItemsWrappeds.push(itemsWrapped);
            }
            console.log('responseItemsWrappeds', this.responseItemsWrappeds);
        },
        createItemsWrapped() {
            const itemsWrapped = [];
            for (let qArrInd in this.questionsWrapped) {
                itemsWrapped.push([]);
                for (let qInd in this.questionsWrapped[qArrInd]) {
                    itemsWrapped[qArrInd].push(null);
                }
            }
            return itemsWrapped;
        },
    },
    
}
</script>