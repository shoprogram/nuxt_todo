<template>
  <v-container grid-list-md text-xs-center>
    <v-layout justify-center>
      <v-flex class="teal lighten-3" xs4 height="1000">
        <v-card class="transparent">
          <!-- 文字横にプラスボタン作る、モーダルが出る -->
          <v-card-title class="brown--text"
            >Work
            <v-spacer />
            <!-- どこからmodalをopenしたのかのデータを載せる？ -->
            <AddButton @click="showAddModal = !showAddModal"></AddButton>
          </v-card-title>
          <v-list class="transparent">
            <v-list-item v-for="(item, i) in work" :key="i" class="black--text">
              <v-icon>mdi-radiobox-blank</v-icon>
              {{ item.todo }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex class="yellow lighten-4 ml-5" xs4>
        <v-card class="transparent">
          <v-card-title class="brown--text"
            >Private
            <v-spacer />
            <AddButton />
          </v-card-title>
          <v-list class="transparent">
            <v-list-item v-for="(item, i) in work" :key="i" class="black--text">
              <v-icon>mdi-radiobox-blank</v-icon>
              {{ item.todo }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex class="red lighten-3 ml-5" xs4>
        <v-card class="transparent">
          <v-card-title class="brown--text"
            >Ramdom Ideas
            <v-spacer />
            <AddButton />
          </v-card-title>
          <v-list class="transparent">
            <v-list-item v-for="(item, i) in work" :key="i" class="black--text">
              <v-icon>mdi-radiobox-blank</v-icon>
              {{ item.todo }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import VModal from 'vue-js-modal'
// Vue.use(VModal)
export default {
  data() {
    return {
      work: [
        {
          id: '1',
          todo: 'PCを立ち上げる',
        },
        {
          id: '2',
          todo: 'PCにお茶をこぼす',
        },
        {
          id: '3',
          rodo: 'PCをふく',
        },
      ],
    }
  },
}
</script>
