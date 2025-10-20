// --- Loader de SVGs para la sección Retrato ---
const svgData = [
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

// --- Función para cargar todos los SVGs dinámicamente ---
async function loadAllSVGs() {
  try {
    const fetchPromises = svgData.map(item =>
      fetch(item.url).then(res => {
        if (!res.ok) throw new Error(`Error cargando ${item.url}: ${res.statusText}`);
        return res.text();
      })
    );

    const svgs = await Promise.all(fetchPromises);

    svgs.forEach((svgContent, index) => {
      const container = document.getElementById(svgData[index].containerId);
      if (container) container.innerHTML = svgContent;
    });
  } catch (error) {
    console.error('Error al cargar los SVG:', error);
  }
}

// Ejecutar al cargar el script
loadAllSVGs();
