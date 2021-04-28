export const state = () => ({
  todoList: {
    work: [],
    private: [],
    random: [],
  },
})

export const mutations = {
  addTodo(state, payload) {
    console.log(payload.todo)
    console.log(payload.category)
    state.todoList[payload.category].push(payload.todo)
  },
}

export const actions = {
  addTodo({ commit }, newTodo) {
    commit('addTodo', newTodo)
    // 非同期の処理も書いてみたい
  },
}
