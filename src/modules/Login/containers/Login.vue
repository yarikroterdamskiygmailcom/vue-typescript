<template>
  <v-container d-flex justify-center align-center>
    <div class="login-wrap">
      <div class="image">
        <img src="../../../assets/images/macbook-hand.png">
      </div>
      <h3>{{ $t("login.title") }}</h3>
      <p>{{ $t("login.description") }}</p>
      <div class="btn-wrap">
        <v-btn class="btn-primary" href="https://digdis.de/en/company/">{{ $t("login.learn_more") }}</v-btn>
        <v-btn class="btn-green" href="https://digdis.de/">
          <v-icon class="icon">person</v-icon>
          {{ $t("login.login") }}
        </v-btn>
      </div>
    </div>
    <Modal v-if="this.userData && this.userData.data && this.userData.data.length && !this.userData.isAdmin"/>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { State, Action } from 'vuex-class';

  import Modal from '@/shared/components/Modal.vue';

  @Component({
    name: 'Login',
    components: {
      Modal,
    },
  })
  export default class Login extends Vue {
    @State('userData') private userData: any;
  }
</script>

<style lang="scss">
  @import "~@/styles/basic/variables";
  @import "~@/styles/basic/buttons";

  .login-wrap {
    background-color: $color-white;
    max-width: 745px;
    width: 100%;
    margin: 0 auto;
    border: solid 1px $color-card-grey;
    padding: 30px 120px;
    border-radius: 3px;
    p {
      margin-top: 30px;
    }
    .btn-wrap {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
