<template>
  <main>
    <ol class="categories">
      <li class="category category__work">
        <div>
          <div class="category-title">
            <label>Work</label>
          </div>
          <li v-for="(item, i) in workTodo" :key="i" class="todo">
            <div class="todo__title">
              <span @click="finishedTodo(item)">
                <v-checkbox
                  class="checkbox mt-0 pt-0"
                  :off-icon="'mdi-checkbox-blank-circle-outline'"
                  :on-icon="'mdi-check-circle-outline'"
                  color="red darken-3"
                  dense
                ></v-checkbox>
              </span>
              <label>{{ item.title }}</label>
            </div>

            <div class="todo__menu">
              <div class="edit-button" @click="showEditModal(item)">
                <v-icon class="todo__edit-button">mdi-lead-pencil</v-icon>
              </div>
              <div class="delete-button" @click="showDeleteModal(item)">
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
          <li v-for="(item, i) in privateTodo" :key="i" class="todo">
            <div class="todo__title">
              <span @click="finishedTodo(item)">
                <v-checkbox
                  class="checkbox mt-0 pt-0"
                  :off-icon="'mdi-checkbox-blank-circle-outline'"
                  :on-icon="'mdi-check-circle-outline'"
                  color="red darken-3"
                  dense
                ></v-checkbox>
              </span>
              <label>{{ item.title }}</label>
            </div>

            <div class="todo__menu">
              <div class="edit-button" @click="showEditModal(item)">
                <v-icon class="todo__edit-button">mdi-lead-pencil</v-icon>
              </div>
              <div class="delete-button" @click="showDeleteModal(item)">
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
          <li v-for="(item, i) in randomTodo" :key="i" class="todo">
            <div class="todo__title">
              <span @click="finishedTodo(item)">
                <v-checkbox
                  class="checkbox mt-0 pt-0"
                  :off-icon="'mdi-checkbox-blank-circle-outline'"
                  :on-icon="'mdi-check-circle-outline'"
                  color="red darken-3"
                  dense
                ></v-checkbox>
              </span>
              <label>{{ item.title }}</label>
            </div>

            <div class="todo__menu">
              <div class="edit-button" @click="showEditModal(item)">
                <v-icon class="todo__edit-button">mdi-lead-pencil</v-icon>
              </div>
              <div class="delete-button" @click="showDeleteModal(item)">
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
export default {
  data() {
    return {
      workTodo: [
        {
          id: '1',
          title: 'work1',
          detail: 'This is a todo card',
        },
        {
          id: '2',
          title: 'work2',
          detail: 'This is a todo card',
        },
        {
          id: '3',
          title: 'work3',
          detail: 'This is a todo card',
        },
      ],
      privateTodo: [
        {
          id: '4',
          title: 'private todo1',
          detail: 'This is a todo card',
        },
        {
          id: '5',
          title: 'private todo2',
          detail: 'This is a todo card',
        },
      ],
      randomTodo: [
        {
          id: '6',
          title: 'なんでも１',
          detail: 'This is a todo card',
        },
        {
          id: '7',
          title: 'なんでも２',
          detail: 'This is a todo card',
        },
      ],
    }
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
    max-width: 169px;
    display: flex;
    align-items: center;
    text-align: left;
    &label {
      word-wrap: break-word;
    }
  }
  &__edit-button {
    // padding-right: 10px;
  }
  &:hover {
  }
  &__menu {
    margin-right: 6px;
  }
}
.edit-button,
.delete-button {
  display: inline-block;
  margin-left: 0;
}
.finished {
  background-image: linear-gradient(#c62828, #c62828);
  background-position: 0 50%;
  background-size: 100% 3px;
  background-repeat: repeat-x;
  // color: #888;
  margin: 0 0.4em;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  // position: relative;
  // &::before {
  //   position: absolute;
  //   top: 0.5em;
  //   left: -0.3em;
  //   content: '';
  //   border: 2px solid #ad343e;
  //   width: 200%;
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
