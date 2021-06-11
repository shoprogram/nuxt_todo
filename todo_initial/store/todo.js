// import { getIterator } from 'core-js'

export const state = () => ({
  todoList: {
    workTodo: [
      {
        title: 'タスク１',
        detail: '説明１',
        category: 'work',
        isFinished: 1,
      },
      {
        title: 'タスク２',
        detail: '説明２',
        category: 'work',
        isFinished: 0,
      },
    ],
    privateTodo: [
      {
        title: '予定１',
        detail: '説明１',
        category: 'private',
        isFinished: 0,
      },
      {
        title: '予定２',
        detail: '説明２',
        category: 'private',
        isFinished: 0,
      },
    ],
    randomTodo: [
      {
        title: 'なんでも１',
        detail: '説明１',
        category: 'random',
        isFinished: 0,
      },
    ],
  },
})
// 追記
export const getters = {
  todoList(state) {
    return state.todoList
  },
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
  mutationUpdateTodo(state, payload) {
    const selectedCategory = payload.category
    const updatedTodo = {
      title: payload.title,
      detail: payload.detail,
      category: payload.category,
      isFinished: payload.isFinished, // 追加
    }
    const targetTodo = state.todoList[selectedCategory + 'Todo']
    targetTodo.splice([payload.index], 1, updatedTodo)
  },
  mutationFinishTodo(state, payload) {
    const selectedCategory = payload.category
    const newTodoList = { ...state.todoList }
    const targetList = newTodoList[selectedCategory + 'Todo']
    const targetTodo = targetList[payload.index]
    if (targetTodo.isFinished === 0) {
      targetTodo.isFinished = 1
    } else {
      targetTodo.isFinished = 0
    }
    state.todoList = newTodoList
  },
  mutationDeleteTodo(state, payload) {
    state.todoList[payload.category + 'Todo'].splice(payload.index, 1)
  },
}
