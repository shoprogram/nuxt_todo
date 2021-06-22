<template>
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
          :value="title"
          required
          label="タイトル"
          class="px-5"
          @input="$emit('update:title', $event)"
        >
        </v-text-field>
        <v-textarea
          :value="detail"
          class="px-5 mt-10"
          height="50px"
          label="説明"
          no-resize
          @input="$emit('update:detail', $event)"
        ></v-textarea>
        <v-card-actions class="mt-8">
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
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
    },
    title: {
      type: String,
      default: '',
    },
    detail: {
      type: String,
      default: '',
    },
  },
  methods: {
    emittedToggleModal() {
      this.$emit('closeModal')
    },
  },
}
</script>
