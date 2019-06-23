<template>
  <v-container class="song-info-wrap">
    <h1>{{ $t("product.title") }}</h1>
    <div class="description-wrap">
      <div class="image">
        <img :src="productDetail.image.medium" v-if="isImage(productDetail.image)" />
        <img src="../../../assets/images/Rectangle.png" v-else />
      </div>
      <div class="list">
        <h2>
          {{productDetail.productArtist}} - {{productDetail.productTitle}}
          <span v-show="productDetail.productVersion != null">( {{productDetail.productVersion}} )</span>
        </h2>
        <div class="item">
          <div class="heading">{{ $t("product.description.label_title") }}</div>
          <div class="name">{{productDetail.productLabel}}</div>
        </div>
        <div class="item">
          <div class="heading">{{ $t("product.description.genre_title") }}</div>
          <div class="name">{{productDetail.productGenre}}</div>
        </div>
        <div class="item">
          <div class="heading">{{ $t("product.description.release_title") }}</div>
          <div class="name" v-if="productDetail.productReleaseDate">{{parseDate(productDetail.productReleaseDate)}}</div>
        </div>              
        <div class="item">
          <div class="heading">{{ $t("product.description.ean_title") }}</div>
          <div class="name">{{productDetail.productCode}}</div>
        </div>  
      </div>
    </div>
    <div class="chartt-wrap" >
      <h4 class="head-txt">{{ $t("product.diagram_title") }}</h4>
      <Diagram :productsGraph="productDetailGraphs"/>
      <ProductsListAlbum :productsList="productDetailCharts" @filterProduct="filterProduct"/>
    </div>
    <div class="bottom-wrap">
      <BtnPrev>{{ $t("common.back") }}</BtnPrev>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { Mixins } from 'vue-mixin-decorator';
import Diagram from '@/shared/components/Diagram.vue';
import BtnPrev from '@/shared/components/BtnPrev.vue';
import ProductsListAlbum from '@/modules/Product/components/ProductsListAlbum.vue';
import Common from '@/shared/common';

@Component({
  name: 'Product',
  components: {
    Diagram,
    BtnPrev,
    ProductsListAlbum,
  },
})
export default class Product extends Mixins<Common>(Common) {
  @State('productDetail') private productDetail: any;
  @State('productDetailCharts') private productDetailCharts: any;
  @Action('getProductDetail') private getProductDetail!: any;
  @Action('getProductDetailCharts') private getProductDetailCharts!: any;
  @Action('getProductDetailGraphs') private getProductDetailGraphs!: any;

  private productDetailGraphs: any = [];

  public created() {
    this.getProductDetail({
      product_id: this.$route.params.id,
      product_type: this.$route.query.productType,
    });

    this.getProductDetailCharts({
      product_id: this.$route.params.id,
      product_type: this.$route.query.productType,
    });

    this.getProductDetailGraphs({
      product_id: this.$route.params.id,
      product_type: this.$route.query.productType,
    })
    .then((response: any) => {
      this.productDetailGraphs = response;
    });
  }

  private filterProduct() {
    this.getProductDetailGraphs({
      product_id: this.$route.params.id,
      product_type: this.$route.query.productType,
    });
  }
}
</script>

<style lang="scss">
  @import "~@/styles/basic/variables";
  @import "~@/styles/basic/buttons";

  .chartt-wrap{
    background-color: #fff;
    border: solid 1px $color-card-grey;
    margin-top: 20px;
    padding: 30px 25px;
    width: 100%;
  }

  .song-info-wrap {
    flex-direction: column;
    .description-wrap {
      padding: 25px;
      width: 100%;
      border: solid 1px $color-card-grey;
      background-color: $color-white;
      display: flex;
      .image {
        text-align: left;
        margin-right: 30px;
        img {
          width: 180px;
          height: 180px;
          object-fit: cover;
        }
      }
      .list {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: space-between;
        .item {
          display: flex;
          justify-content: flex-start;
          p{
            margin-bottom:0;
          }
          .heading {
            font-size: 12px;
            font-weight: normal;
            line-height: 1;
            color: $color-primary-grey;
            text-align: left;
            width: 150px;
          }
          .name {
            font-size: 12px;
            font-weight: 600;
            color: $color-dark;
          }
        }
      }
    }
  }

  .bottom-wrap {
    display: flex;
    justify-content: flex-start;
  }
</style>
