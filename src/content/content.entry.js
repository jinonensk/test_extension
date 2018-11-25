import Vue from 'vue';
import AppWindow from './window.vue';
import addSerp from './serp/serp';

addSerp();

// load current site list
chrome.storage.local.get(['sites'], (result) => {
  const siteList = result.sites || {};
  const locationDomain = location.hostname;

  for (let i = 0; i < siteList.length; i++) {
    const siteListDomain = siteList[i].domain;

    if (locationDomain.match(siteListDomain)) {
      // create place for vue component
      const div = document.createElement('div');
      div.id = 'test-task-window';
      document.body.insertBefore(div, document.body.firstChild);

      // load current run list
      let numberOfRun = {};
      chrome.storage.local.get(['listOfRun'], (res) => {
        numberOfRun = res.listOfRun || {};

        numberOfRun[siteList[i].domain]
        ? numberOfRun[siteList[i].domain]++
        : numberOfRun[siteList[i].domain] = 1;

        if (numberOfRun[siteList[i].domain] <= 3) {
          // const isShow = true;
          chrome.storage.local.set({ listOfRun: numberOfRun });

          (function initWindow() {
            if (document.getElementsByTagName('body').length < 1) {
              setTimeout(initWindow, 100);

              // render vue component
            } else {
              window.huy = new Vue({
                el: '#test-task-window',
                render: h => h(AppWindow, {
                  props: {
                    // showWindow: isShow,
                    currentName: siteList[i].name,
                    currentDomain: siteList[i].domain,
                    currentMessage: siteList[i].message,
                    numberOfRun,
                  },
                }),
              });
            }
          }());
        }
      });
    }
  }
});
