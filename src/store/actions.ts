import { ActionTree, ActionContext } from 'vuex';
// @ts-ignore
import clean from 'lodash-clean';

import HTTP from '../../config';
import State from './state';
import * as types from './mutation-types';

const errorData = {
  Message: 'Request failed with status code 500',
  Reason: 'Server Error',
  Status: 500,
};

const actions: ActionTree<State, State> = {
  getSearchedProduct({ commit }: ActionContext<State, State>, searchDetail: any): void {
    HTTP.get('products/autocomplete_search/', {
      params: {
        search: searchDetail.search,
      },
    })
      .then((response) => {
        searchDetail = response.data;
        if (searchDetail.Status === 404) {
          commit(types.ERROR, searchDetail);
        }
        commit(types.ERROR, null);
        commit(types.PRODUCT_SEARCHED, searchDetail);
      })
      .catch(() => {
        commit(types.ERROR, errorData);
      });
  },

  getChartList({ commit }: ActionContext<State, State>, chartList: any) {
    const params = {
      shopId: (chartList.shopId) ? chartList.shopId : 'all',
      page: (chartList.page) ? chartList.page : '1',
      listName: (chartList.search) ? chartList.search : '',
      listType: (chartList.productType) ? chartList.productType : '',
    };

    return new Promise<string>((resolve, reject) => {
      HTTP.get('debug/chartlists/', {
        params: clean(params),
      })
        .then((response) => {
          chartList = response.data;
          if (chartList.Status === 404) {
            commit(types.ERROR, chartList);
          }
          commit(types.ERROR, null);
          commit(types.SET_CURRENT_PAGE_LIST, params.page);
          commit(types.CHART_LIST, chartList);
          resolve(chartList);
        })
        .catch(() => {
          commit(types.ERROR, errorData);
          reject(errorData);
        });
    });
  },

  getChartHit({ commit }: ActionContext<State, State>, chartHit: any) {
    const params = {
      shopId: (chartHit.shopId) ? chartHit.shopId : 'all',
      page: (chartHit.page) ? chartHit.page : '1',
      search: (chartHit.search) ? chartHit.search : '',
      limit: (chartHit.limit) ? chartHit.limit : '',
    };

    return new Promise<string>((resolve, reject) => {
      HTTP.get('products/latest/', {
        params: clean(params),
      })
        .then((response) => {
          chartHit = response.data;
          if (chartHit.Status === 404) {
            commit(types.ERROR, chartHit);
          }
          commit(types.ERROR, null);
          commit(types.SET_CURRENT_PAGE_HITS, params.page);
          commit(types.CHART_HIT, chartHit);
          resolve(chartHit);
        })
        .catch(() => {
          commit(types.ERROR, errorData);
          reject(errorData);
        });
    });
  },

  getLatestUpdates({ commit }: ActionContext<State, State>, latestUpdates: any) {
    const params = {
      shopId: (latestUpdates.shopId) ? latestUpdates.shopId : 'all',
      page: (latestUpdates.page) ? latestUpdates.page : '1',
      search: (latestUpdates.search) ? latestUpdates.search : '',
    };

    return new Promise<string>((resolve, reject) => {
      HTTP.get('products/latest/', {
        params: clean(params),
      })
        .then((response) => {
          latestUpdates = response.data;
          if (latestUpdates.Status === 404) {
            commit(types.ERROR, latestUpdates);
          }
          commit(types.ERROR, null);
          commit(types.SET_CURRENT_PAGE_UPDATES, params.page);
          commit(types.LATEST_UPDATES, latestUpdates);
          resolve(latestUpdates);
        })
        .catch(() => {
          commit(types.ERROR, errorData);
          reject(errorData);
        });
    });
  },

  getProductsList({ commit }: ActionContext<State, State>, productsList: any): void {
    const params = {
      shopId: (productsList.shopId) ? productsList.shopId : 'all',
      productType: (productsList.productType) ? productsList.productType : 'all',
      releaseDateBegin: (productsList.date) ? productsList.date.releaseDateBegin : '',
      releaseDateEnd: (productsList.date) ? productsList.date.releaseDateEnd : '',
      search: productsList.search ? productsList.search : '',
      page: productsList.page ? productsList.page : 1,
    };

    HTTP.get('products/', {
      params: clean(params),
    })
      .then((response:any) => {
          console.log(response)
        productsList = response.data;
        if (productsList.Status === 404) {
          commit(types.ERROR, productsList);
        }
        commit(types.ERROR, null);
        commit(types.SET_CURRENT_PAGE_PRODUCTS, params.page);
        commit(types.PRODUCTS_LIST, productsList);
      })
      .catch(() => {
        commit(types.ERROR, errorData);
      });
  },

  getProductDetail({ commit }: ActionContext<State, State>, productDetail: any): void {
    HTTP.get(`products/${productDetail.product_id}/`, {
      params: {
        productType: productDetail.product_type,
      },
    })
      .then((response) => {
        productDetail = response.data;
        if (productDetail.Status === 404) {
          commit(types.ERROR, productDetail);
        }
        commit(types.ERROR, null);
        commit(types.PRODUCT_DETAIL, productDetail);
      })
      .catch(() => {
        commit(types.ERROR, errorData);
      });
  },

  getProductDetailCharts({ commit }: ActionContext<State, State>, productDetail: any): void {
    HTTP.get(`products/${productDetail.product_id}/charts/`, {
      params: {
        productType: productDetail.product_type,
      },
    })
      .then((response) => {
        productDetail = response.data;
        if (productDetail.Status === 404) {
          commit(types.ERROR, productDetail);
        }
        commit(types.ERROR, null);
        commit(types.PRODUCT_DETAIL_CHARTS, productDetail);
      })
      .catch(() => {
        commit(types.ERROR, errorData);
      });
  },

  getProductDetailGraphs({ commit }: ActionContext<State, State>, productDetailGraphs: any) {
    return new Promise<string>((resolve, reject) => {
      HTTP.get(`products/${productDetailGraphs.product_id}/graph/`, {
        params: {
          productType: productDetailGraphs.product_type,
        },
      })
        .then((response:any) => {
          productDetailGraphs = response.data;
          if (productDetailGraphs.Status === 404) {
            commit(types.ERROR, productDetailGraphs);
          }
          commit(types.ERROR, null);
          commit(types.PRODUCT_DETAIL_GRAPHS, productDetailGraphs);
          resolve(productDetailGraphs);
        })
        .catch(() => {
          commit(types.ERROR, errorData);
          reject(errorData);
        });
    });
  },

  async getUserData({ commit }: ActionContext<State, State>, userData: any) {
    try {
      let resp = null;
      await HTTP.get('auth/', {
        headers: {
          token: userData.auth,
          contractid: userData.contractid,
        },
      }).then((response) => {
        resp = response.data;
        if (resp.Status === 404) {
          commit(types.ERROR, resp);
        }
        commit(types.ERROR, null);
        if (resp) {
          commit(types.USER_DATA, resp);
        }
      })
      .catch(() => {
        commit(types.ERROR, errorData);
      });

      return Promise.resolve(resp);
    } catch (e) {
      commit(types.ERROR, errorData);
      return Promise.reject(errorData);
    }
  },

  setUserData({ commit }: ActionContext<State, State>, userData: any) {
    commit(types.USER_DATA, userData);
  },

  getDiagramData({ commit }: ActionContext<State, State>, diagramData: any): void {
    HTTP.get('charts/')
      .then((response: any) => {
        diagramData = response.data;
        if (diagramData.Status === 404) {
          commit(types.ERROR, diagramData);
        }
        commit(types.ERROR, null);
        commit(types.DIAGRAM_DATA, diagramData);
      })
      .catch(() => {
        commit(types.ERROR, errorData);
      });
  },

  getChartStatistics({ commit }: ActionContext<State, State>, chartStatistics: any): void {
    HTTP.get('charts/kpi-info/')
      .then((response: any) => {
        chartStatistics = response.data;
        if (chartStatistics.Status === 404) {
          commit(types.ERROR, chartStatistics);
        }
        commit(types.ERROR, null);
        commit(types.CHART_STATISTICS, chartStatistics);
      })
      .catch(() => {
        commit(types.ERROR, errorData);
      });
  },

  changeSeachText({ commit }: ActionContext<State, State>, searchText: any): void {
    commit(types.CHANGE_SEARCH_TEXT, searchText);
  },

  clearUpdatesList({ commit }: ActionContext<State, State>): void {
    commit(types.CLEAR_UPDATES_LIST);
  },

  clearProductsList({ commit }: ActionContext<State, State>): void {
    commit(types.CLEAR_PRODUCTS_LIST);
  },

  clearChartHits({ commit }: ActionContext<State, State>): void {
    commit(types.CLEAR_CHART_HITS);
  },

  clearChartList({ commit }: ActionContext<State, State>): void {
    commit(types.CLEAR_CHART_LIST);
  },

};

export default actions;
