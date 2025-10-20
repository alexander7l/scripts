// --- Loader dinámico de SVGs e Imágenes para la sección Retrato ---
const mediaData = [
  // --- Imágenes originales del HTML ---
  {
    url: 'https://raw.githubusercontent.com/alexander7l/Flowers-Diana-Gift-Background-/main/Background6.png',
    containerSelector: '.image-container',
    type: 'image',
    alt: 'Background Image',
    className: null
  },
  {
    url: 'https://raw.githubusercontent.com/alexander7l/Flowers-Diana-Gift-Background-/main/Diana%27s%20Flowers%20Gift.png',
    containerSelector: '.fade-container',
    type: 'image',
    alt: 'Fade Image',
    className: 'fade-image'
  },

  // --- SVGs ---
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/main-svg.svg', containerId: 'neon-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/font-name.svg', containerId: 'font-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/left-heart.svg', containerId: 'left-heart-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/right-heart.svg', containerId: 'right-heart-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/necklace.svg', containerId: 'necklace-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/vertical-msg.svg', containerId: 'vertical-msg-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/i-love-you.svg', containerId: 'i-love-you-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/i-want-you.svg', containerId: 'i-want-you-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/you-and-i.svg', containerId: 'you-and-i-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/kitty.svg', containerId: 'kitty-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/melody.svg', containerId: 'melody-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/be-mine.svg', containerId: 'be-mine-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/even-in-my-dreams.svg', containerId: 'horizontal-msg-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/left-star.svg', containerId: 'left-star-container' },
  { url: 'https://raw.githubusercontent.com/alexander7l/svg-s/main/right-star.svg', containerId: 'right-star-container' }
];

// --- Función para cargar dinámicamente imágenes y SVGs ---
async function loadPortraitAssets() {
  try {
    const fetchPromises = mediaData.map(item =>
      fetch(item.url).then(res => {
        if (!res.ok) throw new Error(`Error cargando ${item.url}: ${res.statusText}`);
        return item.type === 'image' ? res.blob() : res.text();
      })
    );

    const contents = await Promise.all(fetchPromises);

    contents.forEach((content, index) => {
      const item = mediaData[index];

      if (item.type === 'image') {
        const container = document.querySelector(item.containerSelector);
        if (!container) return;

        const img = document.createElement('img');
        img.src = URL.createObjectURL(content);
        img.alt = item.alt || '';
        if (item.className) img.classList.add(item.className);

        // Reemplaza cualquier imagen anterior (mantiene HTML limpio)
        container.innerHTML = '';
        container.appendChild(img);
      } else {
        const container = document.getElementById(item.containerId);
        if (container) container.innerHTML = content;
      }
    });
  } catch (error) {
    console.error('Error al cargar los elementos del retrato:', error);
  }
}

// --- Ejecutar automáticamente ---
loadPortraitAssets();
