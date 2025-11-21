export const fetchDemandes = async () => {
  const response = await fetch('http://localhost:5000/api/v1/demandes');
  return await response.json();
};

export const updateStatut = async (id, statut) => {
  await fetch(`http://localhost:5000/api/v1/demandes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ statut })
  });
};