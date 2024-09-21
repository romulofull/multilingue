import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {
  const [texto, setTexto] = useState('');
  const [traducciones, setTraducciones] = useState({});
  const idiomas = ['de', 'it', 'en', 'pt', 'fr', 'he'];

  const traducirTexto = async () => {
    const promesas = idiomas.map(async (idioma) => {
      const respuesta = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: texto,
          langpair: `es|${idioma}`,
        },
      });
      return { [idioma]: respuesta.data.responseData.translatedText };
    });

    const resultados = await Promise.all(promesas);
    const traduccionesCombinadas = resultados.reduce((acumulador, actual) => ({ ...acumulador, ...actual }), {});
    setTraducciones(traduccionesCombinadas);
  };

  return (
    <div className="app-container">
      <h1 className="title">Traductor de Español a 6 Idiomas</h1>
      <textarea
        className="input-textarea"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe tu frase larga aquí"
      />
      <button className="translate-button" onClick={traducirTexto}>Traducir</button>
      <h2 className="subtitle">Traducciones:</h2>
      <ul className="translation-list">
        {Object.entries(traducciones).map(([idioma, textoTraducido]) => (
          <li key={idioma}>
            {idioma === 'de' && 'Alemán'}
            {idioma === 'it' && 'Italiano'}
            {idioma === 'en' && 'Inglés'}
            {idioma === 'pt' && 'Portugués'}
            {idioma === 'fr' && 'Francés'}
            {idioma === 'he' && 'Hebreo'}: {textoTraducido}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
