// import { getIterator } from 'core-js'

export const state = () => ({
  todoList: {
    workTodo: [
      {
        title: 'タスク１',
        detail: '説明１',
      },
      {
        title: 'タスク２',
        detail: '説明２',
      },
    ],
    privateTodo: [
      {
        title: '予定１',
        detail: '説明１',
      },
      {
        title: '予定２',
        detail: '説明２',
      },
    ],
    randomTodo: [
      {
        title: 'なんでも１',
        detail: '説明１',
      },
    ],
  },
})
// 追記
export const getters = {
  todoList: (state) => state.todoList,
}

export const mutations = {
  // ここ、データうまく渡ってきてない（payload)
  mutateAddTodo(payload) {
    // const selectedCategory = payload.category
    console.log(payload)
    // const targetList = state.todoList[`${selectedCategory} + Todo`]
    // const newTodo = {
    //   title: payload.title,
    //   detail: payload.detail,
    // }
    // targetList.push(newTodo)
  },
}
