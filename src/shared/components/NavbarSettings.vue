<template>
  <div class="navbar-settings ml-3">
    <a class="user active">
      <v-icon class="icon">person</v-icon>
    </a>
    <a class="ml-3">
      <v-icon class="icon">contact_mail</v-icon>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'NavbarSettings',
  };
</script>

<style scoped lang="scss">
  @import "~@/styles/basic/variables.scss";

  .navbar-settings {
    max-width: 70px;
    .icon {
      cursor: pointer;
      color: $color-text-gray;
      font-size: 15px;
    }
    .user {
      position: relative;
    }
    .user.active {
      &:after {
        position: absolute;
        content: "";
        top: 0;
        right: -2px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: $color-error;
      }
    }
  }
</style>
