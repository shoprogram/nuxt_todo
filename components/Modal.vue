<template>
  <v-app id="modal">
    <v-row justify="center">
      <v-dialog v-show="true" :dialog="dialog" width="600px" height="600px">
        <v-card>
          <v-card-title>
            <slot name="title"></slot>
          </v-card-title>
          <v-text-field required></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue lighten-3" text @click="$emit('closeModal')"
              >Close
            </v-btn>
            <v-btn color="blue lighten-3" text @click="$emit('closeModal')"
              >Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
    },
  },
  watch: {
    dialog(v) {
      console.log(v)
    },
  },
}
</script>
