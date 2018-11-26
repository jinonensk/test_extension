import Vue from 'vue';
import AppWindow from './window.vue';
import addSerp from './serp/serp';

const runMax = 3;

const initWindow = (Name, Domain, Message, Runs) => {
  if (document.getElementsByTagName('body').length < 1) {
    setTimeout(initWindow, 100);
  } else {
    window.huy = new Vue({
      el: '#test-task-window',
      render: h => h(AppWindow, {
        props: {
          Name,
          Domain,
          Message,
          Runs,
        },
      }),
    });
  }
};

addSerp();

// load current site list
chrome.storage.local.get(['sites'], (result) => {
  const siteList = result.sites || {};
  const locationDomain = location.hostname;

  for (let i = 0; i < siteList.length; i++) {
    const [currentName, currentDomain, currentMessage]
    = [siteList[i].name, siteList[i].domain, siteList[i].message];

    if (locationDomain.match(currentDomain)) {
      // create place for vue component
      const div = document.createElement('div');
      div.id = 'test-task-window';
      document.body.insertBefore(div, document.body.firstChild);

      // load current run list
      let numberOfRun = {};
      chrome.storage.local.get(['listOfRun'], (res) => {
        numberOfRun = res.listOfRun || {};

        numberOfRun[currentDomain]
        ? numberOfRun[currentDomain]++
        : numberOfRun[currentDomain] = 1;

        if (numberOfRun[siteList[i].domain] <= runMax) {
          chrome.storage.local.set({ listOfRun: numberOfRun });

          initWindow(currentName, currentDomain, currentMessage, numberOfRun);
        }
      });
    }
  }
});
