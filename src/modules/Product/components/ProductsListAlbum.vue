<template>
  <div>
    <div class="sort-wrap-product">
      <div class="platform-wrap">
        <PlatformFilter @changeShop="changeShop" :shopId="(filterChoose.shopId) ? filterChoose.shopId : 'all'" />
        <div class="search-btn-wrap text-xs-left">
          <SimpleSearch @SearchProd="SearchProd" :placeholder="$t('product.search')"/>
        </div>
      </div>
      <div class="wrap-table">
        <div v-if="listProducts.length > 0" class="head-table">
          <div class="position-w"></div>
          <div class="platform-w">{{ $t("product.table.platform_title") }}</div>
          <div class="listtype-w">{{ $t("product.table.list_type_title") }}</div>
          <div class="listname-w">{{ $t("product.table.list_name_title") }}</div>
          <div class="region-w">{{ $t("product.table.region_title") }}</div>
          <div class="publisher-w">{{ $t("product.table.publisher_title") }}</div>
        </div>
        <div v-for="(item, index) in listProducts" :key="index" class="item-table">
          <div class="item-date">{{parseDate(item.date)}}</div>
          <div v-for="(val, index) in item.information" :key="index" class="item-content">
            <div class="position-w track-rate">
              <div class="rate" :class="[val.positionChange > 0 ? 'top': val.positionChange < 0 ? 'bottom' : 'zero']">
                <v-icon class="icon" v-if="val.positionChange != 0">{{checkPosition(val.positionChange)}}</v-icon>
                {{val.position ? Math.abs(val.position) : 0}}
              </div>
            </div>
            <div class="platform-w block icon" :class="getShopNameById(val.shopId)"></div>
            <div class="listtype-w">{{val.listType}}</div>
            <div class="listname-w">{{val.listName}}</div>
            <div class="region-w">{{val.region}}</div>
            <div class="publisher-w">{{val.listCreator}}</div>
          </div>
        </div>
        <div v-if="listProducts.length <= 0" class="no-text">No data available</div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { Mixins } from 'vue-mixin-decorator';
import Common from '@/shared/common';
import SimpleSearch from '@/shared/components/SimpleSearch.vue';
import PlatformFilter from '@/shared/components/PlatformFilter.vue';

@Component({
  name: 'ProductsList',
  components: {
    SimpleSearch,
    PlatformFilter,
  },
})
export default class ProductsList extends Mixins<Common>(Common) {
  @Prop({ default: null }) private productsList: any;
  @Prop({ default: true }) private sorting: boolean;
  @State('filterListType') private filterListType: any;

  private sortshow: boolean = false;
  private listProducts: any = [];
  private filterChoose: any = this.getShopId();

  @Watch('productsList')
  private onProductsListChanged(val: any, oldVal: any) {
    if (val !== oldVal) {
      this.listProducts = val;
      this.changeShop(this.filterChoose.shopId);
    }
  }

  private SearchProd(value: any): void {
    this.listProducts = [];
    this.productsList.forEach((item: any) => {
      const informationArray: any = [];
      item.information.forEach((el: any) => {
        if (value && (el.listName.toLowerCase().indexOf(value.toLowerCase()) >= 0
        || el.listCreator.toLowerCase().indexOf(value.toLowerCase()) >= 0)) {
          informationArray.push(el);
        } else if (value === '') {
          this.changeShop(this.filterChoose.shopId);
        }
      });
      if (informationArray.length) {
        this.listProducts.push({
          date: item.date,
          information: informationArray,
        });
      }
    });
  }

  private changeShop(val: any) {
    localStorage.setItem('shopId', val);
    this.listProducts = [];
    this.filterId(val);
  }

  private filterId(val: string) {
    this.productsList.forEach((item: any) => {
      const informationArray: any = [];

      item.information.forEach((el: any) => {
        if (val === el.shopId || val === 'all') {
          informationArray.push(el);
        }
      });

      if (informationArray.length) {
        this.listProducts.push({
          date: item.date,
          information: informationArray,
        });
      }
    });
    this.filterChoose.shopId = val;
  }
}
</script>

<style lang="scss">
@import "~@/styles/basic/variables";

.platform-wrap{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.wrap-table{
  display:flex;
  flex-direction: column;
  width: 100%;
  .head-table{
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
  }
  .item-table{
    border-top: 1px solid $color-disabled;
    padding: 10px 0;
    display:flex;
    flex-direction: column;
    .item-date{
      width: 100%;
      text-align: left;
      font-size: 12px;
      font-weight: bold;
    }
    .item-content{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
    }
  }
  .position-w{
    width: 8%;
    justify-content: flex-start;
  }
  .platform-w{
    width: 7%;
  }
  .listtype-w{
    width: 22.5%;
  }
  .listname-w{
    width: 22.5%;
  }
  .region-w{
    width: 17.5%;
  }
  .publisher-w{
    width: 22.5%;
  }
}
.sort-wrap-product {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15px;
}
.search-btn-wrap {
  display: flex;
  .toggle-btn {
    min-width: 30px;
    padding: 0 10px;
    .icon {
      color: $color-primary-grey
    }
  }
}
.date-wrap {
  display: flex;
  flex-direction: column;
}
.select-list {
  display: flex;
  padding: 15px;
  background-color: $color-background;
  justify-content: flex-end;
}
.block {
    font-size: 14px;
    height: 30px;
    font-weight: normal;
    color: $color-primary-grey;
    display: flex;
    align-items: center;
  }
  .block.icon {
    &:before {
      content: "";
      width: 18px;
      height: 18px;
      display: inline-block;
      margin: 0 auto;
    }
  }
  .block.icon.apple {
    &:before {
      background: url("../../../assets/images/icon-apple-music.png");
      background-repeat: no-repeat;
    }
  }
  .block.icon.beatport {
    &:before {
      background: url("../../../assets/images/icon-beatport.png");
      background-repeat: no-repeat;
    }
  }
  .block.icon.itunes {
    &:before {
      background: url("../../../assets/images/icon-itunes.png");
      background-repeat: no-repeat;
    }
  }
  .block.icon.spotify {
    &:before {
      background: url("../../../assets/images/icon-spotify.png");
      background-repeat: no-repeat;
    }
  }
  .block.icon.traxsource {
    &:before {
      background: url("../../../assets/images/icon-traxsource.png");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
</style>
