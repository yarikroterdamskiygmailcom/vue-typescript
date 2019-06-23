<template>
  <v-container class="admin-pages">
    <div class="head-platform">{{ $t("products.platform_title") }}</div>
    <div class="sort-wrap">
      <PlatformFilter class="mt-1" @changeShop="changeShop" :shopId="(filterChoose.shopId) ? filterChoose.shopId : 'all'" />
      <div class="search-btn-wrap text-xs-left">
        <SimpleSearch @SearchProd="SearchProd" :placeholder="$t('products.search')"/>
      </div>
    </div>  
    <ProductsList class="admin-list" :perPage="100" :productsList="chartHit.usefulData" :count="chartHit.totalCount" :headers="headers"/>  
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { Mixins } from 'vue-mixin-decorator';

import Common from '@/shared/common';
import SimpleSearch from '@/shared/components/SimpleSearch.vue';
import PlatformFilter from '@/shared/components/PlatformFilter.vue';
import ProductsList from '@/shared/components/ProductsList.vue';

@Component({
  name: 'ChartHit',
  components: {
    SimpleSearch,
    PlatformFilter,
    ProductsList,
  },
})
export default class ChartHit extends Mixins<Common>(Common) {
  @State('chartHit') public chartHit: any;
  @Action('getChartHit') public getChartHit: any;
  @Action('clearChartHits') public clearChartHits: any;

  private filterChoose: any = {
    ...this.getShopId(),
    limit: 100,
  };
  private searchFieldValue: string = '';

  public created() {
    this.getChartHit(this.filterChoose);
  }

  public data() {
    return {
      headers: [
        { text: this.$t('products.table.cover_title'), align: 'left', value: 'number', sortable: false },
        { text: this.$t('products.table.artist_title'), align: 'left', value: 'name', sortable: false },
        { text: this.$t('products.table.name_title'), align: 'left', value: 'name', sortable: false },
        { text: this.$t('products.table.type_title'), align: 'left', value: 'name', sortable: false },
        { text: this.$t('charthit.chartName'), align: 'left', value: 'name', sortable: false },
        { text: this.$t('products.table.position_title'), align: 'left', value: 'name', sortable: false },
        { text: this.$t('charthit.hitDate'), align: 'left', value: 'date', sortable: false },
      ],
    };
  }

  private SearchProd(value: any): void {
    this.filterChoose.search = value;
    this.clearChartHits();
    this.getChartHit(this.filterChoose);
  }

  private changeShop(val: any): void {
    if (this.filterChoose.shopId === val) {
      return;
    }
    localStorage.setItem('shopId', val);
    this.filterChoose.shopId = val;
    this.clearChartHits();
    this.getChartHit(this.filterChoose);
  }

  private changePage(val: any) {
    this.filterChoose.page = val;
    this.getChartHit(this.filterChoose);
  }
}
</script>

<style lang="scss">
@import "~@/styles/basic/variables";

.sort-wrap{
  display: flex;
  justify-content: space-between;
}
.search-btn-wrap{
  display: flex;
  max-width: 230px;
  .toggle-btn{
    min-width: 30px;
    padding: 0 10px;
    margin-right: 0;
    margin-top: 5px;
    .icon{
      color: $color-primary-grey
    }
  }
}
.head-platform{
  font-size: 14px;
  text-align: left;
  margin-top: 30px;
}
.date-wrap{
  display: flex;
  flex-direction: column;
}
.select-list {
  display: flex;
  padding: 15px;
  background-color: $color-background;
  justify-content: flex-end;
}
</style>
