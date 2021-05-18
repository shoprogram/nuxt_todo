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
      v-bind.sync="inputValues"
      @closeModal="toggleModal"
      @addTodo="addTodo"
    >
      <template #title
        >{{ categoryList[selectedCategory] }} にtodoを追加</template
      >
    </Modal>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
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
    selectCategory(value) {
      this.selectedCategory = value
    },
    toggleModal(value) {
      this.selectCategory(value)
      this.isShowAddModal = !this.isShowAddModal
    },
    addTodo() {
      this.isShowAddModal = !this.isShowAddModal
      this.$store.dispatch('todo/actionAddTodo', {
        category: this.selectedCategory,
        title: this.inputValues.title,
        detail: this.inputValues.detail,
      })
      this.inputValues.title = ''
      this.inputValues.detail = ''
    },
  },
}
</script>
