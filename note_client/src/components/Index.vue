<template>
<ul class="list-group">
  <li
    class="list-group-item"
    v-for="(page, index) in pages"
    :class="{active: selected(page)}"
    @click="$emit('select-page', page)">
    <span v-if="page.taint">* </span>{{ page.title }}
  </li>
</ul>
</template>

<script>
module.exports = {
  props: ['pages', 'selectedPage'],
  methods: {
    selected(page) {
      return this.selectedPage == page;
    }
  }
}
</script>
