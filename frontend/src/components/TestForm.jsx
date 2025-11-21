import React, { useState } from 'react';

export default function TestForm() {
  const [value, setValue] = useState('');

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Valeur soumise : ${value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="testInput">Test input</label>
      <input id="testInput" name="testInput" value={value} onChange={handleChange} />
      <button type="submit">Envoyer</button>
    </form>
  );
}
