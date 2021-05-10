<template>
  <div>
    <div class="category_title">
      <label>{{ target.displayName }}</label>
      <AddButton @click="$emit('toggle-modal', target.category)"></AddButton>
    </div>
    <TodoList :target="target" @showEditModal="showEditModal"></TodoList>
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
  },
}
</script>
