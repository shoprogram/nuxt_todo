<template>
  <v-container grid-list-md text-xs-center>
    <v-layout justify-center>
      <v-flex class="teal lighten-3" xs4 min-height="1000">
        <v-card class="transparent">
          <v-card-title class="brown--text">
            Work
            <v-spacer />
            <AddButton @click="toggleModal('work')"></AddButton>
          </v-card-title>
          <v-list class="transparent">
            <v-list-item
              v-for="(item, i) in todoList.work"
              :key="i"
              class="black--text"
            >
              <v-icon>mdi-radiobox-blank</v-icon>
              {{ item.todo }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex class="yellow lighten-4 ml-5" xs4>
        <v-card class="transparent">
          <v-card-title class="brown--text">
            Private
            <v-spacer />
            <AddButton @click="toggleModal('private')"></AddButton>
          </v-card-title>
          <v-list class="transparent">
            <v-list-item
              v-for="(item, i) in todoList.private"
              :key="i"
              class="black--text"
            >
              <v-icon>mdi-radiobox-blank</v-icon>
              {{ item.todo }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex class="red lighten-3 ml-5" xs4>
        <v-card class="transparent">
          <v-card-title class="brown--text">
            Random Ideas
            <v-spacer />
            <AddButton @click="toggleModal('random')"></AddButton>
          </v-card-title>
          <v-list class="transparent">
            <v-list-item
              v-for="(item, i) in todoList.random"
              :key="i"
              class="black--text"
            >
              <v-icon>mdi-radiobox-blank</v-icon>
              {{ item.todo }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <Modal
      :dialog="isShowAddModal"
      :input-value="inputValue"
      @closeModal="toggleModal"
      @addTodo="addTodo"
      @input="updateAddTodoTitle"
      @passValue="updateInputValue"
    >
      <template #title
        >{{ categoryList[selectedCategory] }} にtodoを追加</template
      >
    </Modal>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      addTodoTitle: '',
      inputValue: '',
      // todos: {
      //   work: [],
      //   private: [],
      //   random: [],
      // },
      isShowAddModal: false,
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
    selectCategory(value) {
      this.selectedCategory = value
    },
    toggleModal(value) {
      this.selectCategory(value)
      this.isShowAddModal = !this.isShowAddModal
      // console.log(this.isShowAddModal)
    },
    addTodo() {
      this.isShowAddModal = !this.isShowAddModal
      this.$store.dispatch('todo/addTodo', {
        category: this.selectedCategory,
        todo: this.addTodoTitle,
      })
      // this.todos[this.selectedCategory].push({
      //   id: this.todos[this.selectedCategory].length + 1,
      //   todo: this.addTodoTitle,
      // })
      this.inputValue = ''
    },
    updateAddTodoTitle(value) {
      this.addTodoTitle = value
    },
    updateInputValue(value) {
      this.inputValue = value
    },
  },
}
</script>
