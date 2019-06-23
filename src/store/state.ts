export default class State {
  public diagramData: any;
  public chartStatistics: any;
  public userData: any;
  public latestUpdates: any;
  public productsList: any;
  public chartList: any;
  public chartHit: any;
  public productDetail: any;
  public productDetailCharts: any;
  public productDetailGraphs: any;
  public filterListType: any;
  public productsSearched: any;
  public searchText: string;
  public shopId: any;
  public currentPageUpdates: number;
  public currentPageProducts: number;
  public currentPageHits: number;
  public currentPageList: number;
  public error: any;

  constructor() {
    this.diagramData = [];
    this.latestUpdates = {};
    this.chartStatistics = null;
    this.userData = {};
    this.productsList = [];
    this.chartList = {};
    this.chartHit = {};
    this.filterListType = [];
    this.productDetail = {};
    this.productDetailCharts = [];
    this.productDetailGraphs = [];
    this.productsSearched = [];
    this.searchText = '';
    this.shopId = 'all';
    this.currentPageUpdates = 1;
    this.currentPageProducts = 1;
    this.currentPageHits = 1;
    this.currentPageList = 1;
    this.error = null;
  }
}
