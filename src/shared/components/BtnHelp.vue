<template>
  <v-btn round class="btn-help" @click="openLink()">
    <slot/>
  </v-btn>
</template>

<script>

export default {
  name: 'BtnHelp',
  methods: {
    openLink() {
      window.open(
        'https://docs.google.com/forms/d/e/1FAIpQLSctRILERRgdEMeqWObCqeQxKuPhyV6Wpmf6Uor8-D9IWTfkEA/viewform',
      );
    },
  },
};
</script>