import Vue from 'vue';
import AppSerp from './SerpImg.vue';

export default function addSerp() {
  let siteListForSerp = [];
  const locationDomain = location.hostname;
  let merchants = [];

  const searchSystems = [
    {
      domain: 'www.google.ru',
      selector: '#res a:not([class])',
    },
    {
      domain: 'www.google.com',
      selector: '#res a:not([class])',
    },
    {
      domain: 'www.bing.com',
      selector: '#b_results h2 a',
    },
  ];

  for (let i = 0; i < searchSystems.length; i++) {
    if (searchSystems[i].domain.match(locationDomain)) {
      merchants = document.querySelectorAll(searchSystems[i].selector);

      // load current site list
      chrome.storage.local.get(['sites'], (result) => {
        siteListForSerp = result.sites;

        for (let k = 0; k < siteListForSerp.length; k++) {
          const siteListDomain = siteListForSerp[k].domain;

          for (let j = 0; j < merchants.length; j++) {
            const currentMerchant = merchants[j].host;
            const currentMerchantHref = merchants[j].href;

            if (currentMerchant.match(siteListDomain)) {
              // add icon to matched sites
              const div = document.createElement('div');
              // div.style.backgroundImage = `url(${chrome.extension.getURL('/img/serp_16.png')})`;
              div.id = 'test-task-serp-image';
              document
                .querySelector(`a[href="${currentMerchantHref}"]`)
                .insertBefore(
                  div,
                  document.querySelector(`a[href="${currentMerchantHref}"]`).firstChild,
                );

              // get Url for img
              const serpUrl = chrome.extension.getURL('/img/serp_16.png');

              (function initWindow() {
                const vm = new Vue({
                  el: '#test-task-serp-image',
                  render: h => h(AppSerp, {
                    props: {
                      serpUrl,
                    },
                  }),
                });
              }());
            }
          }
        }
      });
    }
  }
}

