<template>
  <router-link class="song-card" :to="`/products/${productData.digdisId}?productType=${(productData.type)? productData.type: 'track'}`">
    <div class="image">
      <img :src="productData.image.medium" alt="placeholder" v-if="isImage(productData.image)"/>
      <img src="../../../assets/images/Placeholder.png" alt="placeholder" v-else/>
    </div>
    <div class="content">
      <h2>{{productData.artistName}} - {{productData.releaseName}}</h2>
      <div>
        <div @click.prevent="(productData.listUrl) ? openLink(productData.listUrl) : ''" class="blocks icon" :class="[getShopNameById(productData.shopId), (productData.shopId == '2' || productData.shopId == '359') ? '' : 'link']">
          {{productData.displayListName}}
          <v-tooltip v-if="productData.shopId == '2' || productData.shopId == '359'" max-width='250px' right>
            <v-icon class="icon-info" slot="activator">error_outline</v-icon>
            <span v-if="productData.shopId == '2'">iTunes does not have public links to their chartlists. To open the chartlist please open iTunes with the the corresponding storefront.</span>
            <span v-if="productData.shopId == '359'">Apple Music does not have public links to their chartlists. To open the chartlist please open iTunes with the the corresponding storefront.</span>
          </v-tooltip>
        </div>
        <div @click.prevent="(productData.listCreatorUrl) ? openLink(productData.listCreatorUrl) : ''" class="blocks icon creator" :class="(productData.shopId == '2' || productData.shopId == '359') ? '' : 'link'">
          {{productData.listCreator}}
        </div>
      </div>
    </div>
    <div class="arrow">
      <div class="track-rate">
        <div class="rate" :class="[productData.positionChange > 0 ? 'top': productData.positionChange < 0 ? 'bottom' : 'zero']">
          <v-icon class="icon" v-if="productData.positionChange != 0">{{checkPosition(productData.positionChange)}}</v-icon>
          {{productData.position ? Math.abs(productData.position) : 0}}
        </div>
      </div>
      <div class="dayoffset">
        {{getOffsetDay(productData.hitDate)}}
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Mixins } from 'vue-mixin-decorator';
import moment from 'moment';

import Common from '@/shared/common';

@Component
export default class ProductCard extends Mixins<Common>(Common) {
  @Prop({ default: null }) private productData: ProductCard | null;

  public created() {
    (localStorage.getItem('language') === 'de') ? moment.locale('de') : moment.locale('en');
  }

  private getOffsetDay(lastHitDate: any) {
    return moment(lastHitDate).fromNow();
  }
}
</script>

<style lang="scss">
@import "~@/styles/basic/variables";

.song-card {
  background-color: $color-white;
  padding: 24px;
  border: solid 1px $color-card-grey;
  border-radius: 3px;
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  text-decoration: none;
  &:hover {
    background-color: $color-background;
  }
  .image {
    width: 15%;
    img {
      width: 117px;
      height: 117px;
      object-fit: cover;
    }
  }
  .content {
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 24px;
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
      cursor: default;
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
        background: url("../../../assets/images/icon-apple-music.png");
        background-repeat: no-repeat;
      }
    }
    .blocks.icon.beatport {
      &:before {
        background: url("../../../assets/images/icon-beatport.png");
        background-repeat: no-repeat;
      }
    }
    .blocks.icon.itunes {
      &:before {
        background: url("../../../assets/images/icon-itunes.png");
        background-repeat: no-repeat;
      }
    }
    .blocks.icon.spotify {
      &:before {
        background: url("../../../assets/images/icon-spotify.png");
        background-repeat: no-repeat;
      }
    }
    .blocks.icon.traxsource {
      &:before {
        background: url("../../../assets/images/icon-traxsource.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .blocks.creator {
      font-size: 14px;
      height: 22px;
      font-weight: normal;
      color: $color-primary-grey;
      margin-right: 25px;
      display: flex;
      align-items: center;
      &:before {
        content: "";
        width: 18px;
        height: 18px;
        display: inline-block;
        margin-right: 10px;
        background: url("../../../assets/images/person.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .blocks.link{
      cursor: pointer;
    }
    .blocks.link:hover{
      text-decoration: underline;
      color: $color-primary;
    }
  }
  .arrow {
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    cursor: pointer;
    .dayoffset{
      font-size: 12px;
      margin-top: 10px;
      color: $color-primary-grey;
    }
  }
}
.icon-info{
  font-size: 22px;
  margin-left: 5px;
  transform: rotate(180deg);
  color: $color-primary-grey!important;
}
</style>
