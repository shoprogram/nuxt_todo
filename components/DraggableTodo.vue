<template>
  <draggable v-model="draggableTodoList" draggable=".todo">
    <div
      v-for="(item, i) in draggableTodoList"
      :key="i"
      class="todo"
      @mouseover="
        isShowEditIcon[target.category] = true
        currentIndex = i
      "
      @mouseleave="
        isShowEditIcon[target.category] = false
        currentIndex = -1
      "
    >
      <div class="todo__title">
        <v-checkbox
          class="checkbox"
          :off-icon="'mdi-checkbox-blank-circle-outline'"
          :on-icon="'mdi-check-circle-outline'"
          color="red darken-3"
          @click="
            $emit('finishedTodo', {
              index: i,
              category: target.category,
            })
          "
        ></v-checkbox>
        <label :class="{ finished: checkFinished(item) }">{{
          item.title
        }}</label>
      </div>

      <div
        v-show="isShowEditIcon[target.category] && currentIndex === i"
        class="todo-menu"
      >
        <div
          class="edit-button"
          @click="
            $emit('showEditModal', {
              index: i,
              category: target.category,
            })
          "
        >
          <v-icon class="todo__edit-button">mdi-lead-pencil</v-icon>
        </div>
        <div
          class="delete-button"
          @click="
            $emit('showDeleteModal', {
              index: i,
              category: target.category,
            })
          "
        >
          <v-icon class="todo__edit-button">mdi-delete</v-icon>
        </div>
      </div>
    </div>
  </draggable>
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
      targetTodo: '',
    }
  },
  computed: {
    todoList() {
      return this.$store.state.todo.todoList
    },
    draggableTodoList: {
      get() {
        return this.todoList[this.target.category]
      },
      set(value) {
        console.log(value)
        this.$store.commit(
          'todo/updateDraggableList',
          {
            value,
            targetCategory: this.target.category,
          }
          // { root: true }
        )
      },
    },
  },
  methods: {
    checkFinished(target) {
      return target.isFinished
    },
  },
}
</script>

<style lang="scss">
.todo {
  display: flex;
  width: 100%;
  padding: 6px 10px;
  justify-content: space-between;
  align-items: flex-end;
  // text-align: center;
  &__title {
    margin-top: 0;
  }
  &__edit-button {
    // padding-right: 10px;
  }
  &:hover {
  }
}
.edit-button,
.delete-button {
  display: inline-block;
  margin-left: 0;
}
.finished {
  position: relative;
  &::before {
    position: absolute;
    top: 0.5em;
    left: -0.3em;
    content: '';
    border: 2px solid #ad343e;
    width: 120%;
  }
  // text-decoration: line-through #ad343e;
}
.notyet {
  text-decoration: none;
}
.checkbox {
  display: inline-block;
  margin-top: 0;
  // height: 20px;
}
</style>
