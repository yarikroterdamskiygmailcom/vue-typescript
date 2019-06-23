import Vue from 'vue';
import { Mixin } from 'vue-mixin-decorator';
import moment from 'moment';

@Mixin
export default class Common extends Vue {
  public parseDate(date: any) {
    return date.split('T')[0];
  }

  public createDate() {
    return moment().add(-3, 'days').format('YYYY-MM-DD');
  }

  public getShopId() {
    return {
      shopId: localStorage.getItem('shopId') ? localStorage.getItem('shopId') : 'all',
    };
  }

  public checkPosition(value: number) {
    return (value > 0) ? 'arrow_upward' : (value < 0) ? 'arrow_downward' : '';
  }

  public getShopNameById(id: string) {
    switch (id) {
      case '5':
        return 'beatport';
      case '9':
        return 'traxsource';
      case '2':
        return 'itunes';
      case '359':
        return 'apple';
    }
  }

  public openLink(link: any) {
    window.open(link);
  }

  public isImage(image: any) {
    return (image && this.isObject(image) && !this.isEmpty(image)) ? true : false;
  }

  public isObject(value: any) {
    return (value && typeof value === 'object') ? true : false;
  }

  public isEmpty(obj: any) {
    return (Object.keys(obj).length === 0) ? true : false;
  }

}
