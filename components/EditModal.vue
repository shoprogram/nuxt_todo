<template>
  <v-app id="modal">
    <v-dialog
      :value="dialog"
      width="700px"
      height="800px"
      @click:outside="$emit('closeEditModal')"
    >
      <v-card class="edit-modal__wrapper">
        <div class="edit-modal__title">
          <v-icon>mdi-clipboard-edit-outline</v-icon>
          <v-text-field :value="editedTitle" required class="ml-5">
          </v-text-field>
        </div>
        <div class="edit-modal__editor">
          <div class="edit-modal__editor--title">
            <v-icon>mdi-text</v-icon>
            <p>説明</p>
          </div>
          <v-textarea
            :value="editedDetail"
            class="pl-10 mt-12"
            height="50px"
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
    index: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: 'todo111',
    },
    // selectedEditTodo: {
    //   type: Object,
    // },
  },
  data() {
    return {
      editedTitle: this.getTodoTitle || '',
      editedDetail: this.getTodoDetail || '',
    }
  },
  computed: {
    // storeからtodoListとってtypeで絞る
    selectedTodoList() {
      // return this.$store.state.todo.todoList
      console.log('List')
      return this.$store.state.todo.todoList[this.category]
    },
    // categoryに当てはまるtodolistの中からindex番号のtodoを取得
    getTodoTitle() {
      console.log('before')
      if (!this.index) return
      console.log(this.selectedTodoList[this.index].title)
      return this.selectedTodoList[this.index].title
    },
    getTodoDetail() {
      if (!this.index) return
      return this.selectedTodoList[this.index].detail
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
