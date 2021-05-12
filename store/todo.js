export const state = () => ({
  todoList: {
    work: [],
    private: [],
    random: [],
  },
})

export const mutations = {
  addTodo(state, payload) {
    const todoData = {
      title: payload.title,
      detail: payload.detail,
      isFinished: false,
    }
    state.todoList[payload.category].push(todoData)
  },
  updateTodo(state, payload) {
    const updatedData = {
      // index: payload.index,
      title: payload.title,
      detail: payload.detail,
    }
    const target = state.todoList[payload.category]
    target[payload.index] = updatedData
    console.log(target[payload.index])
  },
  finishedTodo(state, payload) {
    const target = state.todoList[payload.category]
    target[payload.index].isFinished = !target[payload.index].isFinished
  },
  deleteTodo(state, payload) {
    const target = state.todoList[payload.category]
    target.splice(payload.index, 1)
  },
  updateDraggableList(state, payload) {
    // const target = state.todoList[payload.targetCategory]
    state.todoList[payload.targetCategory] = payload.value
  },
}

export const actions = {
  actionAddTodo({ commit }, newTodo) {
    commit('addTodo', newTodo)
    // 非同期の処理も書いてみたい
  },
  actionUpdateTodo({ commit }, updatedTodo) {
    commit('updateTodo', updatedTodo)
  },
  actionFinishedTodo({ commit }, payload) {
    commit('finishedTodo', payload)
  },
  actionDeleteTodo({ commit }, payload) {
    commit('deleteTodo', payload)
  },
}
