<template>
  <div class="stats-card">
    <h4>{{chartsStatisticNumber}}</h4>
    <div>{{chartsStatisticText}}</div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component({
    name: 'ProductsStats',
  })
  export default class ProductsStats extends Vue {
    @Prop({ default: null }) private chartsStatisticNumber: any;
    @Prop({ default: null }) private chartsStatisticText: any;
  }
</script>

<style lang="scss">
  @import "~@/styles/basic/variables";

  .stats-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h4 {
      font-size: 36px;
      color: $color-primary;
      font-weight: normal;
      margin-bottom: 5px;
    }
    div {
      font-size: 12px;
      color: $color-primary-grey;
      margin-bottom: 5px;
    }
  }
</style>
