<template>
  <div class="chart-links">
    <!-- <a class="spotify" href="#">Spotify</a> -->
    <a class="all" :class="(shopId == 'all') ? 'active': false" @click.prevent="$parent.changeShop('all');">{{ $t("common.all") }}</a>
    <a class="beatport" :class="(shopId == '5') ? 'active': false" @click.prevent="$parent.changeShop('5');">Beatport</a>
    <a class="traxsource" :class="(shopId == '9') ? 'active': false" @click.prevent="$parent.changeShop('9');">Traxsource</a>
    <a class="apple" :class="(shopId == '359') ? 'active': false" @click.prevent="$parent.changeShop('359');">Apple Music</a>
    <a class="iTunes" :class="(shopId == '2') ? 'active': false" @click.prevent="$parent.changeShop('2');">iTunes</a>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import { State, Action } from 'vuex-class';

  import Common from '@/shared/common';

  @Component({
    name: 'PlatformFilter',
  })
  export default class PlatformFilter extends Vue {
    @Prop({ default: 'all' }) private shopId: string;
  }
</script>

<style scoped lang="scss">
  @import "~@/styles/basic/variables.scss";
</style>
