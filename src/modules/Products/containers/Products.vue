<template>
  <v-container>
    <div class="charttool-wrap">
      <h1>{{ $t("products.title") }}</h1>
      <div class="chart-block">
        <h4>{{ $t("products.chart_title") }}</h4>
        <v-layout row wrap>
          <v-flex class="charts-wrap" d-flex xs12 sm12 md8>
            <Diagram :productsGraph="diagramData"/>
          </v-flex>
          <v-flex class="stats-chart-wrap" xs12 sm12 md4>
            <ul class="stats-list" v-if="chartStatistics">
              <li>
                <ProductsStats :chartsStatisticNumber="chartStatistics.all_time_charted" :chartsStatisticText='$t("products.stats_all")'/>
              </li>
              <li>
                <ProductsStats :chartsStatisticNumber="chartStatistics.currently_charted" :chartsStatisticText='$t("products.stats_current")'/>
              </li>
              <li>
                <ProductsStats :chartsStatisticNumber="chartStatistics.period_charted" :chartsStatisticText='$t("products.stats_30days")'/>
              </li>
            </ul>
          </v-flex>
        </v-layout>
      </div>
      <div class="wrap-chart-table">
        <h4>{{ $t("products.latest_charts_title") }}</h4>
        <div class="head-platform">{{ $t("products.platform_title") }}</div>
        <div class="sort-wrap">
          <PlatformFilter @changeShop="changeShop" :shopId="(filterChoose.shopId) ? filterChoose.shopId : 'all'" />
          <div class="search-btn-wrap text-xs-left">
            <Search @change="changeSearch" />
            <v-btn class="toggle-btn" @click="sortshow = !sortshow" outline color="#d4d4d4">
              <v-icon v-if="sortshow" class="icon">keyboard_arrow_up</v-icon>
              <v-icon v-else class="icon">keyboard_arrow_down</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="select-list" v-if="sortshow">
          <BaseSelect :listOptions="productType" @change="changeProductType">{{ $t("products.type_title") }}</BaseSelect>
          <div class="text-xs-left date-wrap">
            <label>{{ $t("products.release_date_title") }}</label>
            <DatePicker @change="changePicker"/>
          </div>
        </div>
        <ProductsList :productsList="productsList.usefulData" :perPage="20" :count="productsList.totalCount" :headers="headers"/>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { Mixins } from 'vue-mixin-decorator';

import Diagram from '@/shared/components/Diagram.vue';
import Common from '@/shared/common';
import ProductsStats from '../components/ProductsStats.vue';
import ProductsList from '@/shared/components/ProductsList.vue';
import PlatformFilter from '@/shared/components/PlatformFilter.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import DatePicker from '@/shared/components/DatePicker.vue';
import Search from '@/shared/components/Search.vue';

@Component({
  name: 'Products',
  components: {
    Diagram,
    ProductsStats,
    ProductsList,
    PlatformFilter,
    BaseSelect,
    DatePicker,
    Search,
  },
})
export default class Products extends Mixins<Common>(Common) {
  @State('chartStatistics') private chartStatistics: any;
  @State('productsList') private productsList: any;
  @State('diagramData') private diagramData: any;
  @Action('getDiagramData') private getDiagramData!: any;
  @Action('getChartStatistics') private getChartStatistics!: any;
  @Action('getProductsList') private getProductsList!: any;

  private sortshow: boolean = false;
  private filterChoose: any = this.getShopId();

  public created() {
    this.getDiagramData();
    this.getChartStatistics();
    this.getProductsList({
      shopId: this.filterChoose.shopId,
      date: this.createDate(),
    });
  }

  public data() {
    return {
      productType: [
        { value: 'all', name: this.$t('products.type_select.param1') },
        { value: 'track', name: this.$t('products.type_select.param2') },
        { value: 'product', name: this.$t('products.type_select.param3') },
      ],
      headers: [
        { text: this.$t('products.table.cover_title'), align: 'left', value: 'number', sortable: false },
        { text: this.$t('products.table.artist_title'), align: 'left', value: 'name', sortable: false },
        { text: this.$t('products.table.name_title'), align: 'left', value: 'name', sortable: false },
        { text: this.$t('products.table.type_title'), align: 'left', value: 'name', sortable: false },
        { text: this.$t('products.table.date_title'), align: 'left', value: 'date', sortable: false },
      ],
    };
  }

  private changeShop(val: string) {
    localStorage.setItem('shopId', val);
    this.filterChoose.shopId = val;

    this.getProductsList(this.filterChoose);
  }

  private changePage(val: any) {
    this.filterChoose.page = val;
    this.getProductsList(this.filterChoose);
  }

  private changeSearch(val: any) {
    this.filterChoose.search = val;
    this.getProductsList(this.filterChoose);
  }

  private changeProductType(val: any) {
    this.filterChoose.productType = val.value;
    this.getProductsList(this.filterChoose);
  }

  private changePicker(val: any) {
    this.filterChoose.date = val;
    this.getProductsList(this.filterChoose);
  }

  @Watch('diagramData')
  /* tslint:disable:no-empty */
  private initDiagram(): void {}
}
</script>

<style lang="scss">
  @import "~@/styles/basic/variables";

  .wrap-chart-table{
    background-color: #fff;
    border: solid 1px $color-card-grey;
    margin-top: 20px;
    padding: 30px;
  }

  .charts-wrap {
    max-height: 400px;
  }

  .chart-block{
    border: solid 1px $color-card-grey;
    background-color: $color-white;
    padding: 30px;
  }

  .charttool-wrap {
    width: 100%;
    .stats-chart-wrap {
      display: flex;
      flex-direction: column;
      padding-left: 30px;
      .stats-list {
        padding-left: 0;
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        justify-content: flex-start;
        li{
          width: 50%;
          padding: 0 15px;
          padding-bottom: 15px;
        }
      }
    }
  }
</style>
