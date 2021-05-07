<template>
  <v-app>
    <main>
      <ol class="categories">
        <li class="category category__work">
          <div class="category_title">
            <label>Work</label>
            <AddButton @click="toggleModal('work')"></AddButton>
          </div>
          <div class="category_todos">
            <ul>
              <li
                v-for="(item, i) in todoList.work"
                :key="i"
                class="todo"
                @mouseover="
                  isShowEditIcon.work = true
                  currentIndex = i
                "
                @mouseleave="
                  isShowEditIcon.work = false
                  currentIndex = -1
                "
              >
                <div class="todo__title">
                  <v-icon>mdi-radiobox-blank</v-icon>
                  {{ item }}
                </div>
                <v-icon
                  v-show="isShowEditIcon.work && currentIndex === i"
                  class="todo__edit-button"
                  >mdi-lead-pencil</v-icon
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="category category__private">
          <div class="category_title">
            <label>Private</label>
            <AddButton @click="toggleModal('private')"></AddButton>
          </div>
          <div class="category_todos">
            <ul>
              <li
                v-for="(item, i) in todoList.private"
                :key="i"
                class="todo"
                @mouseover="
                  isShowEditIcon.private = true
                  currentIndex = i
                "
                @mouseleave="
                  isShowEditIcon.private = false
                  currentIndex = -1
                "
              >
                <div class="todo__title">
                  <v-icon>mdi-radiobox-blank</v-icon>
                  {{ item }}
                </div>
                <v-icon
                  v-show="isShowEditIcon.private && currentIndex === i"
                  class="todo__edit-button"
                  >mdi-lead-pencil</v-icon
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="category category__random">
          <div class="category_title">
            <label>Random Ideas</label>
            <AddButton @click="toggleModal('random')"></AddButton>
          </div>
          <div class="category_todos">
            <ul>
              <li
                v-for="(item, i) in todoList.random"
                :key="i"
                class="todo"
                @mouseover="
                  isShowEditIcon.random = true
                  currentIndex = i
                "
                @mouseleave="
                  isShowEditIcon.random = false
                  currentIndex = -1
                "
              >
                <div class="todo__title">
                  <v-icon>mdi-radiobox-blank</v-icon>
                  {{ item }}
                </div>
                <v-icon
                  v-show="isShowEditIcon.random && currentIndex === i"
                  class="todo__edit-button"
                  >mdi-lead-pencil</v-icon
                >
              </li>
            </ul>
          </div>
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
        work: 'Work',
        private: 'Private',
        random: 'Random Ideas',
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
