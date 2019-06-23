<template>
  <div class="search">
    <Autocomplete 
      v-model="searchValue" 
      :getItemFromAjax="SearchProduct"
      @getProducts="getProducts"
      @documentClick="documentClick"
    />
    <div v-if="showSuggest && productsSearched.length > 0" class="suggest-list">
      <div class="itemSearch" v-for="(item, index) in productsSearched" :key="index" @click="getProducts(item)">{{ item }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';

import Autocomplete from '@/shared/components/Autocomplete.vue';

@Component({
  name: 'Search',
  components: {
    Autocomplete,
  },
})
export default class Search extends Vue {
  @State('productsSearched') private productsSearched: any;
  @State('searchText') private searchText: any;
  @Action('getSearchedProduct') private getSearchedProduct!: any;
  @Action('changeSeachText') private changeSeachText!: any;
  @Action('getProductsList') private getProductsList!: any;

  private searchValue: string = '';
  private error: boolean = false;
  private showSuggest: boolean = false;

  private SearchProduct(value: any): void {
    if (this.searchValue.length < 3) {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
      return;
    } else {
      this.showSuggest = true;
      this.getSearchedProduct({
        search: value,
      }).then(() => {
        this.changeSeachText(this.searchValue);
      });
    }
  }

  private getProducts(value: any) {
    this.searchValue = value;
    this.showSuggest = false;
    this.$emit('change', value);
  }

  private documentClick() {
    if (this.searchValue === '') {
      this.showSuggest = false;
      this.getProducts('');
    }
  }
}
</script>

<style scoped>
  @import "~@/styles/components/search.scss";
  .search {
    height: 28px;
    position: relative;
  }
  .v-alert {
    position: absolute;
    z-index: 100;
    padding: 10px !important;
  }
</style>
