// portrait-svg-loader.js
(function () {
  // --- Rutas exactas (con ?raw=true para imágenes) ---
  const mediaData = [
    // Imágenes (usa ?raw=true para servir correctamente desde GitHub)
    {
      url: 'https://raw.githubusercontent.com/alexander7l/Flowers-Diana-Gift-Background-/main/Background6.png',
      containerSelector: '.image-container',
      type: 'image',
      alt: 'Background Image',
      className: null
    },
    {
      url: "https://raw.githubusercontent.com/alexander7l/Flowers-Diana-Gift-Background-/main/Diana%27s%20Flowers%20Gift.png",
      containerSelector: '.fade-container',
      type: 'image',
      alt: 'Fade Image',
      className: 'fade-image'
    },

    // SVGs
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/main-svg.svg', containerId: 'neon-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/font-name.svg', containerId: 'font-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/left-heart.svg', containerId: 'left-heart-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/right-heart.svg', containerId: 'right-heart-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/necklace.svg', containerId: 'necklace-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/vertical-msg.svg', containerId: 'vertical-msg-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/i-love-you.svg', containerId: 'i-love-you-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/i-want-you.svg', containerId: 'i-want-you-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/you-and-i.svg', containerId: 'you-and-i-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/kitty.svg', containerId: 'kitty-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/melody.svg', containerId: 'melody-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/be-mine.svg', containerId: 'be-mine-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/even-in-my-dreams.svg', containerId: 'horizontal-msg-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/left-star.svg', containerId: 'left-star-container', type: 'svg' },
    { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/right-star.svg', containerId: 'right-star-container', type: 'svg' }
  ];

  // --- Función principal ---
  async function loadPortraitAssets() {
    try {
      // Para cada item elegimos la estrategia de carga según tipo
      const promises = mediaData.map(item => {
        if (item.type === 'image') {
          // Para imágenes simple comprobación de acceso (head request no necesario)
          // devolvemos el objeto item para procesarlo directamente (sin fetch),
          // excepto si quieres validar existencia vía fetch.
          return Promise.resolve(item);
        } else {
          // SVG: fetch del texto
          return fetch(item.url)
            .then(res => {
              if (!res.ok) throw new Error(`Error cargando ${item.url}: ${res.status} ${res.statusText}`);
              return res.text().then(text => ({ ...item, content: text }));
            });
        }
      });

      const results = await Promise.all(promises);

      results.forEach(result => {
        // Si es item de imagen (no tiene 'content')
        if (result.type === 'image') {
          const container = document.querySelector(result.containerSelector);
          if (!container) {
            console.warn('Container no encontrado para imagen:', result.containerSelector);
            return;
          }

          // Si ya existe un <img> dentro, actualizamos su src
          const existingImg = container.querySelector('img');
          if (existingImg) {
            existingImg.src = result.url + (result.url.includes('?') ? '' : '');
            existingImg.alt = result.alt || '';
            if (result.className) existingImg.classList.add(result.className);
          } else {
            // Crear nueva img
            const img = document.createElement('img');
            img.src = result.url;
            img.alt = result.alt || '';
            if (result.className) img.classList.add(result.className);
            // Limpiamos el contenedor para evitar duplicados y añadimos
            container.innerHTML = '';
            container.appendChild(img);
          }

        } else if (result.type === 'svg') {
          const container = document.getElementById(result.containerId);
          if (!container) {
            console.warn('Container no encontrado para SVG:', result.containerId);
            return;
          }
          container.innerHTML = result.content || '';
        }
      });
    } catch (err) {
      console.error('Error en loadPortraitAssets():', err);
    }
  }

  // Ejecutar inmediatamente (este archivo debe ser cargado después del HTML o como external script al final)
  loadPortraitAssets();
})();
