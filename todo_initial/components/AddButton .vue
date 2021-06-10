<template>
  <v-btn
    class="button__add"
    color="transparent"
    elevation="0"
    block
    depressed
    elevation-0
    @click="$emit('click')"
  >
    <v-icon>mdi-plus</v-icon>
    <span>Todoを追加する</span>
  </v-btn>
</template>
<style lang="scss">
.button__add {
  font-weight: 500;
  padding-bottom: 7px;
  transition: all 300ms 0s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3) !important;
    // transition: background-color 200ms 0s linear;
  }
  & span {
    margin-left: 4px;
  }
}
</style>
