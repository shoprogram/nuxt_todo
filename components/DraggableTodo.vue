<template>
  <draggable v-model="draggableTodoList" element="ul" draggable=".todo">
    <li
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
          class="checkbox mt-0 pt-0"
          :off-icon="'mdi-checkbox-blank-circle-outline'"
          :on-icon="'mdi-check-circle-outline'"
          color="red darken-3"
          dense
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
        class="todo__menu"
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
    </li>
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
        // return [this.todoList.work, this.todoList.private, this.todoList.random]
        // const workList = this.todoList.work
        // const privateList = this.todoList.private
        // const randomList = this.todoList.random
        // const wholeList = workList.concat(privateList, randomList)
        // return wholeList
      },
      set(value) {
        this.$store.commit(
          'todo/updateDraggableList',
          {
            value,
            targetCategory: this.target.category,
          }
          // { root: true }
        )
        // this.$store.commit('todo/updateDraggableList', value)
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
  background-color: white;
  // opacity: 0.7;
  text-align: center;
  border-radius: 4px;
  width: 90%;
  display: flex;
  // width: 100%;
  margin: 6px auto 0;
  padding: 5px 0 3px 5px;
  justify-content: space-between;
  align-items: baseline;
  // text-align: center;
  &__title {
    margin-top: 0;
    display: flex;
    align-items: center;
  }
  &__edit-button {
    // padding-right: 10px;
  }
  &:hover {
  }
  &__menu {
    margin-right: 8px;
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
    width: 200%;
  }
  // text-decoration: line-through #ad343e;
}
// .notyet {
//   text-decoration: none;
// }
.checkbox {
  display: inline-block;
  margin-top: 0;
  // height: 20px;
}
.v-messages {
  display: none;
}
.input-slot {
  margin-bottom: 0;
}
</style>
