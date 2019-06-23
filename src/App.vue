<template>
  <v-app id="app">
    <Header v-if="(userData && userData.jwt)"/>

    <!-- Error container -->
    <v-container v-if="(error) ? true : false">
      <v-alert type="error" v-model="error">{{error.Message}}</v-alert>
    </v-container>
    <!-- End Error container -->

    <!-- Router -->
    <router-view />
    <!-- End Router -->

    <BtnHelp><v-icon class="icon">mode_comment</v-icon>{{ $t("common.help") }}</BtnHelp>

    <!-- <Footer /> -->
  </v-app>
</template>

<script lang="ts">
  import {State} from 'vuex-class';
  import {Component, Vue, Watch} from 'vue-property-decorator';

  import Header from '@/shared/components/Header.vue';
  import Footer from '@/shared/components/Footer.vue';
  import BtnHelp from '@/shared/components/BtnHelp.vue';


  @Component({
    name: 'Home',
    components: {
      Header,
      Footer,
      BtnHelp,
    },
  })
  export default class Home extends Vue {
    @State('error') private error: any;
    @State('userData') private userData: any;
  }
</script>

<style lang="scss">
  @import '~@/styles/index';
  
  #app {
    font-family: 'Roboto-Regular', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #2c3e50;
    height: 100%;
    background-color: $color-background;
  }
</style>
