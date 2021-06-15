const BASE_URL = 'http://localhost:3000/api/v1/todo'

export const state = () => ({
  todoListData: {},
  todoList: {},
})
export const getters = {
  todoList(state) {
    return state.todoList
  },
}
export const mutations = {
  // 書き換え
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
  mutationUpdateTodo(state, payload) {
    const selectedCategory = payload.category
    const updatedTodo = {
      title: payload.title,
      detail: payload.detail,
      category: payload.category,
      isFinished: payload.isFinished,
    }
    const targetTodo = state.todoList[selectedCategory + 'Todo']
    targetTodo.splice([payload.index], 1, updatedTodo)
  },
  mutationFinishTodo(state, payload) {
    const selectedCategory = payload.category
    const newTodoList = { ...state.todoList }
    const targetList = newTodoList[selectedCategory + 'Todo']
    const targetTodo = targetList[payload.index]
    if (targetTodo.isFinished === 0) {
      targetTodo.isFinished = 1
    } else {
      targetTodo.isFinished = 0
    }
    state.todoList = newTodoList
  },
  mutationDeleteTodo(state, payload) {
    state.todoList[payload.category + 'Todo'].splice(payload.index, 1)
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
    })
  },
  async actionAddTodo({ dispatch }, newTodo) {
    await this.$axios
      .post(BASE_URL, newTodo)
      .then(() => dispatch('actionGetAllTodo'))
  },
  // 追加
  async actionUpdateTodo({ dispatch }, updatedTodo) {
    console.log('id取れてるか', updatedTodo.id)
    await this.$axios
      .put(BASE_URL + '/' + updatedTodo.id, updatedTodo)
      .then(() => dispatch('actionGetAllTodo'))
  },
  // 追加
  async actionDeleteTodo({ dispatch }, payload) {
    await this.$axios
      .delete(BASE_URL + '/' + payload.id)
      .then(() => dispatch('actionGetAllTodo'))
  },
  async actionFinishedTodo({ dispatch }, payload) {
    console.log('actionFinishedTodo動いた')
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
