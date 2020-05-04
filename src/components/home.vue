<template>
    <div id="home">
        <h2>Home</h2>
        <line-chart v-bind:chart-data="datacollection"></line-chart>
    </div>
</template>

<script>
import LineChart from '../utils/LineChart.js';

export default {
    name: 'home',
    components: {
        LineChart,
    },

    data() {
        return {
            datacollection: {
              type: Object,
              default: null
            },
        }
    },
    mounted () {
      this.fillData();
    },

    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#F56C6C',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#F56C6C',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        };
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
      }
    }
    
}
</script>