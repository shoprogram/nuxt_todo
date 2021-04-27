<template>
  <v-app id="modal">
    <v-row justify="center">
      <v-dialog
        :value="dialog"
        width="600px"
        height="600px"
        @click:outside="emittedToggleModal"
      >
        <v-card>
          <v-card-title>
            <slot name="title"></slot>
          </v-card-title>
          <v-text-field
            required
            label="title"
            class="px-5"
            :value="inputValue"
            @change="$emit('passValue', $event)"
            @input="$emit('input', $event)"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue lighten-3" text @click="emittedToggleModal"
              >Close
            </v-btn>
            <v-btn color="blue lighten-3" text @click="$emit('addTodo')"
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
    inputValue: {
      type: String,
    },
    addTodoTitle: {
      type: String,
    },
  },
  methods: {
    emittedToggleModal() {
      this.$emit('closeModal')
    },
  },
}
</script>
