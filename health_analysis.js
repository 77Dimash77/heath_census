let allConditions = [];

fetch('health_analysis.json')
  .then(response => response.json())
  .then(data => {
    allConditions = data.conditions;
    renderConditions(allConditions);
  })
  .catch(err => console.error('Failed to load JSON:', err));

function renderConditions(conditions) {
  const container = document.getElementById('conditions-container');
  container.innerHTML = '';

  if (conditions.length === 0) {
    container.innerHTML = '<p>No conditions found.</p>';
    return;
  }

  conditions.forEach(condition => {
    const card = document.createElement('div');
    card.classList.add('card');

    const symptomsList = condition.symptoms.map(s => `<li>${s}</li>`).join('');
    const preventionList = condition.prevention.map(p => `<li>${p}</li>`).join('');

    card.innerHTML = `
      <img src="${condition.imagesrc}" alt="${condition.name}" onerror="this.style.display='none'" />
      <h2>${condition.name}</h2>
      <h3>Symptoms</h3>
      <ul>${symptomsList}</ul>
      <h3>Prevention</h3>
      <ul>${preventionList}</ul>
      <h3>Treatment</h3>
      <p>${condition.treatment}</p>
    `;

    container.appendChild(card);
  });
}

function filterConditions() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = allConditions.filter(c => c.name.toLowerCase().includes(query));
  renderConditions(filtered);
}
