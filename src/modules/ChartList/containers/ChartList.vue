<template>
  <v-container class="admin-pages">
    <div class="head-platform">{{ $t("products.platform_title") }}</div>
    <div class="sort-wrap">
      <PlatformFilter class="mt-1" @changeShop="changeShop" :shopId="(filterChoose.shopId) ? filterChoose.shopId : 'all'" />
      <div class="inputs-row">
        <BaseSelect class="type-select" :listOptions="productType" @change="changeProductType">{{ $t("products.type_title") }}</BaseSelect>
        <div class="search-btn-wrap text-xs-left">
          <SimpleSearch @SearchProd="SearchProd" :placeholder="$t('products.search')"/>
        </div>
      </div>
    </div>  
    <ProductsList class="admin-list" :perPage="20" :showCover="false" :productsList="chartList.usefulData" :count="chartList.totalCount" :headers="headers"/>  
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
import BaseSelect from '@/shared/components/BaseSelect.vue';

@Component({
  name: 'ChartList',
  components: {
    SimpleSearch,
    PlatformFilter,
    ProductsList,
    BaseSelect,
  },
})
export default class ChartList extends Mixins<Common>(Common) {
  @State('chartList') public chartList: any;
  @Action('getChartList') public getChartList: any;
  @Action('clearChartList') public clearChartList: any;

  private filterChoose: any = this.getShopId();
  private searchFieldValue: string = '';
  private productType: any = [];

  public created() {
    this.getChartList(this.filterChoose);
  }

  public data() {
    return {
      headers: [
        { text: this.$t('chartlists.platform'), align: 'left', value: 'number', sortable: false },
        { text: this.$t('chartlists.listType'), align: 'left', value: 'name', sortable: false },
        { text: this.$t('chartlists.listName'), align: 'left', value: 'name', sortable: false },
        { text: this.$t('chartlists.lastTimeCrawled'), align: 'left', value: 'name', sortable: false },
        { text: this.$t('chartlists.lastChartHitFound'), align: 'left', value: 'name', sortable: false },
      ],
    };
  }

  private SearchProd(value: any): void {
    this.filterChoose.search = value;
    this.clearChartList();
    this.getChartList(this.filterChoose);
  }

  private changeProductType(val: any) {
    this.filterChoose.productType = val.value;
    this.getChartList(this.filterChoose);
  }

  private changeShop(val: any): void {
    if (this.filterChoose.shopId === val) {
      return;
    }
    localStorage.setItem('shopId', val);
    this.filterChoose.shopId = val;
    this.clearChartList();
    this.getChartList(this.filterChoose);
  }

  private changePage(val: any) {
    this.filterChoose.page = val;
    this.getChartList(this.filterChoose);
  }

  @Watch('chartList')
  private onChanged(val: any) {
    this.productType = [
      {
        name: 'Select type',
        value: '',
      },
    ];
    if (val.allListTypes) {
      val.allListTypes.forEach((element: string) => {
        this.productType.push({
          name: element,
          value: element,
        });
      });
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/basic/variables";

.sort-wrap{
  display: flex;
  justify-content: space-between;
  .inputs-row {
    display: flex;
  }
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
