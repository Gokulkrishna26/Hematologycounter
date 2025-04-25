const cellTypes = ['neutrophils', 'lymphocytes', 'blasts', 'eosinophils', 'basophils'];
let total = 0;
const counts = {
  neutrophils: 0,
  lymphocytes: 0,
  blasts: 0,
  eosinophils: 0,
  basophils: 0
};
const limit = 100;

function increment(cellType) {
  if (total >= limit) {
    alert("Limit of 100 cells reached.");
    return;
  }
  counts[cellType]++;
  total++;
  document.getElementById(cellType).textContent = counts[cellType];
}

function resetCounts() {
  total = 0;
  cellTypes.forEach(type => {
    counts[type] = 0;
    document.getElementById(type).textContent = '0';
  });
}