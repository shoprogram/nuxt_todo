<template>
  <main>
    <div class="filter-bar">
      <div class="filter-bar__checkbox">
        <span class="filter" @click="checkAllByFilter">
          <v-checkbox
            v-model="isFilterAllChecked"
            readonly
            :false-value="false"
            :true-value="true"
            color="#ea9c8a"
            label="チェック済みも表示"
          ></v-checkbox>
        </span>
        <span class="filter" @click="checkUnfinished">
          <v-checkbox
            v-model="isFilterUnfinishedChecked"
            readonly
            :false-value="false"
            :true-value="true"
            color="#ea9c8a"
            label="未完了のTodoのみ表示"
          ></v-checkbox>
        </span>
      </div>
      <div class="search__bar filter">
        <div class="search__bar--box">
          <font-awesome-icon
            icon="search"
            class="search__bar--icon"
          ></font-awesome-icon>
          <input v-model="searchValue" placeholder="検索でTodoを絞り込む" />
          <div class="search__bar--cancel" @click="cancelSearch">
            <font-awesome-icon
              icon="times"
              class="search__bar--icon"
            ></font-awesome-icon>
          </div>
        </div>
      </div>
    </div>
    <ol class="categories">
      <li class="category category__work">
        <div>
          <div class="category-title">
            <label>Work</label>
          </div>
          <DraggableTodo
            :list-work.sync="listWork"
            :is-filter-unfinished-checked="isFilterUnfinishedChecked"
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
            :is-filter-unfinished-checked="isFilterUnfinishedChecked"
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
            :is-filter-unfinished-checked="isFilterUnfinishedChecked"
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
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
      // vuexで管理してgetterで取ってくるように書き換える。
      // Booleanの書き換えはcommitを飛ばしてmutationからやるようにする
      searchValue: '',
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
  // async fetch({ store, error }) {
  //   try {
  //     await store.dispatch('todo/actionGetAllTodo')
  //   } catch (err) {
  //     error({
  //       statusCode: err.response.status,
  //       message: err.response.data.message,
  //     })
  //   }
  // },
  computed: {
    ...mapGetters('todo', ['todoList']),
    /**
     * @desc このコンピューテッド
     */
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
  watch: {
    searchValue(val) {
      this.reactiveSearchValue(val)
      this.actionFilterTodo(val)
    },
  },
  methods: {
    ...mapActions('todo', [
      'actionGetAllTodo',
      'actionGetUnfinished',
      'actionUpdateDraggableList',
      'actionAddTodo',
      'actionFinishedTodo',
      'actionFilterTodo',
      'actionDeleteTodo',
    ]),
    ...mapMutations('todo', ['reactiveSearchValue']),
    checkAllByFilter() {
      if (this.isFilterUnfinishedChecked) {
        this.isFilterUnfinishedChecked = false
      }
      this.isFilterAllChecked = true
    },
    checkUnfinished() {
      if (this.isFilterAllChecked) {
        this.isFilterAllChecked = !this.isFilterAllChecked
      }
      this.isFilterUnfinishedChecked = true
    },
    cancelSearch() {
      this.searchValue = ''
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
    showEditModal({ id, title, detail, category, isFinished }) {
      this.isShowEditModal = !this.isShowEditModal
      this.selectedTodo = {
        id,
        category,
        title,
        detail,
        isFinished,
      }
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
    closeEditModal() {
      this.isShowEditModal = !this.isShowEditModal
      this.clearSelectedTodo()
    },
    updateTodo() {
      this.isShowEditModal = !this.isShowEditModal
      this.$store.dispatch('todo/actionUpdateTodo', this.selectedTodo)
      this.clearSelectedTodo()
    },
    finishedTodo(payload) {
      this.actionFinishedTodo(payload)
    },
    showDeleteModal({ id, category, title, detail }) {
      this.isShowDeleteModal = !this.isShowDeleteModal
      this.selectedTodo = {
        id,
        category,
        title,
        detail,
      }
    },
    closeDeleteModal() {
      this.isShowDeleteModal = !this.isShowDeleteModal
      this.clearSelectedTodo()
    },
    deleteTodo() {
      const targetId = this.selectedTodo.id
      const targetCategory = this.selectedTodo.category
      this.actionDeleteTodo({
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
.category-title {
  font-weight: 600;
  & label {
    padding: 15px 20px 0 20px;
    display: block;
    font-size: 20px;
    letter-spacing: 3px;
  }
}
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
