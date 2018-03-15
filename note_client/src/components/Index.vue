<template>
<ul class="list-group">
  <li
    class="list-group-item"
    v-for="(page, index) in pages"
    v-bind:class="{active: selected(page)}"
    v-on:click="$emit('select-page', page)">
    {{ page.title }}
  </li>
</ul>
</template>

<script>
module.exports = {
  props: ['pages', 'selectedPage'],
  methods: {
    selected: function (page) {
      return this.selectedPage == page;
    }
  }
}
</script>
