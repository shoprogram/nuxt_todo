import axios from 'axios'

export const state = () => ({
  todoListData: {},
  todoList: {},
  // todoListData is not supposed to be modified, but at some point, it is modified.
})
export const getters = {
  todoList: (state) => state.todoList,
}
export const mutations = {
  getAllTodo(state, payload) {
    state.todoListData = payload
    state.todoList = { ...state.todoListData }
    // state.todoList = state.todoListData.slice()
    console.log('全件取得の', state.todoListData)
  },
  updateDraggableList(state, payload) {
    state.todoList[payload.targetCategory + 'Todo'] = payload.value
    // これがうまく行って、表示がされても、リロードしたらTodoの順番が変わってしまう。改善余地あり。
  },
  filterTodo(state, val) {
    const allTodo = Object.assign({}, state.todoListData)
    state.todoList = allTodo
    const filteredWorkTodo = []
    const filteredPrivateTodo = []
    const filteredRandomTodo = []
    for (let i = 0; i < state.todoList.workTodo.length; i++) {
      const targetTodo = state.todoList.workTodo[i]
      if (
        targetTodo.title.toLowerCase().includes(val.toLowerCase()) |
        targetTodo.detail.toLowerCase().includes(val.toLowerCase())
      ) {
        filteredWorkTodo.push(targetTodo)
      }
    }
    for (let i = 0; i < state.todoList.privateTodo.length; i++) {
      const targetTodo = state.todoList.privateTodo[i]
      if (
        targetTodo.title.toLowerCase().includes(val.toLowerCase()) |
        targetTodo.detail.toLowerCase().includes(val.toLowerCase())
      ) {
        filteredPrivateTodo.push(targetTodo)
      }
    }
    for (let i = 0; i < state.todoList.randomTodo.length; i++) {
      const targetTodo = state.todoList.randomTodo[i]
      if (
        targetTodo.title.toLowerCase().includes(val.toLowerCase()) |
        targetTodo.detail.toLowerCase().includes(val.toLowerCase())
      ) {
        filteredRandomTodo.push(targetTodo)
      }
    }
    state.todoList.workTodo = filteredWorkTodo
    state.todoList.privateTodo = filteredPrivateTodo
    state.todoList.randomTodo = filteredRandomTodo

    //   .filter(
    //   (todo) => {
    //     todo.title.toLowerCase().includes(payload.value.toLowerCase()) |
    //       todo.detail.toLowerCase().includes(payload.value.toLowerCase())
    //   }
    // )
    // 全件取得し直してから（完了todoからも検索したいため）、filteredTodoをcategoryごとにstateのtodoListに入れ直す。
    // ×ボタンを押したら全件取得し直す
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
  // actionGetUnfinished({ commit }) {
  //   commit('getUnfinished')
  // },
  actionFilterTodo({ dispatch, commit }, val) {
    if (val === '') {
      dispatch('actionGetAllTodo')
      // 未完了Todo checkboxがtrueの場合は
    } else {
      commit('filterTodo', val)
    }
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
  async actionUpdateDraggableList({ commit }, payload) {
    commit('updateDraggableList', payload)
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
      }
    }
  },
}
