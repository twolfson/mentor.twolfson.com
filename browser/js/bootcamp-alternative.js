// JS specific for bootcamp-alternative page (page-specific JS is an anti-pattern)
// When the page loads
// http://youmightnotneedjquery.com/#ready
// http://youmightnotneedjquery.com/#on
document.addEventListener('DOMContentLoaded', function handleReady () {
  // Define our compare change handler
  var lastSelection = 0;
  var selectEl = document.getElementById('compare-bootcamp-select');
  if (!selectEl) { throw new Error('Unable to find #compare-bootcamp-select'); }
  function handleCompareChange(evtOrNull) {
    // Resolve our current selection
    var currentSelection = selectEl.selectedIndex;

    // If our selection is unchanged, then do nothing
    if (lastSelection === currentSelection) {
      return;
    }

    // Otherwise, handle our change
    lastSelection = currentSelection;
    var compareInfoJSON = selectEl.options[currentSelection].getAttribute('data-compare-info');
    // DEV: We have to encode with quotes to avoid escaping to `&quot;` which is valid
    var compareInfo = JSON.parse(compareInfoJSON.replace(/'/g, '"'));
    document.getElementById('infrequent-cost').textContent = compareInfo.infrequent.cost;
    document.getElementById('infrequent-savings').textContent = compareInfo.infrequent.savings;
    document.getElementById('infrequent-sessions').textContent = compareInfo.infrequent.sessions;
    document.getElementById('regular-cost').textContent = compareInfo.regular.cost;
    document.getElementById('regular-savings').textContent = compareInfo.regular.savings;
    document.getElementById('regular-sessions').textContent = compareInfo.regular.sessions;
    document.getElementById('frequent-cost').textContent = compareInfo.frequent.cost;
    document.getElementById('frequent-savings').textContent = compareInfo.frequent.savings;
    document.getElementById('frequent-sessions').textContent = compareInfo.frequent.sessions;
  }

  // Run our compare change handler (in case the selection is off)
  handleCompareChange(null);

  // When our select option changes, run our compare change event
  selectEl.addEventListener('change', handleCompareChange);
});
