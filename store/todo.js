export const state = () => ({
  todoList: {
    work: [],
    private: [],
    random: [],
  },
})

export const mutations = {
  addTodo(state, payload) {
    console.log(payload)
    state.todoList[payload.category].push({
      payload.todo
    })
  }
}

export const actions = {
  addTodo({ commit }, newTodo) {
    const payload = {
      category: newTodo.category,
      todo: newTodo.todo
    }
    commit({
      type: 'addTodo',
      payload,
      // 非同期の処理も書いてみたい
    })
  },
}
