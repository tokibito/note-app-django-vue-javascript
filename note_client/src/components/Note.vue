<template>
<div class="app">
  <index
    class="index col-md-3"
    :pages="controller.pages"
    :selected-page="controller.selectedPage"
    @select-page="selectPage"
  ></index>
  <div class="editor col-md-9">
    <div v-if="controller.selectedPage">
      <editor
        :page="controller.selectedPage"
      ></editor>
      <button
        type="button"
        class="btn btn-primary col-md-12"
        accesskey="s"
        @click="save"
        :class="{disabled:!controller.selectedPage.taint}"
      >保存 (S)</button>
      <button
        type="button"
        class="btn btn-success col-md-12"
        @click="destroy"
      >削除</button>
    </div>
    <button
      type="button"
      class="btn btn-success col-md-12"
      @click="create"
    >新規</button>
  </div>
</div>
</template>

<script>
import Index from './Index.vue'
import Editor from './Editor.vue'
import '../style/Note.scss'
import csrfToken from '../util/csrf-token'

module.exports = {
  props: ['controller'],
  components: {
    Index,
    Editor
  },
  methods: {
    selectPage(page) {
      this.controller.selectPage(page)
    },
    save() {
      this.controller.save(csrfToken.getCsrfTokenFromCookie(document.cookie))
    },
    destroy() {
      this.controller.destroy(csrfToken.getCsrfTokenFromCookie(document.cookie))
    },
    create() {
      this.controller.create()
    }
  }
}
</script>
