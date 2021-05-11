<template>
  <v-app>
    <main>
      <ol class="categories">
        <li class="category category__work">
          <TodoCategory
            :target="categoryList.work"
            @toggle-modal="toggleModal"
            @showEditModal="showEditModal"
            @finishedTodo="finishedTodo"
            @showDeleteModal="showDeleteModal"
          ></TodoCategory>
        </li>
        <li class="category category__private">
          <TodoCategory
            :target="categoryList.private"
            @toggle-modal="toggleModal"
            @showEditModal="showEditModal"
            @finishedTodo="finishedTodo"
            @showDeleteModal="showDeleteModal"
          ></TodoCategory>
        </li>
        <li class="category category__random">
          <TodoCategory
            :target="categoryList.random"
            @toggle-modal="toggleModal"
            @showEditModal="showEditModal"
            @finishedTodo="finishedTodo"
            @showDeleteModal="showDeleteModal"
          ></TodoCategory>
        </li>
      </ol>
      <AddModal
        :dialog="isShowAddModal"
        v-bind.sync="inputValues"
        @closeModal="toggleModal"
        @addTodo="addTodo"
      >
        <template #title>{{ selectedAddCategory }} にtodoを追加</template>
      </AddModal>
      <EditModal
        :dialog="isShowEditModal"
        v-bind.sync="selectedTodo"
        @closeEditModal="closeEditModal"
        @updateTodo="updateTodo"
      ></EditModal>
      <DeleteModal
        :dialog="isShowDeleteModal"
        v-bind.sync="selectedTodo"
        @closeDeleteModal="closeDeleteModal"
      ></DeleteModal>
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
      isShowDeleteModal: false,
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
      selectedAddCategory: '',
      selectedTodo: {
        index: null,
        title: '',
        detail: '',
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
    selectAddCategory(value) {
      this.selectedAddCategory = value
    },
    toggleModal(value) {
      this.selectAddCategory(value)
      this.isShowAddModal = !this.isShowAddModal
    },
    addTodo() {
      this.isShowAddModal = !this.isShowAddModal
      // こういうところでMapActionsって呼べるの？？
      this.$store.dispatch('todo/actionAddTodo', {
        category: this.selectedAddCategory,
        title: this.inputValues.title,
        detail: this.inputValues.detail,
      })
      this.inputValues.title = ''
      this.inputValues.detail = ''
      this.selectedCategories = ''
    },
    showEditModal({ index, category }) {
      this.selectedTodo.index = index
      const editCategory = this.todoList[category]
      this.selectedTodo.category = category
      this.selectedTodo.title = editCategory[index].title
      this.selectedTodo.detail = editCategory[index].detail
      this.isShowEditModal = !this.isShowEditModal
    },
    closeEditModal() {
      this.isShowEditModal = !this.isShowEditModal
      this.selectedTodo.title = ''
      this.selectedTodo.detail = ''
      this.selectedTodo.category = ''
    },
    updateTodo() {
      console.log(this.selectedTodo.title)
      this.isShowEditModal = !this.isShowEditModal
      this.$store.dispatch('todo/actionUpdateTodo', this.selectedTodo)
      this.selectedTodo.title = ''
      this.selectedTodo.detail = ''
      this.selectedTodo.category = ''
    },
    finishedTodo(payload) {
      this.$store.dispatch('todo/actionFinishedTodo', payload)
    },
    showDeleteModal({ index, category }) {
      this.isShowDeleteModal = !this.isShowDeleteModal
      this.selectedTodo.index = index
      const deleteCategory = this.todoList[category]
      this.selectedTodo.category = category
      this.selectedTodo.title = deleteCategory[index].title
      this.selectedTodo.detail = deleteCategory[index].detail
      // data baseもらうまで待っとく？
    },
    closeDeleteModal() {
      this.isShowDeleteModal = !this.isShowDeleteModal
      this.selectedTodo.title = ''
      this.selectedTodo.detail = ''
      this.selectedTodo.category = ''
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
  align-items: start;
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
