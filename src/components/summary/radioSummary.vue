<template>
  <div>
    <div class="small">
        <bar-chart v-bind:chart-data="datacollection" :options="options"></bar-chart>
    </div>
  </div>
</template>

<script>
import BarChart from '../../utils/BarChart.js';
export default {
  name: 'radioView',
  props: ['radioChoices', 'response'],
  watch: { 
    radioChoices: function(newVal, oldVal) { // watch it
      console.log('radioChoices changed: ', newVal, ' | was: ', oldVal);
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
    this.fillChartData();
  },
  methods: {
    fillChartData() {
      let labels = [];
      let datasets = [{
        label: 'Data One',
        backgroundColor: '#F56C6C',
        data: []
      }];
      for (let rc of this.radioChoices) {
        labels.push(rc.text);
        datasets[0].data.push(0);
      }
      for (let rt of this.response) {
        const ind = this.radioChoices.findIndex(r => r.id == rt.radio);
        if (ind >= 0) {
          datasets[0].data[ind] += 1;
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