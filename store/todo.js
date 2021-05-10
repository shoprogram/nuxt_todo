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
}

export const actions = {
  actionAddTodo({ commit }, newTodo) {
    commit('addTodo', newTodo)
    // 非同期の処理も書いてみたい
  },
  actionUpdateTodo({ commit }, updatedTodo) {
    commit('updateTodo', updatedTodo)
  },
}
