<template>
  <div>
    <div class="category-title">
      <label>{{ target.displayName }}</label>
    </div>
    <draggable v-model="draggableTodoList" element="ul" draggable=".todo">
      <li
        v-for="(item, i) in draggableTodoList"
        :key="i"
        class="todo"
        @mouseover="
          isShowEditIcon[target.category] = true
          currentIndex = i
        "
        @mouseleave="
          isShowEditIcon[target.category] = false
          currentIndex = -1
        "
      >
        <div class="todo__title">
          <v-checkbox
            class="checkbox mt-0 pt-0"
            :off-icon="'mdi-checkbox-blank-circle-outline'"
            :on-icon="'mdi-check-circle-outline'"
            color="red darken-3"
            dense
            @click="
              $emit('finishedTodo', {
                index: i,
                category: target.category,
              })
            "
          ></v-checkbox>
          <label :class="{ finished: checkFinished(item) }">{{
            item.title
          }}</label>
        </div>

        <div
          v-show="isShowEditIcon[target.category] && currentIndex === i"
          class="todo__menu"
        >
          <div
            class="edit-button"
            @click="
              $emit('showEditModal', {
                index: i,
                category: target.category,
              })
            "
          >
            <v-icon class="todo__edit-button">mdi-lead-pencil</v-icon>
          </div>
          <div
            class="delete-button"
            @click="
              $emit('showDeleteModal', {
                index: i,
                category: target.category,
              })
            "
          >
            <v-icon class="todo__edit-button">mdi-delete</v-icon>
          </div>
        </div>
      </li>
    </draggable>
    <!-- <DraggableTodo
      :target="target"
      @showEditModal="showEditModal"
      @finishedTodo="finishedTodo"
      @showDeleteModal="showDeleteModal"
    ></DraggableTodo> -->
    <AddButton @click="$emit('toggle-modal', target.category)"></AddButton>
  </div>
</template>
<script>
export default {
  props: {
    target: {
      type: Object,
    },
  },
  methods: {
    showEditModal(payload) {
      this.$emit('showEditModal', payload)
    },
    finishedTodo(payload) {
      this.$emit('finishedTodo', payload)
    },
    showDeleteModal(payload) {
      this.$emit('showDeleteModal', payload)
    },
  },
}
</script>
<style lang="scss">
.category-title {
  font-weight: 600;
  & label {
    padding: 15px 20px 0 20px;
    display: block;
    font-size: 20px;
    letter-spacing: 3px;
  }
}
</style>
