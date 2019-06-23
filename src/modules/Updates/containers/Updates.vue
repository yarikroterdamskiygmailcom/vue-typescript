<template>
  <v-container>
    <v-container class="updates-wrap" >
      <div class="head-block">
        <h1>{{ $t("updates.title") }}</h1>
        <PlatformFilter @changeShop="changeShop" :shopId="(filterChoose.shopId) ? filterChoose.shopId : 'all'"/>
      </div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <ProductCard v-for="(product, index) in latestUpdates.usefulData" :productData="product" :key="index"/>
      </div>
      <div class="notfoundwrap mt-5" v-if="latestUpdates.usefulData && !latestUpdates.usefulData.length">
        <img src="../../../assets/images/IconCharttool.png" alt="IconCharttool">
        <div class="notfound">
          <p>{{ $t("updates.not_found") }}</p>
          <p>{{ $t("updates.not_found1") }}</p>
          <p>{{ $t("updates.not_found2") }}</p><br>
          <p>{{ $t("updates.not_found3") }}</p>
        </div>
      </div>
    </v-container>
    <Preloader v-if="latestUpdates.usefulData == null || showpreloader"></Preloader>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { Mixins } from 'vue-mixin-decorator';
// @ts-ignore
import infiniteScroll from 'vue-infinite-scroll';

import ProductCard from '../components/ProductCard.vue';
import Preloader from '@/shared/components/Preloader.vue';
import Common from '@/shared/common';
import PlatformFilter from '@/shared/components/PlatformFilter.vue';

Vue.use(infiniteScroll);

@Component({
  name: 'Updates',
  components: {
    ProductCard,
    Preloader,
    PlatformFilter,
  },
})
export default class Updates extends Mixins<Common>(Common) {
  @State('latestUpdates') public latestUpdates: any;
  @Action('getLatestUpdates') public getLatestUpdates: any;
  @Action('clearUpdatesList') public clearUpdatesList: any;

  private filterChoose: any = this.getShopId();
  private busy: boolean = true;
  private showpreloader: boolean = false;
  private currentPage: number = 1;

  public created() {
    this.clearUpdatesList();
    if (Object.keys(this.latestUpdates).length === 0 || this.latestUpdates.usefulData.length === 0) {
      this.loadMore();
    } else {
      if (this.latestUpdates.usefulData.length >= 10) {
        this.busy = false;
      }
    }
  }

  public loadMore(): void {
    this.busy = true;
    this.getList(this.filterChoose.shopId);
  }

  public changeShop(val: any): void {
    if (this.filterChoose.shopId === val) {
      return;
    }
    this.currentPage = 1;
    this.clearUpdatesList();
    this.getList(val);
  }

  public getList(val: any): void {
    this.filterChoose.shopId = val;
    localStorage.setItem('shopId', val);
    this.showpreloader = true;

    this.getLatestUpdates({
      shopId: val,
      page: this.currentPage,
    }).then((res: any) => {
      this.currentPage++;
      this.busy = (res.usefulData.length >= 9) ? false : true;
      this.showpreloader = false;
    });
  }
}
</script>

<style lang="scss">
@import "~@/styles/basic/variables";

.updates-wrap {
  max-width: 870px;
  width: 100%;
  margin: 0 auto;
  .head-block {
    display: flex;
    justify-content: space-between;
  }
}
.notfoundwrap img {
  max-width: 200px;
  background-size: contain;
}
.notfound {
  text-align: center;
  p {
    margin-bottom: 10px;
  }
}
</style>
