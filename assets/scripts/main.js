const mapsData = [
    {
        id: "ReMountains",
        title: "ReMountains",
        description: "Переработка карты ReMountains",
        imageCount: 5,
        preview: "assets/images/ReMountains/image1.jpg",
        driveLink: "https://drive.google.com/drive/folders/1abc123mountains"
    },
    {
        id: "ReMilitaryBase",
        title: "ReMilitaryBase",
        description: "Переработка Military Base",
        imageCount: 6,
        preview: "assets/images/ReMilitaryBase/image1.jpg",
        driveLink: "https://drive.google.com/drive/folders/2def456military"
    },
    {
        id: "ReCave",
        title: "ReCave",
        description: "Переработка карты Cave",
        imageCount: 4,
        preview: "assets/images/ReCave/image1.jpg",
        driveLink: "https://drive.google.com/drive/folders/3ghi789cave"
    },
    {
        id: "KubikiEx",
        title: "KubikiEx",
        description: "Кубики",
        imageCount: 7,
        preview: "assets/images/KubikiEx/image1.jpg",
        driveLink: "https://drive.google.com/drive/folders/4jkl012kubiki"
    }
];

function getImagePath(mapId, index) {
    return `assets/images/${mapId}/image${index}.png`;
}

function renderMapCards() {
    const container = document.getElementById('mapsContainer');
    container.innerHTML = '';
    
    mapsData.forEach(map => {
        const card = document.createElement('div');
        card.className = 'map-card';
        card.innerHTML = `
            <div class="card-header">
                <h3>${map.title}</h3>
                <p>${map.description}</p>
            </div>
            <div class="preview-container">
                <img src="${map.preview}" alt="${map.title} Preview">
                <div class="overlay">
                    <button class="view-gallery-btn" data-map="${map.id}">
                        <i class="fas fa-images"></i> Подробнее
                    </button>
                </div>
            </div>
            <div class="card-footer">
                <button class="download-btn" data-link="${map.driveLink}">
                    <i class="fas fa-download"></i> Скачать карту
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

const modal = document.getElementById('galleryModal');
const galleryImage = document.getElementById('galleryImage');
const galleryTitle = document.getElementById('galleryTitle');
const currentImg = document.getElementById('currentImg');
const totalImgs = document.getElementById('totalImgs');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const galleryDownloadBtn = document.getElementById('galleryDownloadBtn');

let currentMap = null;
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    renderMapCards();
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-gallery-btn')) {
            const btn = e.target.closest('.view-gallery-btn');
            currentMap = mapsData.find(m => m.id === btn.dataset.map);
            if (currentMap) {
                currentIndex = 1;
                openGallery(currentMap);
            }
        }
        
        if (e.target.closest('.download-btn')) {
            const btn = e.target.closest('.download-btn');
            window.open(btn.dataset.link, '_blank');
        }
    });
});

function openGallery(map) {
    galleryTitle.textContent = `Галерея: ${map.title}`;
    totalImgs.textContent = map.imageCount;
    updateGalleryImage(map.id, currentIndex);

    galleryDownloadBtn.onclick = () => {
        window.open(map.driveLink, '_blank');
    };
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function updateGalleryImage(mapId, index) {
    galleryImage.src = getImagePath(mapId, index);
    currentImg.textContent = index;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 1) {
        currentIndex--;
        updateGalleryImage(currentMap.id, currentIndex);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < currentMap.imageCount) {
        currentIndex++;
        updateGalleryImage(currentMap.id, currentIndex);
    }
});

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => e.target === modal && closeModal());
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
