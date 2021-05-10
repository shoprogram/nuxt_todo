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
  // align-items: flex-end;
  padding-bottom: 7px;
  //↑なんで入らないの？
  &:hover {
    background-color: rgba(255, 255, 255, 0.3) !important;
  }
  & span {
    margin-left: 4px;
  }
}
</style>
