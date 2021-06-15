<template>
  <main>
    <ol class="categories">
      <li class="category category__work">
        <div>
          <div class="category-title">
            <label>Work</label>
          </div>
          <DraggableTodo
            :list-work.sync="listWork"
            @showEditModal="showEditModal"
            @showDeleteModal="showDeleteModal"
            @finishedTodo="finishedTodo"
          />
          <AddButton @click="toggleModal('work')"></AddButton>
        </div>
      </li>
      <li class="category category__private">
        <div>
          <div class="category-title">
            <label>Private</label>
          </div>
          <DraggableTodo
            :list-private.sync="listPrivate"
            @showEditModal="showEditModal"
            @showDeleteModal="showDeleteModal"
            @finishedTodo="finishedTodo"
          />
          <AddButton @click="toggleModal('private')"></AddButton>
        </div>
      </li>
      <li class="category category__random">
        <div>
          <div class="category-title">
            <label>Random</label>
          </div>
          <DraggableTodo
            :list-random.sync="listRandom"
            @showEditModal="showEditModal"
            @showDeleteModal="showDeleteModal"
            @finishedTodo="finishedTodo"
          />
          <AddButton @click="toggleModal('random')"></AddButton>
        </div>
      </li>
    </ol>
    <AddModal
      :dialog="isShowAddModal"
      v-bind.sync="inputValues"
      @closeModal="toggleModal"
      @addTodo="addTodo"
    />
    <EditModal
      :dialog="isShowEditModal"
      v-bind.sync="selectedTodo"
      @closeEditModal="closeEditModal"
      @updateTodo="updateTodo"
    ></EditModal>
    <DeleteModal
      :dialog="isShowDeleteModal"
      @closeDeleteModal="closeDeleteModal"
      @deleteTodo="deleteTodo"
    ></DeleteModal>
  </main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      isShowAddModal: false,
      isShowEditModal: false,
      isShowDeleteModal: false,
      inputValues: {
        title: '',
        detail: '',
      },
      selectedAddCategory: '',
      currentIndex: -1,
      isShowEditIcon: {
        work: false,
        private: false,
        random: false,
      },
      targetCategory: '',
      selectedTodo: {
        id: null,
        title: '',
        detail: '',
        category: '',
        isFinished: '',
      },
    }
  },
  async fetch() {
    try {
      await this.$store.dispatch('todo/actionGetAllTodo')
    } catch (err) {
      this.$nuxt.error({
        statusCode: err.response.status,
        message: err.response.data.message,
      })
    }
  },
  computed: {
    ...mapGetters('todo', ['todoList']),
    listWork: {
      get() {
        return this.todoList.workTodo
      },
      set(value) {
        this.actionUpdateDraggableList({
          value,
          targetCategory: 'work',
        })
      },
    },
    listPrivate: {
      get() {
        return this.todoList.privateTodo
      },
      set(value) {
        this.actionUpdateDraggableList({
          value,
          targetCategory: 'private',
        })
      },
    },
    listRandom: {
      get() {
        return this.todoList.randomTodo
      },
      set(value) {
        this.actionUpdateDraggableList({
          value,
          targetCategory: 'random',
        })
      },
    },
  },
  methods: {
    ...mapActions('todo', [
      'actionGetAllTodo',
      // 'actionGetUnfinished',
      // 'actionUpdateDraggableList',
      'actionUpdateTodo',
      'actionAddTodo',
      'actionFinishedTodo',
      // 'actionFilterTodo',
      'actionDeleteTodo',
    ]),
    toggleModal(value) {
      this.selectedAddCategory = value
      this.isShowAddModal = !this.isShowAddModal
    },
    addTodo() {
      this.isShowAddModal = !this.isShowAddModal
      this.actionAddTodo({
        category: this.selectedAddCategory,
        title: this.inputValues.title,
        detail: this.inputValues.detail,
        isFinished: false,
      })
      this.inputValues.title = ''
      this.inputValues.detail = ''
      this.selectedCategories = ''
    },
    showEditModal(payload) {
      this.isShowEditModal = !this.isShowEditModal
      this.selectedTodo = {
        id: payload.id,
        category: payload.category,
        title: payload.title,
        detail: payload.detail,
        isFinished: payload.isFinished,
      }
    },
    closeEditModal() {
      this.isShowEditModal = !this.isShowEditModal
      this.clearSelectedTodo()
    },
    updateTodo() {
      this.isShowEditModal = !this.isShowEditModal
      this.actionUpdateTodo(this.selectedTodo)
      this.clearSelectedTodo()
    },
    clearSelectedTodo() {
      this.selectedTodo = {
        id: null,
        category: '',
        title: '',
        detail: '',
      }
    },
    finishTodo(payload) {
      this.actionFinishedTodo(payload)
    },
    checkFinished(target) {
      return target.isFinished
    },
    showDeleteModal(payload) {
      this.isShowDeleteModal = !this.isShowDeleteModal
      this.selectedTodo = {
        id: payload.id,
        category: payload.category,
        title: payload.title,
        detail: payload.detail,
        isFinished: payload.isFinished,
      }
    },
    closeDeleteModal() {
      this.isShowDeleteModal = !this.isShowDeleteModal
      this.clearSelectedTodo()
    },
    deleteTodo() {
      const targetTodo = this.selectedTodo.id
      const targetCategory = this.selectedTodo.category
      this.actionDeleteTodo({
        id: targetTodo,
        category: targetCategory,
      })
      this.closeDeleteModal()
    },
  },
}
</script>

<style lang="scss">
// draggablelコンポーネントに入っていたもの追加
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
ul,
ol {
  list-style: none;
  padding-left: 0 !important;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s 0 ease;
}
// ココうまくアニメつけられてない
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

//上部絞り込み部分
.filter-bar {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
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
  align-self: flex-end;
  &--box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 100%;
    background-color: #ddd;
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
