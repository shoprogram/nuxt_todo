// import { getIterator } from 'core-js'

export const state = () => ({
  todoList: {
    workTodo: [
      {
        title: 'タスク１',
        detail: '説明１',
        category: 'work',
      },
      {
        title: 'タスク２',
        detail: '説明２',
        category: 'work',
      },
    ],
    privateTodo: [
      {
        title: '予定１',
        detail: '説明１',
        category: 'private',
      },
      {
        title: '予定２',
        detail: '説明２',
        category: 'private',
      },
    ],
    randomTodo: [
      {
        title: 'なんでも１',
        detail: '説明１',
        category: 'random',
      },
    ],
  },
})
// 追記
export const getters = {
  todoList: (state) => state.todoList,
}

export const mutations = {
  mutationAddTodo(state, payload) {
    const selectedCategory = payload.category
    const targetList = state.todoList[selectedCategory + 'Todo']
    const newTodo = {
      title: payload.title,
      detail: payload.detail,
      category: payload.category,
    }
    targetList.push(newTodo)
  },
}
