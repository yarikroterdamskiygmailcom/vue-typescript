<template>
  <date-range-picker 
    :startDate="startDate" 
    :endDate="endDate" 
    @update="updateValues"
    :locale-data="locale"
  >
    <!--Optional scope for the input displaying the dates -->
    <div class="select-date" slot="input">{{ startDate }} - {{ endDate }}<v-icon class="icon">today</v-icon></div>
  </date-range-picker>
</template>

<script>
  import moment from 'moment';
  // @ts-ignore
  import DateRangePicker from 'vue2-daterange-picker';

  export default {
    name: 'DatePicker',
    components: {
      DateRangePicker,
    },
    data() {
      return {
        startDate: moment().add(-3, 'days').format('YYYY-MM-DD'),
        endDate: moment().add(0, 'days').format('YYYY-MM-DD'),
        locale: {
          direction: 'ltr', // direction of text
          format: 'DD-MM-YYYY', // fomart of the dates displayed
          separator: ' - ', // separator between the two ranges
          applyLabel: 'Apply',
          cancelLabel: 'Cancel',
          weekLabel: 'W',
          customRangeLabel: 'Custom Range',
          daysOfWeek: moment.weekdaysMin(), // array of days - see moment documenations for details
          monthNames: moment.monthsShort(), // array of month names - see moment documenations for details
          firstDay: 1, // ISO first day of week - see moment documenations for details
        },
      };
    },
    methods: {
      updateValues(values) {
        // @ts-ignore
        this.startDate = moment(values.startDate).format('YYYY-MM-DD');
        // @ts-ignore
        this.endDate = moment(values.endDate).format('YYYY-MM-DD');
        // @ts-ignore
        this.$emit('change', {releaseDateBegin: this.startDate, releaseDateEnd: this.endDate});
      },
    },
  };
</script>

<style lang="scss" scoped>
@import "~@/styles/basic/variables.scss";
@import "~@/styles/components/daterangepicker.css";

.select-date {
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-top: 5px;
  border-radius: 3px;
  height: 36px;
  padding: 5px 12px;
  border: 1px solid $color-card-grey;
  width: 230px;
  background-color: $color-white;
  .icon{
    font-size: 15px;
  }
}
.select-date::placeholder {
  color: $color-card-grey;
}

.select-group {
  text-align: left;
  width: 100%;
  max-width: 230px;
  margin-right: 40px;
  label {
    text-align: left;
  }
  select {
    margin-top: 5px;
    border-radius: 3px;
    height: 36px;
    padding: 5px 12px;
    border: 1px solid $color-card-grey;
    width: 100%;
    max-width: 230px;
    -webkit-appearance: menulist;
    background-color: $color-white;
  }
  select::placeholder {
    color: $color-card-grey;
  }
}
</style>
