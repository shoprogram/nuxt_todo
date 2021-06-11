<template>
  <main>
    <ol class="categories">
      <li class="category category__work">
        <div>
          <div class="category-title">
            <label>Work</label>
          </div>
          <li
            v-for="(item, i) in listWork"
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
              <span @click="finishTodo({ item, i })">
                <v-checkbox
                  :value="item.isFinished"
                  :false-value="0"
                  :true-value="1"
                  :input-value="item.isFinished"
                  readonly
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
              v-show="isShowEditIcon.work && currentid === i"
              class="todo__menu"
            >
              <div class="edit-button" @click="showEditModal({ item, i })">
                <v-icon class="todo__edit-button">mdi-lead-pencil</v-icon>
              </div>
              <!-- 追加 -->
              <div class="delete-button" @click="showDeleteModal({ item, i })">
                <v-icon class="todo__edit-button">mdi-delete</v-icon>
              </div>
            </div>
          </li>
          <AddButton @click="toggleModal('work')"></AddButton>
        </div>
      </li>
      <li class="category category__private">
        <div>
          <div class="category-title">
            <label>Private</label>
          </div>
          <li
            v-for="(item, i) in listPrivate"
            :key="i"
            class="todo"
            @mouseover="
              isShowEditIcon.private = true
              currentid = i
            "
            @mouseleave="
              isShowEditIcon.private = false
              currentid = -1
            "
          >
            <div class="todo__title">
              <span @click="finishTodo({ item, i })">
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
              <label class="checkbox">{{ item.title }}</label>
            </div>
            <div
              v-show="isShowEditIcon.private && currentid === i"
              class="todo__menu"
            >
              <div class="edit-button" @click="showEditModal({ item, i })">
                <v-icon class="todo__edit-button">mdi-lead-pencil</v-icon>
              </div>
              <div class="delete-button" @click="showDeleteModal({ item, i })">
                <v-icon class="todo__edit-button">mdi-delete</v-icon>
              </div>
            </div>
          </li>
          <AddButton @click="toggleModal('private')"></AddButton>
        </div>
      </li>
      <li class="category category__random">
        <div>
          <div class="category-title">
            <label>Random</label>
          </div>
          <li
            v-for="(item, i) in listRandom"
            :key="i"
            class="todo"
            @mouseover="
              isShowEditIcon.random = true
              currentid = i
            "
            @mouseleave="
              isShowEditIcon.random = false
              currentid = -1
            "
          >
            <div class="todo__title">
              <span @click="finishTodo({ item, i })">
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
              <label class="checkbox">{{ item.title }}</label>
            </div>
            <div
              v-show="isShowEditIcon.random && currentid === i"
              class="todo__menu"
            >
              <div class="edit-button" @click="showEditModal({ item, i })">
                <v-icon class="todo__edit-button">mdi-lead-pencil</v-icon>
              </div>
              <div class="delete-button" @click="showDeleteModal({ item, i })">
                <v-icon class="todo__edit-button">mdi-delete</v-icon>
              </div>
            </div>
          </li>
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
    <!-- 追加 -->
    <DeleteModal
      :dialog="isShowDeleteModal"
      v-bind.sync="selectedTodo"
      @closeDeleteModal="closeDeleteModal"
      @deleteTodo="deleteTodo"
    ></DeleteModal>
  </main>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

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
        index: null,
        title: '',
        detail: '',
        category: '',
        isFinished: '',
      },
    }
  },
  computed: {
    ...mapGetters('todo', ['todoList']),
    listWork() {
      return this.todoList.workTodo
    },
    listPrivate() {
      return this.todoList.privateTodo
    },
    listRandom() {
      return this.todoList.randomTodo
    },
  },
  methods: {
    ...mapMutations('todo', [
      'mutationAddTodo',
      'mutationUpdateTodo',
      'mutationFinishTodo',
      'mutationDeleteTodo',
    ]),
    toggleModal(value) {
      this.selectedAddCategory = value
      this.isShowAddModal = !this.isShowAddModal
    },
    addTodo() {
      this.isShowAddModal = !this.isShowAddModal
      this.mutationAddTodo({
        category: this.selectedAddCategory,
        title: this.inputValues.title,
        detail: this.inputValues.detail,
        isFinished: 0,
      })
      this.inputValues.title = ''
      this.inputValues.detail = ''
      this.selectedCategories = ''
    },
    showEditModal(payload) {
      this.isShowEditModal = !this.isShowEditModal
      this.selectedTodo = {
        index: payload.i,
        category: payload.item.category,
        title: payload.item.title,
        detail: payload.item.detail,
        isFinished: payload.item.isFinished,
      }
    },
    closeEditModal() {
      this.isShowEditModal = !this.isShowEditModal
      this.clearSelectedTodo()
    },
    updateTodo() {
      this.isShowEditModal = !this.isShowEditModal
      this.mutationUpdateTodo(this.selectedTodo)
      this.clearSelectedTodo()
    },
    clearSelectedTodo() {
      this.selectedTodo = {
        index: null,
        category: '',
        title: '',
        detail: '',
      }
    },
    finishTodo(payload) {
      this.mutationFinishTodo({
        index: payload.i,
        category: payload.item.category,
      })
    },
    checkFinished(target) {
      return target.isFinished
    },
    // 追加
    showDeleteModal(payload) {
      this.isShowDeleteModal = !this.isShowDeleteModal
      this.selectedTodo = {
        index: payload.i,
        category: payload.item.category,
        title: payload.item.title,
        detail: payload.item.detail,
        isFinished: payload.item.isFinished,
      }
    },
    closeDeleteModal() {
      this.isShowDeleteModal = !this.isShowDeleteModal
      this.clearSelectedTodo()
    },
    deleteTodo() {
      const targetIndex = this.selectedTodo.index
      const targetCategory = this.selectedTodo.category
      this.mutationDeleteTodo({
        index: targetIndex,
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
