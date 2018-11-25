<template>
  <li>
    <a
      :href="siteLink"
      class="site-list__link"
      target="_blank"
    >
      {{ siteRow }}
    </a>
  </li>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    domain: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    siteRow() {
      return `${this.index + 1}. ${this.name}`;
    },

    siteLink() {
      return `https://www.${this.domain}`;
    },
  },
};
</script>

<style scoped lang="less">
  @text-color: black;
  @border-color: rgba(0, 0, 0, .1);
  @test-color-hover: #bd1d00;

  .site-list__link {
      text-decoration: none;
      border-bottom: 1px solid @border-color;
      color: @text-color;

      &:hover {
        color: @test-color-hover;
    }
  }
</style>

