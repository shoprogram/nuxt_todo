<template>
  <div class="category_todos">
    <ul>
      <li
        v-for="(item, i) in todoList[target.type]"
        :key="i"
        class="todo"
        @mouseover="
          isShowEditIcon[target.type] = true
          currentIndex = i
        "
        @mouseleave="
          isShowEditIcon[target.type] = false
          currentIndex = -1
        "
      >
        <div class="todo__title">
          <v-icon>mdi-radiobox-blank</v-icon>
          {{ item }}
        </div>
        <v-icon
          v-show="isShowEditIcon[target.type] && currentIndex === i"
          class="todo__edit-button"
          >mdi-lead-pencil</v-icon
        >
        <v-icon
          v-show="isShowEditIcon[target.type] && currentIndex === i"
          class="todo__edit-button"
          >mdi-delete</v-icon
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    target: {
      type: Object,
    },
  },
  data() {
    return {
      currentIndex: -1,
      isShowEditIcon: {
        work: false,
        private: false,
        random: false,
      },
    }
  },
  computed: {
    todoList() {
      return this.$store.state.todo.todoList
    },
  },
}
</script>
