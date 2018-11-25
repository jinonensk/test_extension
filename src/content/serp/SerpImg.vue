<template>
  <div
    :style="background"
    class="test-task-serp-image"
  >
  </div>
</template>

<script>
export default {
  props: {
    serpUrl: {
      type: String,
      default: '',
    },
  },
  computed: {
    background() {
      return `background-image: url(${this.serpUrl})`;
    },
  },
};
</script>

<style scoped lang="less">
.test-task-serp-image {
  display: inline-block;
  margin-right: 5px;
  width: 16px;
  height: 16px;
}
</style>
