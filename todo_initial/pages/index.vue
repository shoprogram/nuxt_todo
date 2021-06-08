<template>
  <main>
    <ol class="categories">
      <li class="category category__work">
        <div>
          <div class="category-title">
            <label>Work</label>
          </div>
          <!-- <AddButton @click="toggleModal('work')"></AddButton> -->
        </div>
      </li>
      <li class="category category__private">
        <div>
          <div class="category-title">
            <label>Private</label>
          </div>
          <!-- <AddButton @click="toggleModal('private')"></AddButton> -->
        </div>
      </li>
      <li class="category category__random">
        <div>
          <div class="category-title">
            <label>Random</label>
          </div>
          <!-- <AddButton @click="toggleModal('random')"></AddButton> -->
        </div>
      </li>
    </ol>
  </main>
</template>
<script>
// import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      // 元々このvueファイル
      isShowAddModal: false,
      // isShowEditModal: false,
      // isShowDeleteModal: false,
      // inputValues: {
      //   title: '',
      //   detail: '',
      // },
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
        isFinished: '',
      },
      isFilterAllChecked: true,
      isFilterUnfinishedChecked: false,
      searchValue: '',
    }
  },

  computed: {
    // ...mapGetters('todo', ['todoList']),
    listWork: {
      // get() {
      //   return this.todoList.workTodo
      // },
      // set(value) {
      //   this.actionUpdateDraggableList({
      //     value,
      //     targetCategory: 'work',
      //   })
      // },
    },
    listPrivate: {
      // get() {
      //   return this.todoList.privateTodo
      // },
      // set(value) {
      //   this.actionUpdateDraggableList({
      //     value,
      //     targetCategory: 'private',
      //   })
      // },
    },
    listRandom: {
      // get() {
      //   return this.todoList.randomTodo
      // },
      // set(value) {
      //   this.actionUpdateDraggableList({
      //     value,
      //     targetCategory: 'random',
      //   })
      // },
    },
  },
  methods: {
    // ...mapActions('todo', [
    //   'actionGetAllTodo',
    //   'actionGetUnfinished',
    //   'actionUpdateDraggableList',
    //   'actionAddTodo',
    //   'actionFinishedTodo',
    //   'actionFilterTodo',
    //   'actionDeleteTodo',
    // ]),
    // ...mapMutations('todo', ['reactiveSearchValue']),
    checkAllByFilter() {
      if (this.isFilterUnfinishedChecked) {
        this.isFilterUnfinishedChecked = false
      }
      this.isFilterAllChecked = true
    },
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
    clearSelectedTodo() {
      this.selectedTodo = {
        id: null,
        category: '',
        title: '',
        detail: '',
        isFinished: '',
      }
    },
    // Draggableから↓
    finishedTodo(payload) {
      this.actionFinishedTodo(payload)
    },
    closeDeleteModal() {
      this.isShowDeleteModal = !this.isShowDeleteModal
      this.clearSelectedTodo()
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
