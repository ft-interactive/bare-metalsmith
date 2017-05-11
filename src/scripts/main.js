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
  dividends: 'Dividends',
  'office-moves': 'Office Moves',
  'job-cuts': 'Job Cuts',
  'jobs-outlook': 'Jobs Outlook',
};
const customSearch = document.getElementById('custom-search');
const $ = window.jQuery;
const listLength = feed.items.length;
let numVisibleItems = 10;
let numHiddenItems = listLength - numVisibleItems;

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

      feed.show(1, listLength);

      $('#load-more').hide();
    };
  });

  resetFilter.onclick = () => {
    feed.filter();

    feed.show(1, numVisibleItems);

    clearClicked();

    $('#load-more').show();

    console.log('Filters reset');
  };
}

window.onload = () => {
  feed.show(1, numVisibleItems);

  initFilters();

  console.log(`Showing list items 1-${numVisibleItems} of ${listLength}`);
  console.log(`${numHiddenItems} items hidden`);
};

// Custom search, restricted to 'company' field only
customSearch.onkeyup = () => {
  const searchString = customSearch.value.replace('&', '&amp;');

  feed.search(searchString, ['company']);
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

// "Load more" functionality
$('#load-more').click(() => {
  if (numHiddenItems >= 10) {
    numVisibleItems += 10;
    numHiddenItems -= 10;
  } else {
    numVisibleItems += numHiddenItems;
    numHiddenItems = 0;

    $('#load-more').hide();
  }

  feed.show(1, numVisibleItems);

  // console.log(`Showing list items 1-${numVisibleItems} of ${listLength}`);
  // console.log(`${numHiddenItems} items hidden`);
});
