/*
 * クライアントアプリケーションのエントリポイント
 */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style/font-awesome-config.scss'
import './style/navigation.scss'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import { NoteController } from './controller/note'
import { UrlBuilder } from './util/url-builder'
import { API_URL } from './resource/urls'

import Index from './components/Index.vue'
import Editor from './components/Editor.vue'
import Note from './components/Note.vue'

Vue.use(BootstrapVue)

let controller = new NoteController(
  (new UrlBuilder(API_URL)).build()
)

Vue.component('index', Index)
Vue.component('editor', Editor)
Vue.component('note', Note)

let app = new Vue({
  el: '#app',
  components: {
    Note
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
