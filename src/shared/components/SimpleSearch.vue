<template>
  <v-text-field
    class="input-search"
    :label="placeholder"
    v-model="searchValue"
    solo
    v-on:keyup.enter="$parent.SearchProd(searchValue)"
    @blur="$parent.SearchProd(searchValue)"
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component({
  name: 'SimpleSearch',
})
export default class SimpleSearch extends Vue {
  @Prop({ default: null }) private placeholder: any;

  private searchValue: string = '';
}
</script>

<style scoped>
</style>
