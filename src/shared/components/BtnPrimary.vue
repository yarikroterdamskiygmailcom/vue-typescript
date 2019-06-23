<template>
  <v-btn class="btn-primary" :disabled="disabled" :to="routeTo">
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
      routeTo: {
        type: String,
        default: false,
      },
    },
  };
</script>