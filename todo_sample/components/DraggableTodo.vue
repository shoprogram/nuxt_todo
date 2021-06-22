<template>
  <draggable
    v-model="draggableTodoList"
    element="ul"
    draggable=".todo"
    group="todos"
  >
    <li
      v-for="(item, i) in draggableTodoList"
      :key="i"
      class="todo"
      @mouseover="
        isShowEditIcon[targetCategory] = true
        currentid = i
      "
      @mouseleave="
        isShowEditIcon[targetCategory] = false
        currentid = -1
      "
    >
      <div class="todo__title">
        <span @click="$emit('finishedTodo', item)">
          <v-checkbox
            :value="item.isFinished"
            readonly
            :false-value="0"
            :true-value="1"
            :input-value="item.isFinished"
            class="checkbox mt-0 pt-0"
            :off-icon="'mdi-checkbox-blank-circle-outline'"
            :on-icon="'mdi-check-circle-outline'"
            color="red darken-3"
            dense
          ></v-checkbox>
        </span>
        <label :class="{ finished: checkFinished(item) }">{{
          item.title
        }}</label>
      </div>

      <div
        v-show="isShowEditIcon[item.category] && currentid === i"
        class="todo__menu"
      >
        <div class="edit-button" @click="$emit('showEditModal', item)">
          <v-icon class="todo__edit-button">mdi-lead-pencil</v-icon>
        </div>
        <div class="delete-button" @click="$emit('showDeleteModal', item)">
          <v-icon class="todo__edit-button">mdi-delete</v-icon>
        </div>
      </div>
    </li>
  </draggable>
</template>

<script>
export default {
  props: {
    listWork: {
      type: Array,
    },
    listPrivate: {
      type: Array,
    },
    listRandom: {
      type: Array,
    },
    isFilterUnfinishedChecked: {
      type: Boolean,
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
    draggableTodoList: {
      get() {
        const listPassed = []
        if (this.listWork) {
          this.listWork.forEach((todo, i) => {
            listPassed.push(todo)
            this.targetCategory = 'work'
          })
        } else if (this.listPrivate) {
          this.listPrivate.forEach((todo, i) => {
            listPassed.push(todo)
            this.targetCategory = 'private'
          })
        } else if (this.listRandom) {
          this.listRandom.forEach((todo, i) => {
            listPassed.push(todo)
            this.targetCategory = 'random'
          })
        }
        if (this.isFilterUnfinishedChecked) {
          return this.hideFinished(listPassed)
        }
        return listPassed
      },
      set(value) {
        this.$emit('update:listWork', value)
        this.$emit('update:listPrivate', value)
        this.$emit('update:listRandom', value)
      },
    },
  },
  methods: {
    checkFinished(target) {
      return target.isFinished
    },
    hideFinished(array) {
      const filteredTodo = []
      array.forEach((val, i) => {
        if (!val.isFinished) {
          filteredTodo.push(val)
        }
      })
      return filteredTodo
    },
  },
}
</script>

<style lang="scss">
.todo {
  background-color: white;
  text-align: center;
  border-radius: 4px;
  width: 90%;
  display: flex;
  margin: 6px auto 0;
  padding: 5px 0 3px 5px;
  justify-content: space-between;
  align-items: baseline;
  &__title {
    margin-top: 0;
    max-width: 169px;
    display: flex;
    align-items: center;
    text-align: left;
    &label {
      word-wrap: break-word;
      margin: 0 0.4em;
    }
  }
  &__menu {
    margin-right: 6px;
  }
}
.edit-button,
.delete-button {
  display: inline-block;
  margin-left: 0;
  cursor: pointer;
}
.finished {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: line-through;
  text-decoration-color: #c62828;
  text-decoration-style: initial;
  text-decoration-thickness: 15%;
}

.checkbox {
  display: inline-block;
  margin-top: 0;
}
.v-messages {
  display: none;
}
.input-slot {
  margin-bottom: 0;
}
</style>
