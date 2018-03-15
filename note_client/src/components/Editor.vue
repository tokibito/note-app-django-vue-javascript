<template>
<div class="form-group">
  <input type="text" class="form-control" placeholder="タイトルを入力" v-model="page.title">
  <textarea class="form-control" rows="20" placeholder="内容" v-model="page.content"></textarea>
</div>
</template>

<script>
module.exports = {
  props: ['page']
}
</script>
