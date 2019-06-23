<template>
  <div class="footer">
    <v-container class="footer-content">
      {{ $t("common.footer.text") }} {{currentYear}}
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
</script>

<style scoped lang="scss">
  @import "~@/styles/basic/variables.scss";

  .footer {
    width: 100%;
    height: 40px;
    background-color: $color-secondary-grey;
    .footer-content {
      padding: 10px 24px;
      text-align: center;
    }
  }
</style>
