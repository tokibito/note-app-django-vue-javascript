import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { UrlBuilder } from './util/url-builder'
import { API_URL } from './resource/urls'
import { NoteController } from './controller/note'
import Index from './components/Index.vue'
import Editor from './components/Editor.vue'

Vue.use(BootstrapVue)

Vue.component('index', Index)
Vue.component('editor', Editor)

let controller = new NoteController(
  (new UrlBuilder(API_URL)).build()
)

let app = new Vue({
  el: '#app',
  components: {
    Index,
    Editor
  },
  data: {
    controller: controller
  },
  methods: {
    selectPage(page) {
      controller.selectPage(page)
    },
    save() {
      controller.save()
    }
  },
  mounted() {
    this.$nextTick(() => {
      controller.ready()
    })
  }
})
