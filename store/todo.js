// import axios from 'axios'

export const state = () => ({
  todoListData: {},
  todoList: {},
  searchValue: '',
  errorAlert: false,
  // todoListDataとtodoList(変更加えていい方)に分ける意味あるのか
})
export const getters = {
  todoList: (state) => state.todoList,
}
export const mutations = {
  reactiveSearchValue(state, payload) {
    state.searchValue = payload
  },
  getAllTodo(state, payload) {
    state.todoListData = payload
    state.todoList = { ...state.todoListData }
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
    function filtering(category, arrayName) {
      for (let i = 0; i < state.todoList[category].length; i++) {
        const targetTodo = state.todoList[category][i]
        if (
          targetTodo.title.toLowerCase().includes(val.toLowerCase()) |
          targetTodo.detail.toLowerCase().includes(val.toLowerCase())
        ) {
          arrayName.push(targetTodo)
        }
      }
    }
    filtering('workTodo', filteredWorkTodo)
    filtering('privateTodo', filteredPrivateTodo)
    filtering('randomTodo', filteredRandomTodo)
    state.todoList.workTodo = filteredWorkTodo
    state.todoList.privateTodo = filteredPrivateTodo
    state.todoList.randomTodo = filteredRandomTodo
  },
}

export const actions = {
  async actionGetAllTodo({ commit, state }) {
    await this.$axios.get('http://localhost:3000/api/v1/todo').then((res) => {
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
      // searchValueに値が入ってた時はfilterをかける
      if (state.searchValue) {
        commit('filterTodo', state.searchValue)
      }
    })
    // .catch((err) => {
    //   console.log('store側のキャッチ')
    // return Promise.reject(err)
    // throw new Error(err)
    // })
  },
  actionFilterTodo({ dispatch, commit }, val) {
    if (val === '') {
      dispatch('actionGetAllTodo')
    } else {
      // 未完了Todo checkboxがtrueの場合は
      commit('filterTodo', val)
    }
  },
  async actionAddTodo({ dispatch }, newTodo) {
    console.log('post', this)
    await this.$axios
      // this.$axiosになるの詰まった
      // https://axios.nuxtjs.org/usage/
      .post('http://localhost:3000/api/v1/todo', newTodo)
      .then(() => dispatch('actionGetAllTodo'))
    // .catch((err) => {
    //   console.log('store側のキャッチ')
    //   return Promise.reject(err)
    //   // throw new Error(err)
    // })
  },
  async actionUpdateTodo({ dispatch }, updatedTodo) {
    console.log('actionUpdateTodo動きました')
    await this.$axios
      .put('http://localhost:3000/api/v1/todo/' + updatedTodo.id, updatedTodo)
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
    await this.$axios
      .put('http://localhost:3000/api/v1/todo/' + payload.id, formedTodo)
      .then(() => dispatch('actionGetAllTodo'))
  },
  async actionDeleteTodo({ dispatch }, payload) {
    await this.$axios
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
        await this.$axios.put(
          'http://localhost:3000/api/v1/todo/' + payload.value[i].id,
          formedTodo
        )
      }
    }
  },
}
