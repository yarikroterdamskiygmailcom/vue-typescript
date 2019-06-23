<template>
  <div class="chart-wrap">
    <div id='chartjsLegend' class='chartjsLegend'></div>
    <canvas id="myChart" width="80vh" height="20vh"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
// @ts-ignore
import Chart from 'chart.js';

@Component({
  name: 'ProductChart',
})
export default class ProductChart extends Vue {
  @Prop({ default: null }) private productsGraph: any;

  @Watch('productsGraph')
  public initDiagram(): void {
    const ctx = document.getElementById('myChart');
    // @ts-ignore
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        borderJoinStyle: 'bevel',
        labels: this.productsGraph.chart_dates_list,
        datasets: [
          {
            label: this.productsGraph.chart_data['5'].label,
            data: this.productsGraph.chart_data['5'].data,
            backgroundColor: ['rgba(199, 235, 101, 0.3)'],
            borderColor: ['rgba(199, 235, 101, 1)'],
            borderWidth: 1,
            pointHoverBackgroundColor: 'rgba(199, 235, 101, 0.3)',
            pointHoverBorderColor: 'rgba(199, 235, 101, 1)',
          },
          {
            label: this.productsGraph.chart_data['9'].label,
            data: this.productsGraph.chart_data['9'].data,
            backgroundColor: ['rgba(98, 175, 228, 0.3)'],
            borderColor: ['rgba(98, 175, 228, 1)'],
            borderWidth: 1,
            pointHoverBackgroundColor: 'rgba(98, 175, 228, 0.3)',
            pointHoverBorderColor: 'rgba(98, 175, 228, 1)',
          },
          {
            label: this.productsGraph.chart_data['359'].label,
            data: this.productsGraph.chart_data['359'].data,
            backgroundColor: ['rgba(220, 167, 255, 0.3)'],
            borderColor: ['rgba(220, 167, 255, 1)'],
            borderWidth: 1,
            pointHoverBackgroundColor: 'rgba(220, 167, 255, 0.3)',
            pointHoverBorderColor: 'rgba(220, 167, 255, 1)',
          },
          {
            label: this.productsGraph.chart_data['2'].label,
            data: this.productsGraph.chart_data['2'].data,
            backgroundColor: ['rgba(255, 182, 110, 0.3)'],
            borderColor: ['rgba(255, 182, 110, 1)'],
            borderWidth: 1,
            pointHoverBackgroundColor: 'rgba(255, 182, 110, 0.3)',
            pointHoverBorderColor: 'rgba(255, 182, 110, 1)',
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        elements: {
          line: {},
          point: {
            radius: 0,
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          mode: 'x-axis',
          intersect: false,
          backgroundColor: 'rgba(72, 84, 101, 0.9)',
        },
        hover: {
          mode: 'x-axis',
          intersect: true,
        },
      },
    });

    document.getElementById('chartjsLegend').innerHTML = myChart.generateLegend();
  }
}
</script>

<style lang="scss">
@import "~@/styles/basic/variables";

.chart-wrap {
  width: 100%;
  height: auto;
  h4 {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: $color-primary;
    text-align: left;
    margin-bottom: 30px;
  }
  img {
    width: 100%;
  }
  .chartjsLegend ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
  }
  .chartjsLegend ul li {
    margin-right: 15px;
  }
  .chartjsLegend li span {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    border-radius: 25px;
  }
}
</style>
