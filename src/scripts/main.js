const List = window.List;
const listOptions = {
  valueNames: ['collection1', 'collection2', 'company']
};
const feed = new List('feed', listOptions);
const customSearch = document.getElementById('custom-search');
const $ = window.jQuery;

function filterByCollection(collectionName) {
  feed.filter(function(item) {
    if (item.values().collection1 == collectionName || item.values().collection2 == collectionName) {
      return true;
    } else {
      return false;
    }
  });

  console.log(collectionName + ' filter applied');
}

function initFilters() {
  const allFilters = document.getElementsByClassName('collection-filter');
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
  const profitFallFilter = document.getElementById('profit-fall');
  const revenueFallFilter = document.getElementById('revenue-fall');

  function clearClicked() {
    [].forEach.call(allFilters, function(filter) {
        filter.classList.remove('clicked');
    });
  }

  resetFilter.onclick = () => {
    feed.filter();
    clearClicked();
    console.log('Filter reset');
  };

  financialFilter.onclick = () => {
    filterByCollection('Financial Gain');
    clearClicked();
    financialFilter.classList.add('clicked');
  };

  profitFilter.onclick = () => {
    filterByCollection('Profit Warning');
    clearClicked();
    profitFilter.classList.add('clicked');
  };

  jobsFilter.onclick = () => {
    filterByCollection('Jobs');
    clearClicked();
    jobsFilter.classList.add('clicked');
  };

  assetFilter.onclick = () => {
    filterByCollection('Asset Sales');
    clearClicked();
    assetFilter.classList.add('clicked');
  };

  creditFilter.onclick = () => {
    filterByCollection('Credit Downgrade');
    clearClicked();
    creditFilter.classList.add('clicked');
  };

  fundraisingFilter.onclick = () => {
    filterByCollection('Fundraising');
    clearClicked();
    fundraisingFilter.classList.add('clicked');
  };

  relocationFilter.onclick = () => {
    filterByCollection('HQ Relocation');
    clearClicked();
    relocationFilter.classList.add('clicked');
  };

  investmentFilter.onclick = () => {
    filterByCollection('Investment');
    clearClicked();
    investmentFilter.classList.add('clicked');
  };

  marketFilter.onclick = () => {
    filterByCollection('Market Access Warning');
    clearClicked();
    marketFilter.classList.add('clicked');
  };

  mergersFilter.onclick = () => {
    filterByCollection('Mergers &amp; Acquisitions');
    clearClicked();
    mergersFilter.classList.add('clicked');
  };

  outlookFilter.onclick = () => {
    filterByCollection('Outlook Warning');
    clearClicked();
    outlookFilter.classList.add('clicked');
  };

  profitFallFilter.onclick = () => {
    filterByCollection('Profit Fall');
    clearClicked();
    profitFallFilter.classList.add('clicked');
  };

  revenueFallFilter.onclick = () => {
    filterByCollection('Revenue Fall');
    clearClicked();
    revenueFallFilter.classList.add('clicked');
  };
}

// Custom search, restricted to 'company' field only
customSearch.onkeyup = () => {
   const searchString = customSearch.value.replace('&', '&amp;');

   feed.search(searchString, ['company']);

   console.log(searchString);
};

// Autocomplete for search input
const allCompanies = [];
let uniqueCompanies = {};

feed.items.forEach((item) => {
  allCompanies.push(item.values().company.replace(/&amp;/g, '&'));
});

uniqueCompanies = new Set(allCompanies);

$('#custom-search').autocomplete({
  source: Array.from(uniqueCompanies)
});
