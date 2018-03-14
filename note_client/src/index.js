import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { UrlBuilder } from './util/url-builder'
import { API_URL } from './resource/urls'
import { NoteController } from './controller/note'

Vue.use(BootstrapVue)

let controller = new NoteController(
  (new UrlBuilder(API_URL)).build()
)

let app = new Vue({
  el: '#app',
  components: {
  },
  data: {
    controller: controller
  },
  mounted() {
    this.$nextTick(() => {
      controller.ready()
    })
  }
})
