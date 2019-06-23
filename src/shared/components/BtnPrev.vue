<template>
  <v-btn class="btn-prev" :disabled="disabled" v-on:click="$router.back()">
    <v-icon class="icon">arrow_back</v-icon>
    <slot/>
  </v-btn>
</template>

<script>
  export default {
    name: 'BtnPrimary',
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>