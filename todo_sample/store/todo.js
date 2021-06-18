const BASE_URL = 'http://localhost:3000/api/v1/todo'

export const state = () => ({
  todoListData: {},
  todoList: {},
  searchValue: '',
  errorAlert: false,
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
    state.todoList[payload.target + 'Todo'] = payload.updatedTodo
    // 今現在の表示をdrag&dropした通りに変えるため
    state.todoListData[payload.target + 'Todo'] = payload.updatedTodo
    // 文字検索する時に、毎回todoListDataをtodoListにコピーして使うため、todoListDataも変更しておかないとdrag & dropしたあと１回目の表示が
    // drag & dropする前の位置で表示されてしまう。
    // リロード、検索文字消去で全件取得するため順番はdatabaseのid順になってしまう。
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
    await this.$axios.get(BASE_URL).then((res) => {
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
  },
  actionFilterTodo({ dispatch, commit }, val) {
    if (val === '') {
      dispatch('actionGetAllTodo')
      // ココのfilterの値をなしにした時も全件取得するのでTodoの順番が入れ替わってしまう。
      // データの表示順に関して改善余地あり
    } else {
      commit('filterTodo', val)
    }
  },
  async actionAddTodo({ dispatch }, newTodo) {
    await this.$axios
      // this.$axiosになるの詰まった
      // https://axios.nuxtjs.org/usage/
      .post(BASE_URL, newTodo)
      .then(() => dispatch('actionGetAllTodo'))
  },
  async actionUpdateTodo({ dispatch }, updatedTodo) {
    await this.$axios
      .put(BASE_URL + '/' + updatedTodo.id, updatedTodo)
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
      .put(BASE_URL + '/' + payload.id, formedTodo)
      .then(() => dispatch('actionGetAllTodo'))
  },
  async actionDeleteTodo({ dispatch }, payload) {
    await this.$axios
      .delete(BASE_URL + '/' + payload.id)
      .then(() => dispatch('actionGetAllTodo'))
  },
  actionUpdateDraggableList({ commit }, payload) {
    const updatedTodo = []
    const target = payload.targetCategory
    for (let i = 0; i < payload.value.length; i++) {
      const formedTodo = {
        id: payload.value[i].id,
        title: payload.value[i].title,
        category: payload.targetCategory,
        detail: payload.value[i].detail,
        isFinished: payload.value[i].isFinished,
      }
      updatedTodo.push(formedTodo)
      if (payload.value[i].category !== payload.targetCategory) {
        this.$axios.put(BASE_URL + '/' + payload.value[i].id, formedTodo)
      }
      // async awaitあえてやめた。
      // 通信を待たないでcommitをすることで、Todoカードが入れ替えの時にパチパチならないようにした。
    }
    commit('updateDraggableList', {
      updatedTodo,
      target,
    })
  },
}
