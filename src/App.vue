<template>
  <div id="app">
    <v-app>
      <v-app-bar app dark color="primary" elevation="0">
        <v-toolbar-title>SocVue</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>
      <v-content>
        <v-container grid-list-md text-xs-center>
          <v-row class="fill-height">
            <v-col>
              <transition name="fade">
                <router-view></router-view>
              </transition>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
export default {
  data: () => {
    return {};
  },
};
</script>
<style lang="scss">
</style>
