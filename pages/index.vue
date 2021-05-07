<template>
  <v-app>
    <main>
      <ol class="categories">
        <li class="category category__work">
          <TodoCategory
            :target="categoryList.work"
            @toggle-modal="toggleModal"
          ></TodoCategory>
        </li>
        <li class="category category__private">
          <TodoCategory
            :target="categoryList.private"
            @toggle-modal="toggleModal"
          ></TodoCategory>
        </li>
        <li class="category category__random">
          <TodoCategory
            :target="categoryList.random"
            @toggle-modal="toggleModal"
          ></TodoCategory>
        </li>
      </ol>
      <ModalVuetify
        :dialog="isShowAddModal"
        v-bind.sync="inputValues"
        @closeModal="toggleModal"
        @addTodo="addTodo"
      >
        <!-- :title.sync="inputValues.title"
      :detail.sync="inputValues.detail" -->
        <template #title
          >{{ categoryList[selectedCategory] }} にtodoを追加</template
        >
      </ModalVuetify>
    </main>
  </v-app>
</template>
<script>
// import { mapActions } from 'vuex'
export default {
  data() {
    return {
      // addTodoTitle: '',
      isShowAddModal: false,
      currentIndex: -1,
      isShowEditIcon: {
        work: false,
        private: false,
        random: false,
      },
      inputValues: {
        title: '',
        detail: '',
      },
      categoryList: {
        work: {
          type: 'work',
          displayName: 'Work',
        },
        private: {
          type: 'private',
          displayName: 'Private',
        },
        random: {
          type: 'random',
          displayName: 'Random',
      },
      selectedCategory: '',
    }
  },
  computed: {
    todoList() {
      return this.$store.state.todo.todoList
    },
  },
  methods: {
    // ...mapActions('actionAddTodo'),
    selectCategory(value) {
      this.selectedCategory = value
    },
    toggleModal(value) {
      this.selectCategory(value)
      this.isShowAddModal = !this.isShowAddModal
    },
    addTodo() {
      this.isShowAddModal = !this.isShowAddModal
      // this.actionAddTodo({
      //   category: this.selectedCategory,
      //   todo: this.addTodoTitle,
      // })MapActionが呼べない？？
      this.$store.dispatch('todo/actionAddTodo', {
        category: this.selectedCategory,
        title: this.inputValues.title,
        detail: this.inputValues.detail,
      })
      // console.log(this.inputValues)
      this.inputValues.title = ''
      this.inputValues.detail = ''
    },
    // showEditIcon() {
    //   this.isShowEditIcon = true
    // },
    // hideEditIcon() {
    //   this.isShowEditIcon = false
    // },
    // updateAddTodoTitle(value) {
    //   this.addTodoTitle = value
    // },
    // updateInputTitle(value) {
    //   this.inputTitle = value
    // },
  },
}
</script>
<style lang="scss">
ul,
ol {
  list-style: none;
}
.categories {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.category {
  width: 31%;
  padding: 50px, 10px;
  &__work {
    background-color: #c9b966;
  }
  &__private {
    background-color: #d3ad97;
  }
  &__random {
    background-color: #d6cea2;
  }
}
.edit-button {
}
.todo {
  display: flex;
  width: 100%;
  padding: 15px 10px;
  justify-content: space-between;
  &__title {
  }
  &__edit-button {
    padding-right: 10px;
  }
  &:hover {
  }
}
</style>
