<template>
<div class="app">
  <index
    :pages="controller.pages"
    :selected-page="controller.selectedPage"
    @select-page="selectPage"
  ></index>
  <div class="editor" v-if="controller.selectedPage">
    <editor
      :page="controller.selectedPage"
    ></editor>
    <button
      type="button"
      class="btn btn-primary"
      @click="$emit('save')"
      :class="{disabled:!controller.selectedPage.taint}"
    >保存</button>
  </div>
</div>
</template>

<script>
import Index from './Index.vue'
import Editor from './Editor.vue'

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
      this.controller.save()
    }
  }
}
</script>
