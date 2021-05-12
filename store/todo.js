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
    console.log(payload)
    state.todoList[payload.targetCategory] = payload.value
    // const target = state.todoList[payload.targetCategory]
    // const workList = state.todoList.work
    // const privateList = state.todoList.private
    // const randomList = state.todoList.random
    // for (let i = 0; payload.length < i; i++) {
    //   if (payload[i].category === 'work') {
    //     workList.push(payload[i])
    //   } else if (payload[i].category === 'private') {
    //     privateList.push(payload[i])
    //   } else {
    //     randomList.push(payload[i])
    //   }
    // }
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
