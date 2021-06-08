<template>
  <v-app dark>
    <p class="error-code">エラーコード：{{ error.statusCode }}<br /></p>
    <div v-if="error.statusCode === 404" class="message-wrapper">
      <h1>
        {{ pageNotFound }}
      </h1>
      <NuxtLink to="/"> ホームに戻る </NuxtLink>
    </div>
    <div v-if="error.statusCode === 504" class="message-wrapper">
      <h1>
        {{ serverError }}
      </h1>
      <NuxtLink to="#"> 再度アクセスする </NuxtLink>
    </div>
    <div
      v-if="error.statusCode !== 404 && error.statusCode !== 504"
      class="message-wrapper"
    >
      <h1>
        {{ otherError }}
      </h1>
      <NuxtLink to="/"> ホームに戻る </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'ページが見つかりませんでした。',
      serverError:
        'アクセスできませんでした。\n時間をおいてから再度アクセスしてください。',
      otherError: 'An error occurred',
    }
  },
  head() {
    // headタグのtitleタグを設定している
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
.error-code {
  font-size: 18px;
  margin-top: 50px;
  text-align: center;
}
h1 {
  font-size: 24px;
  text-align: center;
}
.theme--light .v-application {
  background-color: #bc8089;
}
.message-wrapper {
  text-align: center;
  /* transition: all 100ms 0s linear; */
}
a {
  display: block;
  margin-top: 15px;
  color: white;
  opacity: 0.7;
  text-decoration: none;
}
a:hover {
  opacity: 1;
  font-weight: bold;
}
</style>
