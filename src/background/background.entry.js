let siteList = [];
let lastUpdate;
const numberOfRun = {};

// update info in storage about last upd
const updateTime = () => {
  const now = new Date();
  lastUpdate = now.getTime();
  chrome.storage.local.set({ updated: lastUpdate });
};

// send request
const updateSiteList = () => {
  fetch('http://www.softomate.net/ext/employees/list.json').then((response) => {
    if (response.ok) {
      return response.json();
    }
    console.log(`Request failed with response ${response.status}: ${response.statusText}`);
    return undefined;
  }).then((json) => {
    siteList = json;
    chrome.storage.local.set({ sites: siteList });
    updateTime();

    setTimeout(updateSiteList, (1000 * 60 * 60));

    console.log(`Site list updated: ${new Date(lastUpdate).toTimeString()}`);
  });
};

chrome.storage.local.set({ listOfRun: numberOfRun });

// first launch. storage is empty
chrome.storage.local.get(['updated'], (result) => {
  lastUpdate = result.updated;

  if (!lastUpdate) {
    updateSiteList();

    // not first lauch. Check last update
  } else {
    const now = new Date();
    const timeAfterUpdate = now.getTime() - lastUpdate;

    // if more then 1 hour adter last upd
    if (timeAfterUpdate >= (1000 * 60 * 60)) {
      updateSiteList();

      // if less then 1 hour
    } else {
      const timeToUpdate = (1000 * 60 * 60) - timeAfterUpdate;
      setTimeout(updateSiteList, timeToUpdate);
    }
  }
});
