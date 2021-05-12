export const state = () => ({
  todoList: {
    work: [
      {
        title: 'todo1',
        detail: 'detail!',
        category: 'work',
      },
      {
        title: 'TODO2',
        detail: '!!!',
        category: 'work',
      },
    ],
    private: [
      {
        title: 'TODO!!!',
        detail: '!!!',
        category: 'private',
      },
    ],
    random: [],
  },
})

export const mutations = {
  addTodo(state, payload) {
    const todoData = {
      title: payload.title,
      detail: payload.detail,
      isFinished: false,
      category: payload.category,
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
    console.log(payload.value)
    const targetTodoList = []
    for (let i = 0; i < payload.value.length; i++) {
      console.log('確認')
      if (payload.value[i].category === payload.targetCategory) {
        targetTodoList.push(payload.value[i])
      } else {
        payload.value[i].category = payload.targetCategory
        targetTodoList.push(payload.value[i])
      }
    }
    state.todoList[payload.targetCategory] = targetTodoList
    // const target = state.todoList[payload.targetCategory]
    // const workList = state.todoList.work
    // const privateList = state.todoList.private
    // const randomList = state.todoList.random
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
