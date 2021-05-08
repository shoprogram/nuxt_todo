<template>
  <div>
    <div class="category_title">
      <label>{{ target.displayName }}</label>
      <AddButton @click="$emit('toggle-modal', target.type)"></AddButton>
    </div>
    <TodoList
      :target="target"
      @showEditModal="$emit('showEditModal')"
    ></TodoList>
  </div>
</template>
<script>
export default {
  props: {
    target: {
      type: Object,
    },
  },
}
</script>
