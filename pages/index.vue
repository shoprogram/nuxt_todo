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
      <AddModal
        :dialog="isShowAddModal"
        v-bind.sync="inputValues"
        @closeModal="toggleModal"
        @addTodo="addTodo"
      >
        <template #title>{{ selectedCategory }} にtodoを追加</template>
      </AddModal>
      <EditModal
        :dialog="isShowEditModal"
        :v-bind.sync="selectedEditTodo"
        @closeEditModal="closeEditModal"
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
          category: 'work',
          displayName: 'Work',
        },
        private: {
          category: 'private',
          displayName: 'Private',
        },
        random: {
          category: 'random',
          displayName: 'Random',
        },
      },
      selectedCategory: '',
      selectedEditTodo: {
        index: null,
        category: '',
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
    showEditModal({ index, category }) {
      this.selectedEditTodo.index = index
      this.selectedEditTodo.category = category
      this.isShowEditModal = !this.isShowEditModal
    },
    closeEditModal() {
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
