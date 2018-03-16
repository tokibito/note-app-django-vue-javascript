<template>
<div class="app">
  <index
    class="index col-md-3"
    :pages="controller.pages"
    :selected-page="controller.selectedPage"
    :class="{'fa': !controller.loaded, 'fa-spinner': !controller.loaded}"
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
        :disabled="!controller.selectedPage.taint"
      >保存 (S)</button>
      <button
        type="button"
        class="btn btn-success col-md-12"
        @click="revert"
        :disabled="!controller.selectedPage.taint || !controller.selectedPage.id"
      >変更を破棄</button>
      <button
        type="button"
        class="btn btn-success col-md-12"
        @click="$refs.confirmModal.show"
      >削除</button>
    </div>
    <button
      type="button"
      class="btn btn-success col-md-12"
      @click="create"
      :disabled="controller.selectedPage && controller.selectedPage.taint"
    >新規</button>
  </div>
  <b-modal
    title="エラー"
    ref="errorModal"
    header-class="bg-danger text-light"
    body-class="text-danger"
    ok-only
    centered>
    {{ message }}
  </b-modal>
  <b-modal
    title="確認"
    ref="confirmModal"
    header-class="bg-info text-light"
    @ok="destroy"
    centered>
    削除してもよろしいですか？
  </b-modal>
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
    showError(message) {
      this.message = message
      this.$refs.errorModal.show()
    },
    selectPage(page) {
      let result, message
      [result, message] = this.controller.selectPage(page)
      if (!result) {
        this.showError(message)
      }
    },
    save() {
      let result, message
      [result, message] = this.controller.save(
        csrfToken.getCsrfTokenFromCookie(document.cookie))
      if (!result) {
        this.showError(message)
      }
    },
    revert() {
      this.controller.revert()
    },
    destroy() {
      this.controller.destroy(csrfToken.getCsrfTokenFromCookie(document.cookie))
    },
    create() {
      this.controller.create()
    }
  },
  data() {
    return {
      message: ''
    }
  }
}
</script>
