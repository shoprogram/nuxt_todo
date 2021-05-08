<template>
  <v-app id="modal">
    <v-dialog
      :value="dialog"
      width="700px"
      height="800px"
      @click:outside="emittedToggleModal"
    >
      <v-card class="edit-modal__wrapper">
        <div class="edit-modal__title">
          <v-icon>mdi-clipboard-edit-outline</v-icon>
          <v-text-field
            required
            placeholder="title"
            class="ml-5"
            :value="editedTitle"
          >
          </v-text-field>
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
            placeholder="detail"
            no-resize
          ></v-textarea>
        </div>
        <v-card-actions class="mt-8">
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-3" text>Close </v-btn>
          <v-btn color="blue lighten-3" text>Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
    },
    selectedEditTodo: {
      type: Object,
      // indexとtype(workなどが入ってる)
    },
  },
  data() {
    return {
      editedTitle: this.getTodoTitle,
    }
  },
  computed: {
    // storeからtodoListとってtypeで絞る
    selectedTodoList() {
      console.log(this.selectedEditTodo)
      return this.$store.state.todo.todoList
      // return this.$store.state.todo.todoList[this.selectedEditTodo.type]
    },
    // typeの中からinde番号のtodoを取得
    // getTodoTitle() {
    //   return this.selectedTodoList[this.seletedEditTodo.index]
    // },
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
