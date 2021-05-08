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
          {{ item.title }}
        </div>
        <div
          @click="
            $emit('showEditModal', { index: i, type: todoList[target.type] })
          "
        >
          <v-icon
            v-show="isShowEditIcon[target.type] && currentIndex === i"
            class="todo__edit-button"
            >mdi-lead-pencil</v-icon
          >
        </div>
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

<style lang="scss">
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
