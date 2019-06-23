<template>
  <v-btn class="btn-green" :disabled="disabled" :to="routeTo">
    <v-icon class="icon">person</v-icon>
    <slot/>
  </v-btn>
</template>

<script>
  export default {
    name: 'BtnGreen',
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