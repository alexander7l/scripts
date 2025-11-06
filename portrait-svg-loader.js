// --- Loader de SVGs para la sección Retrato ---

// 🔗 Link base configurable (solo cambia aquí si cambias repo o usuario)
const baseURL = 'https://raw.githubusercontent.com/alexander7l/svg-s/main/';

// Lista de SVGs (solo el nombre del archivo y el contenedor)
const svgData = [
  { file: 'main-svg.svg', containerId: 'neon-container' },
  { file: 'font-name.svg', containerId: 'font-container' },
  { file: 'left-heart.svg', containerId: 'left-heart-container' },
  { file: 'right-heart.svg', containerId: 'right-heart-container' },
  { file: 'necklace.svg', containerId: 'necklace-container' },
  { file: 'vertical-msg.svg', containerId: 'vertical-msg-container' },
  { file: 'i-love-you.svg', containerId: 'i-love-you-container' },
  { file: 'i-want-you.svg', containerId: 'i-want-you-container' },
  { file: 'you-and-i.svg', containerId: 'you-and-i-container' },
  { file: 'kitty.svg', containerId: 'kitty-container' },
  { file: 'melody.svg', containerId: 'melody-container' },
  { file: 'be-mine.svg', containerId: 'be-mine-container' },
  { file: 'even-in-my-dreams.svg', containerId: 'horizontal-msg-container' },
  { file: 'left-star.svg', containerId: 'left-star-container' },
  { file: 'right-star.svg', containerId: 'right-star-container' }
];

// --- Función para cargar todos los SVGs dinámicamente ---
async function loadAllSVGs() {
  try {
    const fetchPromises = svgData.map(item =>
      fetch(baseURL + item.file).then(res => {
        if (!res.ok) throw new Error(`Error cargando ${item.file}: ${res.statusText}`);
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

// --- Ejecutar al cargar el script ---
loadAllSVGs();
