<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Choose your contract</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12>
                <BaseSelect :listOptions="userData.data" @change="change" emitToStart/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="saveContract">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="saveContract">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import BaseSelect from '@/shared/components/BaseSelect.vue';

@Component({
  name: 'Modal',
  components: {
    BaseSelect,
  },
})
export default class Modal extends Vue {
  @State('userData') private userData: any;
  @Action('getLatestUpdates') private getLatestUpdates: any;

  private dialog: boolean = true;
  private contract: any = {};

  private change(val: any): void {
    this.contract = val;
  }

  private saveContract(): void {
    localStorage.setItem('contract_id', this.contract.contract_id);
    localStorage.setItem('jwt', this.userData.jwt);
    this.dialog = false;
    this.$router.push('/updates');
  }
}
</script>
