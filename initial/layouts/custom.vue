<template>
  <!-- このファイルは消しておく -->
  <v-app dark>
    <v-app-bar absolute color="#BBDEFB">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>カスタムレイアウト</v-toolbar-title>
    </v-app-bar>
    <v-main class="main">
      <v-container class="main">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<style>
.main {
  padding-top: 76px;
}
</style>
