// --- Loader de SVGs para el MP3 Player ---

// 🔗 Link base configurable (solo cambia aquí si cambias repo o usuario)
const baseURLmp3 = 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/';

// Lista de SVGs (solo el nombre del archivo y el contenedor)
const mp3SvgData = [
  { file: 'circle.svg', containerId: 'circle' },
  { file: 'play.svg', containerId: 'play-icon' },
  { file: 'pause.svg', containerId: 'pause-icon' },
  { file: 'comment.svg', containerId: 'comment-icon' },
  { file: 'info.svg', containerId: 'info-icon' },
  { file: 'like-off.svg', containerId: 'like-off-icon' },
  { file: 'like-on.svg', containerId: 'like-on-icon' },
  { file: 'list.svg', containerId: 'list-icon' },
  { file: 'next.svg', containerId: 'next-icon' },
  { file: 'previous.svg', containerId: 'previous-icon' },
  { file: 'repeat.svg', containerId: 'repeat-all-icon' },
  { file: 'repeat-one.svg', containerId: 'repeat-one-icon' },
  { file: 'share.svg', containerId: 'share-icon' },
  { file: 'shuffle.svg', containerId: 'shuffle-icon' },
  { file: 'more.svg', containerId: 'more-icon' },
  { file: 'youtube.svg', containerId: 'youtube-icon' }
];

// --- Función para cargar todos los SVGs dinámicamente ---
async function loadMp3SVGs() {
  try {
    const fetchPromises = mp3SvgData.map(item =>
      fetch(baseURLmp3 + item.file).then(res => {
        if (!res.ok) throw new Error(`Error cargando ${item.file}: ${res.statusText}`);
        return res.text();
      })
    );

    const svgs = await Promise.all(fetchPromises);

    svgs.forEach((svgContent, index) => {
      const container = document.getElementById(mp3SvgData[index].containerId);
      if (container) container.innerHTML = svgContent;
    });

  } catch (error) {
    console.error('Error al cargar los SVG dinámicos:', error);
  }
}

// --- Ejecutar al cargar el script ---
loadMp3SVGs();
