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
            <v-list-item v-for="(item, i) in work" :key="i" class="black--text">
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
            <v-list-item v-for="(item, i) in work" :key="i" class="black--text">
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
            <v-list-item v-for="(item, i) in work" :key="i" class="black--text">
              <v-icon>mdi-radiobox-blank</v-icon>
              {{ item.todo }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <Modal
      :dialog="isShowAddModal"
      @closeModal="toggleModal"
      @addTodo="addTodo"
      @input="updateAddTodoTitle"
    >
      <template #title>{{ selectedCategory }} にtodoを追加</template>
    </Modal>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      addTodoTitle: '',
      work: [
        {
          id: '1',
          todo: 'PCを立ち上げる',
        },
        {
          id: '2',
          todo: 'PCにお茶をこぼす',
        },
        {
          id: '3',
          todo: 'PCをふく',
        },
      ],
      isShowAddModal: false,
      categoryList: {
        work: 'Work',
        private: 'Private',
        random: 'Random Ideas',
      },
      selectedCategory: '',
    }
  },
  methods: {
    selectCategory(value) {
      this.selectedCategory = this.categoryList[value]
    },
    toggleModal(value) {
      this.selectCategory(value)
      this.isShowAddModal = !this.isShowAddModal
      // console.log(this.isShowAddModal)
    },
    addTodo() {
      this.isShowAddModal = !this.isShowAddModal
      this.work.push({
        id: this.work.length + 1,
        todo: this.addTodoTitle,
      })
    },
    updateAddTodoTitle(value) {
      this.addTodoTitle = value
    },
  },
}
</script>
