<template>
  <v-dialog
    :value="dialog"
    width="700px"
    height="800px"
    @click:outside="$emit('closeEditModal')"
  >
    <v-card class="edit-modal__wrapper">
      <div class="edit-modal__title">
        <v-icon>mdi-clipboard-edit-outline</v-icon>
        <v-text-field
          :value="title"
          required
          class="ml-5"
          @input="$emit('update:title', $event)"
        ></v-text-field>
      </div>
      <div class="edit-modal__editor">
        <div class="edit-modal__editor--title">
          <v-icon>mdi-text</v-icon>
          <p>説明</p>
        </div>
        <v-textarea
          :value="detail"
          class="pl-10 mt-12"
          height="50px"
          no-resize
          @input="$emit('update:detail', $event)"
        ></v-textarea>
      </div>
      <v-card-actions class="mt-8">
        <v-spacer></v-spacer>
        <v-btn color="blue lighten-3" text @click="$emit('closeEditModal')"
          >Close
        </v-btn>
        <v-btn color="blue lighten-3" text @click="$emit('updateTodo')"
          >Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
    },
    id: {
      type: Number,
      default: null,
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
}
</script>

<style lang="scss">
.row {
  margin-left: 25px;
}
.edit-modal {
  &__wrapper {
    padding: 20px 40px 20px 25px;
  }
  &__title {
    display: flex;
  }
  &__editor {
    &--title {
      display: flex;
      margin-top: 10px;
      & > p {
        margin-bottom: 0;
        margin-left: 20px;
      }
    }
  }
}
</style>
