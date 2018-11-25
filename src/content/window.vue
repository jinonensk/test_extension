<template>
  <div
    v-if="showWindow"
    class="tt-window"
  >
    <div class="tt-window__body">
      <p>Message:</p>
      <p>
        {{ message }}
      </p>
    </div>
    <div class="tt-window__button-row">
      <button
        class="tt-window__button-close"
        title="Close"
        @click="windowClose"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentName: {
      type: String,
      default: '',
    },
    currentDomain: {
      type: String,
      default: '',
    },
    currentMessage: {
      type: String,
      default: '',
    },
    // showWindow: {
    //   type: Boolean,
    //   default: false,
    // },
    numberOfRun: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showWindow: true,
    };
  },
  computed: {
    message() {
      return this.currentMessage;
    },
    // isShowWindow() {
    //   return this.showWindow;
    // },
  },
  methods: {
    windowClose() {
      this.showWindow = false;
      this.numberOfRun[this.currentDomain] = 3;
      chrome.storage.local.set({ listOfRun: this.numberOfRun });
    },
  },
};
</script>

<style scoped lang="less">
@background-color: rgb(255, 253, 253);
@text-color: rgb(59, 59, 59);
@shadow: gray;
@blue: #0085dd;
@dark-blue: #0062a3;
@bottom-text-color: white;

.tt-window {
  position: absolute;
  z-index: 999;

  max-width: 250px;
  right: 100px;
  top: 50px;
  padding: 30px 15px 15px 25px;
  margin: 0;

  border: none;
  background-color: @background-color;
  box-shadow: 0 0 10px @shadow;

  &__body {
    padding: 0;
    margin-bottom: 15px;

    font-size: 24px;
    line-height: 34px;
    font-family: Georgia, "Times New Roman", Times, serif;
    color: @text-color;
  }

  &__button-row {
    text-align: right;
  }

  &__button-close {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 10px;

    outline: none;
    border: none;
    border-radius: 5px;
    box-shadow: 0 1px 2px @dark-blue;

    background-color: @blue;
    background-image: linear-gradient(to bottom, @blue, @dark-blue);

    text-decoration: none;
    color: @bottom-text-color;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 14px;
    text-shadow: 0 1px 1px @shadow;
    letter-spacing: 1px;

    &:hover {
      background-color: @dark-blue;
      cursor: pointer;
    }

    &:active {
      background-color: @blue;
      box-shadow: none;
    }
  }
}
</style>
