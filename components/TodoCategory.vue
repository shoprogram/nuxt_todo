<template>
  <div>
    <div class="category-title">
      <label>{{ target.displayName }}</label>
    </div>
    <TodoList :target="target" @showEditModal="showEditModal"></TodoList>
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
