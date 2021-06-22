export default ({ $axios, error }) => {
  $axios.onRequest((config) => {
    console.log('request: ', config)
  })
  // レスポンスログ
  $axios.onResponse((config) => {
    console.log('response: ', config)
  })
  // エラーログ
  $axios.onError((e) => {
    console.log('axiosError: ', e.response)
    if (e.response.status === 504) {
      // redirect('./app/views/error.html')
      error({
        statusCode: e.response.status,
        message: e.response.data.message,
      })
    }
  })
  // Q)ココの書き方いまいちわからない。分割代入はどこの配列？を引っ張ってきてるの？
  // Q)$のつくaxiosは何？
  // A)pluginのexport default(context)<-第一引数context。
  // A)その中の$axiosやerrorを使う
}
