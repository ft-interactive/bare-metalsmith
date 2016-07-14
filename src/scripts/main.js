const List = window.List;
const listOptions = {
  valueNames: ['collection1', 'collection2']
};
const feed = new List('feed', listOptions);
let activeFilters = [];

function filterByCollection(collectionName) {
  if (activeFilters.length == 1) {
    activeFilters.push(collectionName);

    feed.filter(function(item) {
      if (activeFilters.indexOf(item.values().collection1) > -1 && activeFilters.indexOf(item.values().collection2) > -1) {
        return true;
      } else {
        return false;
      }
    });

    console.log(collectionName + ' filter applied');
  } else if (activeFilters.length == 0) {
    activeFilters.push(collectionName);

    feed.filter(function(item) {
      if (item.values().collection1 == collectionName || item.values().collection2 == collectionName) {
        return true;
      } else {
        return false;
      }
    });

    console.log(collectionName + ' filter applied');
  } else {
    feed.filter(function() {
      return null;
    });

    console.log('That\'s all, folks');
  }
}

function initFilters() {
  const resetFilter = document.getElementById('reset');
  const financialFilter = document.getElementById('financial');
  const profitFilter = document.getElementById('profit');
  const jobsFilter = document.getElementById('jobs');
  const assetFilter = document.getElementById('asset');
  const creditFilter = document.getElementById('credit');
  const fundraisingFilter = document.getElementById('fundraising');
  const relocationFilter = document.getElementById('relocation');
  const investmentFilter = document.getElementById('investment');
  const marketFilter = document.getElementById('market');
  const mergersFilter = document.getElementById('mergers');
  const outlookFilter = document.getElementById('outlook');

  resetFilter.onclick = () => {
    activeFilters = [];

    feed.filter();

    console.log('Filters reset');
  };

  financialFilter.onclick = () => {
    filterByCollection('Financial Gain');
  };

  profitFilter.onclick = () => {
    filterByCollection('Profit Warning');
  };

  jobsFilter.onclick = () => {
    filterByCollection('Jobs');
  };

  assetFilter.onclick = () => {
    filterByCollection('Asset Sales');
  };

  creditFilter.onclick = () => {
    filterByCollection('Credit Downgrade');
  };

  fundraisingFilter.onclick = () => {
    filterByCollection('Fundraising');
  };

  relocationFilter.onclick = () => {
    filterByCollection('HQ Relocation');
  };

  investmentFilter.onclick = () => {
    filterByCollection('Investment');
  };

  marketFilter.onclick = () => {
    filterByCollection('Market Access Warning');
  };

  mergersFilter.onclick = () => {
    filterByCollection('Mergers & Acquisitions');
  };

  outlookFilter.onclick = () => {
    filterByCollection('Outlook Warning');
  };
}
