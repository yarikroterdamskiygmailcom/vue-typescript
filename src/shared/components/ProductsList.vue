<template>
  <v-data-table
    :headers="headers"
    :items="productsList"
    :total-items="count"
    :pagination.sync="pagination"
    :rows-per-page-items="[20, 100]"
    :loading="showLoader"
    class="song-table"
  >
    <v-progress-linear slot="progress" color="#80c0d8" indeterminate></v-progress-linear>
    <template slot="items" slot-scope="props">
      <td class="text-xs-left" v-if="showCover">
      <div class="image">
        <img :src="props.item.image.small" alt="placeholder" v-if="isImage(props.item.image)"/>
        <img src="@/assets/images/Placeholder.png" alt="placeholder" v-else/>
      </div>
      </td>
      <td class="text-xs-left" v-if="props.item.artistName">
        <div class="track-artist">
          <router-link :to="`/products/${props.item.digdisId}?productType=${(props.item.type)? props.item.type: 'track'}`">{{ props.item.artistName }}</router-link>
        </div>
      </td>
      <td v-if="props.item.releaseName" class="text-xs-left">{{props.item.releaseName}}</td>
      <td v-if="props.item.type" class="text-xs-left">{{props.item.type}}</td>
      <td v-if="props.item.listCreator" class="text-xs-left">
        <div @click.prevent="openLink(props.item.listUrl)" class="blocks link icon" :class="getShopNameById(props.item.shopId)">
          {{props.item.displayListName}}
        </div>
      </td>
      <td v-if="props.item.listCreator" class="text-xs-left">
        <div class="track-rate">
          <div class="rate" :class="[props.item.positionChange > 0 ? 'top': props.item.positionChange < 0 ? 'bottom' : 'zero']">
            <v-icon class="icon" v-if="props.item.positionChange != 0">{{checkPosition(props.item.positionChange)}}</v-icon>
            {{props.item.position ? Math.abs(props.item.position) : 0}}
          </div>
        </div>
      </td>
      <td v-if="props.item.releaseDate" class="text-xs-left">{{parseDate(props.item.releaseDate)}}</td>
      <td v-if="props.item.listCreator" class="text-xs-left">{{formatDate(props.item.hitDate)}}</td>
      <td v-if="props.item.shopName" class="text-xs-left">
        <div class="blocks link icon" :class="getShopNameById(props.item.shopId)">{{props.item.shopName}}</div></td>
      <td v-if="props.item.shopName" class="text-xs-left">{{props.item.listType}}</td>
      <td v-if="props.item.shopName" class="text-xs-left">{{props.item.listName}}</td>
      <td v-if="props.item.lastCrawlAt" class="text-xs-left">{{formatDate(props.item.lastCrawlAt)}}</td>
      <td v-if="props.item.latestChartHitTime" class="text-xs-left">{{formatDate(props.item.latestChartHitTime)}}</td>
    </template>
    <template slot="pageText" slot-scope="props">
      {{ $t("products.pagination.param1") }} {{ props.pageStart }} {{ $t("products.pagination.param2") }} {{ props.pageStop }} {{ $t("products.pagination.param3") }} {{ props.itemsLength }} {{ $t("products.pagination.param4") }}
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { Mixins } from 'vue-mixin-decorator';
import moment from 'moment';

import Common from '@/shared/common';

@Component({
  name: 'ProductsList',
})
export default class ProductsList extends Mixins<Common>(Common) {
  @Prop({ type: Array, default: (): any => [] }) private productsList: any;
  @Prop({ default: 0 }) private count: number;
  @Prop({ default: null }) private headers: any;
  @Prop({ default: true }) private showCover: boolean;
  @Prop({ default: 20 }) private perPage: number;

  private showLoader: boolean = false;
  private filterChoose: any;

  public data() {
    return {
      pagination: {
        rowsPerPage: this.perPage,
      },
    };
  }

  private formatDate(val: any) {
    return moment(val).format('MM/DD/YYYY h:mm a');
  }

  @Watch('productsList')
  private onProdChanged(val: any) {
    this.showLoader = (val.length <= 0) ? true : false;
  }

  @Watch('pagination')
  private onPageChanged(nextVal: any, prevVal: any) {
    if (prevVal.page && nextVal.page !== prevVal.page) {
      // @ts-ignore
      this.$parent.changePage(nextVal.page);
    }
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
  .song-table {
    margin-top: 30px;
    border: none;
    border-radius: 4px;
    .image{
      img{
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 3px;
      }
    }
    table.v-table {
      thead {
        background-color: transparent;
        color: $color-white;
        margin-bottom: 30px;
        tr {
          height: 30px;
          border-bottom: none!important;
          th {
            font-size: 12px;
            padding-bottom: 30px;
          }
        }
      }
      tbody {
        background-color: $color-white;
        tr {
          border-bottom: none!important;
          td {
            height: 43px;
            font-size: 12px;
            .track-cover,
            .track-artist {
              display: inline-block;
              vertical-align: middle;
              a{
                color: $color-primary;
              }
            }
            .track-cover {
              margin-right: 10px;
              img {
                width: 30px;
              }
            }
          }
        }
      }
    }
    .v-datatable__actions__select {
      display: none;
    }
  }
  .type-block{
    display: flex;
    align-items: center;
  }
  .blocks {
      font-size: 14px;
      height: 30px;
      font-weight: normal;
      color: $color-primary-grey;
      margin-right: 25px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      padding-left: 25px;
      text-align: left;
    }
    .blocks.icon {
      &:before {
        content: "";
        width: 18px;
        height: 18px;
        display: inline-block;
        margin-right: 10px;
        position: absolute;
        left: 0;
      }
    }
    .blocks.icon.apple {
      &:before {
        background: url("../../assets/images/icon-apple-music.png");
        background-repeat: no-repeat;
      }
    }
    .blocks.icon.beatport {
      &:before {
        background: url("../../assets/images/icon-beatport.png");
        background-repeat: no-repeat;
      }
    }
    .blocks.icon.itunes {
      &:before {
        background: url("../../assets/images/icon-itunes.png");
        background-repeat: no-repeat;
      }
    }
    .blocks.icon.spotify {
      &:before {
        background: url("../../assets/images/icon-spotify.png");
        background-repeat: no-repeat;
      }
    }
    .blocks.icon.traxsource {
      &:before {
        background: url("../../assets/images/icon-traxsource.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
</style>
