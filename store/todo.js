import axios from 'axios'

export const state = () => ({
  todoList: {},
})
export const getters = {
  todoList: (state) => state.todoList,
}
export const mutations = {
  getAllTodo(state, payload) {
    state.todoList = payload
  },
  getUnfinished(state) {
    const {
      workTodo: targetWork,
      privateTodo: targetPrivate,
      randomTodo: targetRandom,
    } = state.todoList
    const hideFinished = (array) => {
      array.forEach((val, i) => {
        if (val.isFinished) {
          const category = val.category + 'Todo'
          state.todoList[category].splice(i, 1)
        }
      })
    }
    hideFinished(targetWork)
    hideFinished(targetPrivate)
    hideFinished(targetRandom)
    const newTodoList = state.todoList
    state.todoList = { ...newTodoList }
  },
}

export const actions = {
  async actionGetAllTodo({ commit }) {
    await axios.get('http://localhost:3000/api/v1/todo').then((res) => {
      const workTodo = []
      const privateTodo = []
      const randomTodo = []
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].category === 'work') {
          workTodo.push(res.data[i])
        } else if (res.data[i].category === 'private') {
          privateTodo.push(res.data[i])
        } else if (res.data[i].category === 'random') {
          randomTodo.push(res.data[i])
        } else {
          continue
        }
      }
      const payload = { workTodo, privateTodo, randomTodo }
      commit('getAllTodo', payload)
    })
  },
  actionGetUnfinished({ commit }) {
    commit('getUnfinished')
  },
  async actionAddTodo({ dispatch }, newTodo) {
    const formedTodo = {
      title: newTodo.title,
      category: newTodo.category,
      detail: newTodo.detail,
      isFinished: newTodo.isFinished,
    }
    await axios
      .post('http://localhost:3000/api/v1/todo', formedTodo)
      .then(() => dispatch('actionGetAllTodo'))
  },
  async actionUpdateTodo({ dispatch }, updatedTodo) {
    const formedTodo = {
      id: updatedTodo.id,
      title: updatedTodo.title,
      category: updatedTodo.category,
      detail: updatedTodo.detail,
      isFinished: updatedTodo.isFinished,
    }
    await axios
      .put('http://localhost:3000/api/v1/todo/' + updatedTodo.id, formedTodo)
      .then(() => dispatch('actionGetAllTodo'))
  },
  async actionFinishedTodo({ dispatch }, payload) {
    const formedTodo = {
      id: payload.id,
      title: payload.title,
      category: payload.category,
      detail: payload.detail,
      isFinished: !payload.isFinished,
    }
    await axios
      .put('http://localhost:3000/api/v1/todo/' + payload.id, formedTodo)
      .then(() => dispatch('actionGetAllTodo'))
  },
  async actionDeleteTodo({ dispatch }, payload) {
    await axios
      .delete('http://localhost:3000/api/v1/todo/' + payload.id)
      .then(() => dispatch('actionGetAllTodo'))
  },
  async actionUpdateDraggableList({ dispatch }, payload) {
    for (let i = 0; i < payload.value.length; i++) {
      const formedTodo = {
        id: payload.value[i].id,
        title: payload.value[i].title,
        category: payload.targetCategory,
        detail: payload.value[i].detail,
        isFinished: payload.value[i].isFinished,
      }
      if (payload.value[i].category !== payload.targetCategory) {
        await axios.put(
          'http://localhost:3000/api/v1/todo/' + payload.value[i].id,
          formedTodo
        )
      } else {
        continue
      }
    }
    dispatch('actionGetAllTodo')
  },
}
