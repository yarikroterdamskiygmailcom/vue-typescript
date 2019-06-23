<template>
  <v-container>
    <div style="display:flex; flex-direction:column; width: max-content; text-align:left;">
      <h2>Headings</h2>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
    </div>

    <div style="display:flex; flex-direction:column; width: max-content; text-align:left;">
      <h2>Buttons</h2>
      <BtnPrev routeTo="#">Regular</BtnPrev>
      <BtnGreen routeTo="#">Regular</BtnGreen>
      <BtnPrimary routeTo="#">Regular</BtnPrimary>
    </div>

    <div style="display:flex; flex-direction:column; width: max-content; text-align:left;">
      <h2>Selects</h2>
      <BaseSelect :listOptions="productType">Select name</BaseSelect>
      <DatePicker />
    </div>

    <div style="display:flex; flex-direction:column; width: auto; text-align:left;">
      <h2>Chart</h2>
      <ProductChart :productsGraph="diagramData"/>
    </div>

    <div style="text-align:left;">
      <h2>Table</h2>
      <v-data-table
        :headers="headers"
        :items="productsList"
        :pagination.sync="pagination"
        :rows-per-page-items="[5,10,20]"
        class="song-table"
      >
        <template slot="items" slot-scope="props">
          <td>
            <div class="track-rate">
              {{ props.item.positionChange }}
            </div>
          </td>
          <td class="text-xs-left">{{props.item.date}}</td>
          <td class="text-xs-left">
            <div class="track-artist">
              {{ props.item.produRegularrtist }}
            </div>
          </td>
          <td class="text-xs-left">{{props.item.productTitle}}</td>
          <td class="text-xs-left">{{props.item.listType}}</td>
          <td class="text-xs-left">{{props.item.date}}</td>
        </template>
        <template slot="pageText" slot-scope="props">
          Showing {{ props.pageStart }} to {{ props.pageStop }} og {{ props.itemsLength }} entries
        </template>
      </v-data-table>
    </div>

    <div style="display:flex; flex-direction:column; width: auto; text-align:left; margin-top: 15px">
      <h2 style="margin-bottom: 30px">Colors</h2>
      <div class="color-list">
        <div class="item">
          <div class="round primary-new"></div>
          <p>primary</p>
        </div>
        <div class="item">
          <div class="round accent-new"></div>
          <p>accent</p>
        </div>
        <div class="item">
          <div class="round warning-new"></div>
          <p>warning</p>
        </div>
        <div class="item">
          <div class="round error-new"></div>
          <p>error</p>
        </div>
        <div class="item">
          <div class="round dark-new"></div>
          <p>dark</p>
        </div>
        <div class="item">
          <div class="round primary-grey-new"></div>
          <p>primary-grey</p>
        </div>
        <div class="item">
          <div class="round secondary-grey-new"></div>
          <p>secondary-grey</p>
        </div>
        <div class="item">
          <div class="round card-grey-new"></div>
          <p>card-grey</p>
        </div>
        <div class="item">
          <div class="round disabled-new"></div>
          <p>disabled</p>
        </div>
        <div class="item">
          <div class="round background-new"></div>
          <p>background</p>
        </div>
        <div class="item">
          <div class="round white-new"></div>
          <p>white</p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import BtnPrev from '@/shared/components/BtnPrev.vue';
import BtnGreen from '@/shared/components/BtnGreen.vue';
import BtnPrimary from '@/shared/components/BtnPrimary.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import DatePicker from '@/shared/components/DatePicker.vue';
import Modal from '@/shared/components/Modal.vue';
import ProductChart from '@/shared/components/Diagram.vue';

@Component({
  name: 'Product',
  components: {
    BtnPrev,
    BtnGreen,
    BtnPrimary,
    BaseSelect,
    DatePicker,
    Modal,
    ProductChart,
  },
})
export default class UIelements extends Vue {
  @State('diagramData') private diagramData: any;
  @Action('getDiagramData') private getDiagramData: any;

  private openModal: boolean = false;

  public data() {
    return {
      productType: [
        { value: 'first', name: 'first' },
        { value: 'second', name: 'second' },
      ],
      pagination: {
        rowsPerPage: 20,
      },
      headers: [
        { text: '#', align: 'center', value: 'number' },
        { text: 'Month', align: 'left', value: 'number', sortable: false },
        { text: 'Artist', align: 'left', value: 'name', sortable: false },
        { text: 'Title', align: 'left', value: 'name', sortable: false },
        { text: 'Type', align: 'left', value: 'name', sortable: false },
        { text: 'Release date', align: 'left', value: 'date' },
      ],
      productsList: [
        {
          positionChange: 1,
          date: '17.09.2018',
          productArtist: 'VBob',
          productTitle: 'Rob',
          listType: 'album',
          release: '17.09.2018',
        },
        {
          positionChange: 1,
          date: '17.09.2018',
          productArtist: 'VBob',
          productTitle: 'Rob',
          listType: 'album',
          release: '17.09.2018',
        },
      ],
    };
  }

  public created() {
    this.getDiagramData();
  }

  @Watch('diagramData')
  private initDiagram(): void {
    const ctx = document.getElementById('myChart');
    // @ts-ignore
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        borderJoinStyle: 'bevel',
        labels: this.diagramData.chart_dates_list,
        datasets: [
          {
            label: this.diagramData.chart_data['5'].label,
            data: this.diagramData.chart_data['5'].data,
            backgroundColor: ['rgb(199, 235, 101, 0.3)'],
            borderColor: ['rgb(199, 235, 101, 1)'],
            borderWidth: 1,
          },
          {
            label: this.diagramData.chart_data['9'].label,
            data: this.diagramData.chart_data['9'].data,
            backgroundColor: ['rgba(98, 175, 228, 0.3)'],
            borderColor: ['rgba(98, 175, 228, 1)'],
            borderWidth: 1,
          },
          {
            label: this.diagramData.chart_data['359'].label,
            data: this.diagramData.chart_data['359'].data,
            backgroundColor: ['rgba(220, 167, 255, 0.3)'],
            borderColor: ['rgba(220, 167, 255, 1)'],
            borderWidth: 1,
          },
          {
            label: this.diagramData.chart_data['2'].label,
            data: this.diagramData.chart_data['2'].data,
            backgroundColor: ['rgba(255, 182, 110, 0.3)'],
            borderColor: ['rgba(255, 182, 110, 1)'],
            borderWidth: 1,
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
      },
    });

    document.getElementById('chartjsLegend').innerHTML = myChart.generateLegend();
  }
}
</script>

<style lang="scss">
@import "~@/styles/index";

h2{
  margin: 20px 0;
}
.song-table {
  margin-top: 30px;
  border: 1px solid $color-card-grey;
  border-radius: 4px;
  table.v-table {
    thead {
      background-color: $color-primary;
      color: $color-white;
      tr {
        height: 30px;
        th {
          font-size: 12px;
        }
      }
    }
    tbody {
      background-color: $color-white;
      tr {
        border-bottom: 1px solid $color-card-grey;
        td {
          height: 43px;
          font-size: 12px;
          .track-cover,
          .track-artist {
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .v-datatable__actions__select {
    display: none;
  }
}
.color-list{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  .item{
    width: 20%;
    text-align: center;
    margin-bottom: 20px;
    .round{
      margin: 0 auto;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .primary-new{
      background-color: $color-primary;
    }
    .accent-new{
      background-color: $color-accent;
    }
    .warning-new{
      background-color: $color-warning;
    }
    .error-new{
      background-color: $color-error;
    }
    .dark-new{
      background-color: $color-dark;
    }
    .primary-grey-new{
      background-color: $color-primary-grey;
    }
    .secondary-grey-new{
      background-color: $color-secondary-grey;
    }
    .card-grey-new{
      background-color: $color-card-grey;
    }
    .disabled-new{
      background-color: $color-disabled;
    }
    .background-new{
      background-color: $color-background;
      border: 1px solid #8f8f8f;
    }
    .white-new{
      background-color: $color-white;
      border: 1px solid #8f8f8f;
    }
  }
}
</style>
