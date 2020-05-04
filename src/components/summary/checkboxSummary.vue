<template>
  <div>
    <p>{{question.text}}</p>
    <bar-chart v-bind:chart-data="datacollection" :options="options"></bar-chart>
  </div>
</template>

<script>
import BarChart from '../../utils/BarChart.js';
export default {
  name: 'checkboxView',
  props: ['question', 'response'],
  watch: { 
    question: function(newVal, oldVal) { // watch it
      console.log('question changed: ', newVal, ' | was: ', oldVal);
      this.fillChartData();
    },
    response: function(newVal, oldVal) { // watch it
      console.log('response changed: ', newVal, ' | was: ', oldVal);
      this.fillChartData();
    }
  },
  components: {
    BarChart
  },
  data() {
    return {
      datacollection: {
        type: Object,
        default: null
      },
      options: {
				scales: {
					yAxes: [{
						ticks: {
              beginAtZero: true,
              stepSize: 1
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: false
            },
            barPercentage: 0.2
					}]
				},
				legend: {
					display: false
				},
				tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
						label: function(tooltipItems, data) {
							return tooltipItems.yLabel;
						}
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				height: 100
      }
    }
  },
  mounted: function() {
  },
  methods: {
    fillChartData() {
      let labels = ['选', '不选'];
      let datasets = [{
        label: 'Data One',
        backgroundColor: '#F56C6C',
        data: [0, 0]
      }];
      for (let rt of this.response) {
        if (rt.checkbox) {
          datasets[0].data[0] += 1;
        } else {
          datasets[0].data[1] += 1;
        }
      }
      this.datacollection = {
        labels,
        datasets,
      };
    }
  }
}
</script>