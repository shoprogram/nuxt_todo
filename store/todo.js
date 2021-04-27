export const state = () => ({
  todos: {
    work: [],
    private: [],
    random: [],
  },
})

export const mutations = {
  addTodo(state, payload) {
    console.log(payload)
    state.todos[payload.category].push({
      payload.todo
    })
  }
}

export const actions = {
  addTodo({ commit }, payload) {
    commit({
      type: 'addTodo',
      payload,
      // 非同期の処理なども書いてみたい
    })
  },
}
