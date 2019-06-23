<template>
  <div class="select-group">
    <label>
      <slot/>
    </label>
    <select v-model="ckeckedOptions" @change="saveChoose">
      <option v-for="(item, index) in listOptions" :key="index" :value="item" >{{(item && item.name) ? item.name: item}}</option>
    </select>
    <v-icon class="icon icon-down">keyboard_arrow_down</v-icon>
  </div>
</template>

<script>

export default {
  name: 'BaseSelect',
  props: {
    listOptions: {
      type: Array,
      default: [],
    },
    emitToStart: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ckeckedOptions: {},
    };
  },
  watch: {
    listOptions(nextData, prevData) {
      if (nextData.length !== prevData.length) {
        this.ckeckedOptions = this.listOptions[0];
      }
    },
  },
  methods: {
    saveChoose() {
      this.$emit('change', this.ckeckedOptions);
    },
  },
  mounted() {
    this.ckeckedOptions = this.listOptions[0];
    if (this.emitToStart !== false) {
      this.saveChoose();
    }
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/styles/basic/variables.scss";

  .select-group {
    text-align: left;
    width: 100%;
    max-width: 230px;
    margin-right: 20px;
    position: relative;
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
      background-color: $color-white!important;
      outline: none;
      &:hover{
        cursor: pointer;
      }
    }
    .icon{
      position: absolute;
      right: 5px;
      top: 30px;
    }
    select::placeholder {
      color: $color-card-grey;
    }
  }
</style>
