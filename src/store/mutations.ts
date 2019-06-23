import { MutationTree } from 'vuex';

import * as types from './mutation-types';
import State from './state';

const mutations: MutationTree<State> = {
  [types.LATEST_UPDATES](state: State, latestUpdates: any): void {
    if (Object.keys(state.latestUpdates).length === 0) {
      state.latestUpdates = latestUpdates;
    } else {
      Array.prototype.push.apply(state.latestUpdates.usefulData, latestUpdates.usefulData);
    }
  },

  [types.CHART_HIT](state: State, chartHit: any): void {
    state.chartHit = chartHit;
  },

  [types.CHART_LIST](state: State, chartList: any): void {
    state.chartList = chartList;
  },

  [types.CLEAR_UPDATES_LIST](state: State ): void {
    state.latestUpdates = {};
    state.currentPageUpdates = 1;
  },

  [types.CLEAR_PRODUCTS_LIST](state: State ): void {
    state.productsList = [];
    state.currentPageProducts = 1;
  },

  [types.CLEAR_CHART_HITS](state: State ): void {
    state.chartHit = {};
    state.currentPageHits = 1;
  },

  [types.CLEAR_CHART_LIST](state: State ): void {
    state.chartList = {};
    state.currentPageList = 1;
  },

  [types.SET_CURRENT_PAGE_UPDATES](state: State, page: number): void {
    state.currentPageUpdates = +page;
  },

  [types.SET_CURRENT_PAGE_PRODUCTS](state: State, page: number): void {
    state.currentPageProducts = +page;
  },

  [types.SET_CURRENT_PAGE_HITS](state: State, page: number): void {
    state.currentPageHits = +page;
  },

  [types.SET_CURRENT_PAGE_LIST](state: State, page: number): void {
    state.currentPageList = +page;
  },

  [types.PRODUCT_SEARCHED](state: State, productsList: any): void {
    state.productsSearched = [];
    if (productsList) {
      productsList.forEach((item: any) => {
        state.productsSearched.push(item);
      });
    }
  },

  [types.PRODUCTS_LIST](state: State, productsList: any): void {
    state.productsList = productsList;
    if (productsList.filterListType) {
      state.filterListType = productsList.filterListType;
    }
  },

  [types.PRODUCT_DETAIL](state: State, productDetail: any): void {
    state.productDetail = productDetail;
  },

  [types.PRODUCT_DETAIL_CHARTS](state: State, productDetailCharts: any): void {
    state.productDetailCharts = productDetailCharts;
  },

  [types.PRODUCT_DETAIL_GRAPHS](state: State, productDetailGraphs: any): void {
    state.productDetailGraphs = productDetailGraphs;
  },

  [types.USER_DATA](state: State, userData: any): void {
    state.userData = userData;
  },

  [types.DIAGRAM_DATA](state: State, diagramData: any): void {
    state.diagramData = diagramData;
  },

  [types.CHART_STATISTICS](state: State, chartStatistics: any): void {
    state.chartStatistics = chartStatistics;
  },

  [types.CHANGE_SEARCH_TEXT](state: State, searchText: any): void {
    state.searchText = searchText;
  },

  [types.ERROR](state: State, error: any): void {
    state.error = error;
  },
};

export default mutations;
