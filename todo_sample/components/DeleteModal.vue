<template>
  <v-dialog
    :value="dialog"
    class="modal"
    width="400px"
    height="800px"
    @click:outside="$emit('closeDeleteModal')"
  >
    <v-card class="container">
      <v-progress-linear
        color="red darken-2"
        value="100"
        absolute
        top
        height="6"
      ></v-progress-linear>
      <v-row class="content" justify="center">
        <v-icon color="#D32F2F" x-large>mdi-delete-empty</v-icon>
        <div class="text-container">
          <v-card-title class="text-title">Todoを削除 </v-card-title>
          <v-card-text>このTodoを削除しますか？</v-card-text>
        </div>
      </v-row>
      <v-card-actions class="buttons">
        <v-btn @click="$emit('closeDeleteModal')">キャンセル</v-btn>
        <v-btn
          class="delete-button white--text"
          color="#C62828"
          @click="$emit('deleteTodo')"
          >削除
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
    },
  },
  data() {
    return {
      index: {
        type: Number,
      },
      category: {
        type: String,
      },
    }
  },
}
</script>
<style lang="scss">
.modal {
  transition: all 300ms 0s ease;
}
.container {
  padding: 15px;
}
.content {
  margin-left: 0;
}
.text {
  &-container {
    margin-left: 20px;
  }
  &-title {
    padding-bottom: 10px;
  }
}
.buttons {
  margin-top: 10px;
  justify-content: center;
}
.delete-button {
  margin-left: 4px;
}
</style>
