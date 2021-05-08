<template>
  <v-app>
    <main>
      <ol class="categories">
        <li class="category category__work">
          <TodoCategory
            :target="categoryList.work"
            @toggle-modal="toggleModal"
            @showEditModal="showEditModal"
          ></TodoCategory>
        </li>
        <li class="category category__private">
          <TodoCategory
            :target="categoryList.private"
            @toggle-modal="toggleModal"
            @showEditModal="showEditModal"
          ></TodoCategory>
        </li>
        <li class="category category__random">
          <TodoCategory
            :target="categoryList.random"
            @toggle-modal="toggleModal"
            @showEditModal="showEditModal"
          ></TodoCategory>
        </li>
      </ol>
      <ModalVuetify
        :dialog="isShowAddModal"
        v-bind.sync="inputValues"
        @closeModal="toggleModal"
        @addTodo="addTodo"
      >
        <template #title>{{ selectedCategory }} にtodoを追加</template>
      </ModalVuetify>
      <EditModal
        :dialog="isShowEditModal"
        :selected-edit-todo="selectedEditTodo"
      ></EditModal>
    </main>
  </v-app>
</template>
<script>
// import { mapActions } from 'vuex'
export default {
  data() {
    return {
      isShowAddModal: false,
      isShowEditModal: false,
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
      },
      selectedCategory: '',
      selectedEditTodo: {
        index: '',
        type: '',
      },
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
      // こういうところでMapActionsって呼べるの？？
      this.$store.dispatch('todo/actionAddTodo', {
        category: this.selectedCategory,
        title: this.inputValues.title,
        detail: this.inputValues.detail,
      })
      this.inputValues.title = ''
      this.inputValues.detail = ''
      this.selectedCategories = ''
    },
    showEditModal(index, type) {
      console.log(index)//undifined
      console.log(type)//undifined
      this.selectedEditTodo.index = index
      this.selectedEditTodo.type = type
      this.isShowEditModal = !this.isShowEditModal
    },
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
</style>
