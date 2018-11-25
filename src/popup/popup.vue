<template>
  <ul class="site-list">
    <li>
      Site List:
    </li>
    <app-link
      v-for="(item, index) in sitelist"
      :key="index"
      :name="item.name"
      :domain="item.domain"
      :index="index"
    />
  </ul>
</template>

<script>
import AppLink from './link.vue';

export default {
  components: {
    AppLink,
  },

  data() {
    return {
      sitelist: [],
    };
  },

  beforeMount() {
    this.getData();
  },
  methods: {
    getData() {
      chrome.storage.local.get(['sites'], (result) => {
        const siteList = result.sites || {};
        this.sitelist.push(...siteList);
      });
    },
  },
};
</script>

<style scoped lang="less">
  .site-list {
      list-style-type: none;
      font-size: 24px;
      line-height: 34px;
      font-family: georgia, sans-serif;
  }
</style>
