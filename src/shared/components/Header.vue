<template>
  <div class="header">
    <v-container justify-space-between>
      <v-layout row wrap>
        <v-flex class="left-block" d-flex xs7 sm3 md3>
          <!-- <Logo :disabled="(userData !== null) ? false: true"/> -->
          <ul class="nav_menu" v-if="userData !== null">
            <li v-if="userData.jwt">
              <v-btn flat class="chart-link" :to="{ name: 'updates'}">{{ $t("updates.title") }}</v-btn>
            </li>
            <li v-if="userData.jwt">
              <v-btn
                flat
                class="chart-link"
                :to="{ name: 'products'}"
              >{{ $t("common.header.products_link") }}</v-btn>
            </li>
            <li v-if="userData.isAdmin">
              <v-menu open-on-hover bottom offset-y>
                <v-btn class="chart-link" slot="activator" flat>Admin</v-btn>
                <v-list>
                  <v-list-tile class="dropdowm-navi">
                    <v-list-tile-title>
                      <router-link class="chart-link" :to="{ name: 'charthit'}">Chart Hits</router-link>
                    </v-list-tile-title>
                    <v-list-tile-title>
                      <router-link class="chart-link" :to="{ name: 'chartlist'}">Chart List</router-link>
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </li>
          </ul>
        </v-flex>
        <!-- <v-flex class="right" d-flex justify-end align-center xs5 sm9 md9>
          <select class="lang-select" v-model="$i18n.locale" @change.prevent="setLangLocal($i18n.locale)">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
          </select>
          <NavbarSettings v-if="userData !== null"/>
        </v-flex>-->
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';

import Logo from '@/shared/components/Logo.vue';
import NavbarSettings from '@/shared/components/NavbarSettings.vue';

@Component({
  components: {
    Logo,
    // NavbarSettings
  },
})
export default class Header extends Vue {
  @State('userData') private userData: any;

  private name: 'locale-changer';
  public data() {
    return {
      langs: ['de', 'en'],
    };
  }

  private setLangLocal(lang: any) {
    localStorage.setItem('language', lang);
    location.reload();
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/basic/variables.scss";

.header {
  width: 100%;
  //height: 80px;
  height: 40px;
  //background-color: $color-primary;
  background-color: white;
  .nav_menu {
    list-style: none;
    display: flex;
    align-items: center;
    li {
      padding:0;
      a {
        //text-transform: uppercase;
        text-decoration: none;
        padding: 20px 15px;
      }
      &:hover {
        background-color: $color-background;
      }
    }
  }
  .chart-link {
    //color: $color-white!important;
    color: $color-text-gray !important;
    //max-width: 100px;
    //font-weight: 600;
    font-weight: 400;
    height: 40px;
    //font-size: 16px;
    font-size: 13px !important;
    text-transform: none;
    margin: 0;
  }
  .lang-select {
    //color: white;
    color: $color-text-gray;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 16px;
    max-width: 42px;
    outline: none;
    padding: 0 10px;
    //background-color: #80c0d8;
    background-color: white;
    margin-top: 3px;
    cursor: pointer;
    option {
      //color: $color-white;
      color: $color-text-gray;
      font-size: 14px;
      &:hover {
        color: $color-primary;
        background-color: transparent;
      }
    }
  }
}
</style>
