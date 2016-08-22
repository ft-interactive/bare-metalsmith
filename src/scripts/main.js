const List = window.List;
const listOptions = {
  valueNames: ['collection1', 'collection2', 'company'],
};
const feed = new List('feed', listOptions);
const collectionsLookup = {
  financial: 'Financial Gain',
  profit: 'Profit Warning',
  jobs: 'Jobs',
  asset: 'Asset Sales',
  credit: 'Credit Downgrade',
  fundraising: 'Fundraising',
  relocation: 'HQ Relocation',
  investment: 'Investment',
  market: 'Market Access Warning',
  mergers: 'Mergers &amp; Acquisitions',
  outlook: 'Outlook Warning',
  'profit-fall': 'Profit Fall',
  'revenue-fall': 'Revenue Fall',
};
const customSearch = document.getElementById('custom-search');
const $ = window.jQuery;

function filterByCollection(collectionName) {
  feed.filter((item) => {
    if (item.values().collection1 === collectionName ||
      item.values().collection2 === collectionName) {
      return true;
    }

    return false;
  });

  console.log(`${collectionName} filter applied`);
}

function initFilters() {
  const filters = document.getElementsByClassName('collection-filter');
  const resetFilter = document.getElementById('reset');

  function clearClicked() {
    [].forEach.call(filters, (filter) => {
      filter.classList.remove('clicked');
    });
  }

  [].forEach.call(filters, (el) => {
    const button = el;

    button.onclick = () => {
      clearClicked();

      filterByCollection(collectionsLookup[button.id]);

      el.classList.add('clicked');
    };
  });

  resetFilter.onclick = () => {
    feed.filter();
    clearClicked();
    console.log('Filter reset');
  };
}

window.onload = () => {
  initFilters();
};

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
  source: Array.from(uniqueCompanies),
});
