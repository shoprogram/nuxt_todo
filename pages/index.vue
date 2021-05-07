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
              {{ item }}
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
              {{ item }}
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
              {{ item }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <Modal
      :dialog="isShowAddModal"
      :title.sync="inputValues.title"
      :detail.sync="inputValues.detail"
      @closeModal="toggleModal"
      @addTodo="addTodo"
    >
      <!-- @input="updateAddTodoTitle" -->
      <!-- @passTitle="updateInputTitle" -->
      <!-- v-bind.sync="inputValues" -->
      <template #title
        >{{ categoryList[selectedCategory] }} にtodoを追加</template
      >
    </Modal>
  </v-container>
</template>
<script>
// import { mapActions } from 'vuex'
export default {
  data() {
    return {
      // addTodoTitle: '',
      isShowAddModal: false,
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
    // updateAddTodoTitle(value) {
    //   this.addTodoTitle = value
    // },
    // updateInputTitle(value) {
    //   this.inputTitle = value
    // },
  },
}
</script>
