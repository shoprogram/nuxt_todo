import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#a16d75',
        secondary: '#e3aa94',
        lightShades: '#f6f8f4',
        accent: '#749899',
        error: '##979492',
      },
    },
  },
})
