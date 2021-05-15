import axios from 'axios'

export const state = () => ({
  todoList: {},
})

export const mutations = {
  getAllTodo(state, payload) {
    state.todoList = {}
    state.todoList = payload
  },
  addTodo(state, payload) {
    const todoData = {
      title: payload.title,
      detail: payload.detail,
      Finished: true,
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
  async actionAddTodo({ dispatch }, newTodo) {
    // ここではcategoryもdetailもちゃんと入ってる。↑
    const formedTodo = new URLSearchParams()
    formedTodo.append('title', newTodo.title)
    formedTodo.append('detail', newTodo.detail)
    formedTodo.append('category', newTodo.category)
    formedTodo.append('isFinished', newTodo.isFinished)
    console.log(newTodo.detail)
    // これでもcategoryとdetail、nullになってるなんで！
    await axios
      .post('http://localhost:3000/api/v1/todo', formedTodo)
      .then(dispatch('actionGetAllTodo'))
    // .then(commit('addTodo', newTodo))
    // .then(commit('getAllTodo'))
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
