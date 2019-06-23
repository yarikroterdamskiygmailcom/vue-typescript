<template>
  <div class="logo">
    <img src="../../assets/images/logo.png" v-if="disabled"/>
    <router-link :to="{name: 'updates'}" v-else>
      <img src="../../assets/images/logo.png"/>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style scoped lang="scss">
  .logo {
    max-width: 100px;
    height: 30px;   
  }
</style>
