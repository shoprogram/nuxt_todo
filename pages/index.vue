<template>
  <main>
    <div class="filter-bar">
      <div class="filter-bar__checkbox">
        <v-checkbox
          class="filter"
          color="#ea9c8a"
          label="全てのTodoを表示"
        ></v-checkbox>
        <v-checkbox
          class="filter"
          color="#ea9c8a"
          label="未完了のTodoのみ表示"
        ></v-checkbox>
      </div>
      <div class="search__bar filter">
        <div class="search__bar--box">
          <font-awesome-icon
            icon="search"
            class="search__bar--icon"
          ></font-awesome-icon>
          <input placeholder="検索でTodoを絞り込む" />
          <font-awesome-icon
            icon="times"
            class="search__bar--icon"
          ></font-awesome-icon>
        </div>
      </div>
    </div>
    <ol class="categories">
      <li class="category category__work">
        <div>
          <div class="category-title">
            <label>Work</label>
          </div>
          <draggable
            v-model="draggableListWork"
            element="ul"
            draggable=".todo"
            group="todos"
          >
            <li
              v-for="(item, i) in draggableListWork"
              :key="i"
              class="todo"
              @mouseover="
                isShowEditIcon.work = true
                currentid = i
              "
              @mouseleave="
                isShowEditIcon.work = false
                currentid = -1
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
                    finishedTodo({
                      id: i,
                      category: 'work',
                    })
                  "
                ></v-checkbox>
                <label :class="{ finished: checkFinished(item) }">{{
                  item.title
                }}</label>
              </div>

              <div
                v-show="isShowEditIcon[item.category] && currentid === i"
                class="todo__menu"
              >
                <div
                  class="edit-button"
                  @click="
                    showEditModal({
                      id: i,
                      category: item.category,
                    })
                  "
                >
                  <v-icon class="todo__edit-button">mdi-lead-pencil</v-icon>
                </div>
                <div
                  class="delete-button"
                  @click="
                    showDeleteModal({
                      id: i,
                      category: item.category,
                    })
                  "
                >
                  <v-icon class="todo__edit-button">mdi-delete</v-icon>
                </div>
              </div>
            </li>
          </draggable>
          <AddButton @click="toggleModal('work')"></AddButton>
        </div>
      </li>
      <li class="category category__private">
        <div>
          <div class="category-title">
            <label>Private</label>
          </div>
          <draggable
            v-model="draggableListPrivate"
            element="ul"
            draggable=".todo"
            group="todos"
          >
            <li
              v-for="(item, i) in draggableListPrivate"
              :key="i"
              class="todo"
              @mouseover="
                isShowEditIcon[item.category] = true
                currentid = i
              "
              @mouseleave="
                isShowEditIcon[item.category] = false
                currentid = -1
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
                    finishedTodo({
                      id: i,
                      category: item.category,
                    })
                  "
                ></v-checkbox>
                <label :class="{ finished: checkFinished(item) }">{{
                  item.title
                }}</label>
              </div>

              <div
                v-show="isShowEditIcon[item.category] && currentid === i"
                class="todo__menu"
              >
                <div
                  class="edit-button"
                  @click="
                    showEditModal({
                      id: i,
                      category: item.category,
                    })
                  "
                >
                  <v-icon class="todo__edit-button">mdi-lead-pencil</v-icon>
                </div>
                <div
                  class="delete-button"
                  @click="
                    showDeleteModal({
                      id: i,
                      category: item.category,
                    })
                  "
                >
                  <v-icon class="todo__edit-button">mdi-delete</v-icon>
                </div>
              </div>
            </li>
          </draggable>
          <AddButton @click="toggleModal('private')"></AddButton>
        </div>
      </li>
      <li class="category category__random">
        <div>
          <div class="category-title">
            <label>Random</label>
          </div>
          <draggable
            v-model="draggableListRandom"
            element="ul"
            draggable=".todo"
            group="todos"
          >
            <li
              v-for="(item, i) in draggableListRandom"
              :key="i"
              class="todo"
              @mouseover="
                isShowEditIcon[item.category] = true
                currentid = i
              "
              @mouseleave="
                isShowEditIcon[item.category] = false
                currentid = -1
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
                      id: i,
                      category: item.category,
                    })
                  "
                ></v-checkbox>
                <label :class="{ finished: checkFinished(item) }">{{
                  item.title
                }}</label>
              </div>

              <div
                v-show="isShowEditIcon[item.category] && currentid === i"
                class="todo__menu"
              >
                <div
                  class="edit-button"
                  @click="
                    showEditModal({
                      id: i,
                      category: item.category,
                    })
                  "
                >
                  <v-icon class="todo__edit-button">mdi-lead-pencil</v-icon>
                </div>
                <div
                  class="delete-button"
                  @click="
                    showDeleteModal({
                      id: i,
                      category: item.category,
                    })
                  "
                >
                  <v-icon class="todo__edit-button">mdi-delete</v-icon>
                </div>
              </div>
            </li>
          </draggable>
          <AddButton @click="toggleModal('random')"></AddButton>
        </div>
      </li>
    </ol>
    <AddModal
      :dialog="isShowAddModal"
      v-bind.sync="inputValues"
      @closeModal="toggleModal"
      @addTodo="addTodo"
    >
      <template #title>{{ selectedAddCategory }} にtodoを追加</template>
    </AddModal>
    <EditModal
      :dialog="isShowEditModal"
      v-bind.sync="selectedTodo"
      @closeEditModal="closeEditModal"
      @updateTodo="updateTodo"
    ></EditModal>
    <DeleteModal
      :dialog="isShowDeleteModal"
      v-bind.sync="selectedTodo"
      @closeDeleteModal="closeDeleteModal"
      @deleteTodo="deleteTodo"
    ></DeleteModal>
  </main>
</template>
<script>
// import { mapActions } from 'vuex'
export default {
  // async asyncData({ app }) {
  //   const response = await app.$axios.$get('http://localhost:4000/api/v1/todo')
  //   return { host: response }
  // },
  data() {
    return {
      // DraggableTodoより
      currentid: -1,
      isShowEditIcon: {
        work: false,
        private: false,
        random: false,
      },
      // 元々このvueファイル
      isShowAddModal: false,
      isShowEditModal: false,
      isShowDeleteModal: false,
      inputValues: {
        title: '',
        detail: '',
      },
      categoryList: {
        work: {
          category: 'work',
          displayName: 'Work',
        },
        private: {
          category: 'private',
          displayName: 'Private',
        },
        random: {
          category: 'random',
          displayName: 'Random',
        },
      },
      selectedAddCategory: '',
      selectedTodo: {
        id: null,
        title: '',
        detail: '',
        category: '',
      },
    }
  },
  computed: {
    todoList() {
      return this.$store.state.todo.todoList
    },
    draggableListWork: {
      get() {
        return this.todoList.workTodo
      },
      set(value) {
        this.$store.commit('todo/updateDraggableList', {
          value,
          targetCategory: 'work',
        })
      },
    },
    draggableListPrivate: {
      get() {
        return this.todoList.privateTodo
      },
      set(value) {
        this.$store.commit('todo/updateDraggableList', {
          value,
          targetCategory: 'private',
        })
      },
    },
    draggableListRandom: {
      get() {
        return this.todoList.randomTodo
      },
      set(value) {
        this.$store.commit('todo/updateDraggableList', {
          value,
          targetCategory: 'random',
        })
      },
    },
  },
  created() {
    this.$store.dispatch('todo/actionGetAllTodo')
  },
  methods: {
    // selectAddCategory(value) {
    //   this.selectedAddCategory = value
    // },
    toggleModal(value) {
      this.selectedAddCategory = value
      this.isShowAddModal = !this.isShowAddModal
    },
    addTodo() {
      this.isShowAddModal = !this.isShowAddModal
      // こういうところでMapActionsって呼べるの？？
      this.$store.dispatch('todo/actionAddTodo', {
        category: this.selectedAddCategory,
        title: this.inputValues.title,
        detail: this.inputValues.detail,
        isFinished: false,
      })
      this.inputValues.title = ''
      this.inputValues.detail = ''
      this.selectedCategories = ''
    },
    showEditModal({ id, category }) {
      this.selectedTodo.id = id
      const editCategory = this.todoList[category]
      this.selectedTodo.category = category
      this.selectedTodo.title = editCategory[id].title
      this.selectedTodo.detail = editCategory[id].detail
      this.isShowEditModal = !this.isShowEditModal
    },
    closeEditModal() {
      this.isShowEditModal = !this.isShowEditModal
      this.selectedTodo.title = ''
      this.selectedTodo.detail = ''
      this.selectedTodo.category = ''
    },
    updateTodo() {
      console.log(this.selectedTodo.title)
      this.isShowEditModal = !this.isShowEditModal
      this.$store.dispatch('todo/actionUpdateTodo', this.selectedTodo)
      this.selectedTodo.title = ''
      this.selectedTodo.detail = ''
      this.selectedTodo.category = ''
    },
    // Draggableから↓
    checkFinished(target) {
      return target.isFinished
    },
    finishedTodo(payload) {
      this.$store.dispatch('todo/actionFinishedTodo', payload)
    },
    showDeleteModal({ id, category }) {
      this.isShowDeleteModal = !this.isShowDeleteModal
      const deleteCategory = this.todoList[category]
      this.selectedTodo.id = id
      this.selectedTodo.category = category
      this.selectedTodo.title = deleteCategory[id].title
      this.selectedTodo.detail = deleteCategory[id].detail
      // data baseもらうまで待っとく？
    },
    closeDeleteModal() {
      this.isShowDeleteModal = !this.isShowDeleteModal
      this.selectedTodo.title = ''
      this.selectedTodo.detail = ''
      this.selectedTodo.category = ''
    },
    deleteTodo() {
      const targetId = this.selectedTodo.id
      const targetCategory = this.selectedTodo.category
      this.$store.dispatch('todo/actionDeleteTodo', {
        id: targetId,
        category: targetCategory,
      })
      this.closeDeleteModal()
    },
  },
}
</script>

<style lang="scss">
ul,
ol {
  list-style: none;
  padding-left: 0 !important;
}
.categories {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: start;
  margin-top: 30px;
}
.category {
  width: 31%;
  padding: 50px, 10px;
  border-radius: 4px;
  &__work {
    background-color: hsl(182, 31%, 73%);
  }
  &__private {
    background-color: hsl(16, 39%, 77%);
  }
  &__random {
    background-color: hsl(351, 50%, 77%);
  }
}
//以下TodoCategory.vueより
.category-title {
  font-weight: 600;
  & label {
    padding: 15px 20px 0 20px;
    display: block;
    font-size: 20px;
    letter-spacing: 3px;
  }
}
//以下DraggableTodo.vueより
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

//上部絞り込み部分
.filter-bar {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  align-items: center;
  &__checkbox {
    display: flex;
  }
}
.filter {
  padding-top: 0;
  margin-top: 0;
  &:not(:first-of-type) {
    margin-left: 30px;
  }
}
.search__bar {
  display: flex;
  &--box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 100%;
    background-color: #ddd;
    margin-bottom: 8px;
    margin-left: 90px;
    & input {
      border: none;
      outline: none;
      box-sizing: border-box;
      background-color: #ddd;
      &::placeholder {
        font-size: 0.5em;
      }
    }
  }
  &--icon {
    height: 13px;
    width: 13px;
    margin: 8px 8px;
  }
}
</style>
