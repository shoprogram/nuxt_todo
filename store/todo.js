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
}

export const actions = {
  actionAddTodo({ commit }, newTodo) {
    commit('addTodo', newTodo)
    // 非同期の処理も書いてみたい
  },
}
