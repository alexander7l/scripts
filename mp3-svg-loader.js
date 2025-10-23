// --- Loader de SVGs para el MP3 Player ---
const mp3SvgData = [
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/circle.svg', containerId: 'circle' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/play.svg', containerId: 'play-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/pause.svg', containerId: 'pause-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/comment.svg', containerId: 'comment-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/info.svg', containerId: 'info-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/like.svg', containerId: 'like-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/list.svg', containerId: 'list-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/next.svg', containerId: 'next-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/previous.svg', containerId: 'previous-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/repeat.svg', containerId: 'repeat-all-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/refs/heads/main/repeat-one.svg', containerId: 'repeat-one-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/share.svg', containerId: 'share-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/shuffle.svg', containerId: 'shuffle-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/more.svg', containerId: 'more-icon' },
  { url: 'https://raw.githubusercontent.com/alexander7l/mp3-svg-s/main/youtube.svg', containerId: 'youtube-icon' }
];

// --- Función para cargar todos los SVGs dinámicamente ---
async function loadMp3SVGs() {
  try {
    const fetchPromises = mp3SvgData.map(item =>
      fetch(item.url).then(res => {
        if (!res.ok) throw new Error(`Error cargando ${item.url}: ${res.statusText}`);
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

// Ejecutar al cargar el script
loadMp3SVGs();

