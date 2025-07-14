const mapsData = [
    {
        id: "ReMountains",
        title: "ReMountains",
        description: "Reworked Mountains map from S3",
        imageCount: 5,
        preview: "assets/images/ReMountains/image1.png",
        driveLink: "https://drive.google.com/file/d/1QkgrN-Tyz9a3O_do64CfPg2RhDJtXoWK/view?usp=sharing"
    },
    {
        id: "ReMilitaryBase",
        title: "ReMilitaryBase",
        description: "Reworked Military Base map from S3",
        imageCount: 6,
        preview: "assets/images/ReMilitaryBase/image1.png",
        driveLink: "https://drive.google.com/file/d/1pardfPkhOKIlQscxv40gJRL2rcBmFf8z/view?usp=sharing"
    },
    {
        id: "ReCave",
        title: "ReCave",
        description: "Reworked Cave map from S3",
        imageCount: 4,
        preview: "assets/images/ReCave/image1.png",
        driveLink: "https://drive.google.com/file/d/1bILby9ZdawR0xLIhrflSWsHrt9pYzcEP/view?usp=sharing"
    },
    {
        id: "KubikiEx",
        title: "KubikiEx",
        description: "Kubiki. ALMOST everything done using cubes",
        imageCount: 7,
        preview: "assets/images/KubikiEx/image1.png",
        driveLink: "https://drive.google.com/file/d/1nrvYY5sOiFCMul1eVrCH2iiFOp9p00Ut/view?usp=sharing"
    },
    {
        id: "Sanatorium",
        title: "Sanatorium Retouched",
        description: "Retouched version of Sanatorium with expanded visual and texture fixes",
        imageCount: 7,
        preview: "assets/images/Sanatorium\ Retouched/image1.png",
        driveLink: "https://drive.google.com/file/d/11MkITUXh1emHG3zhZvSrxHTYhpah4xY3/view?usp=sharing"
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
                        <i class="fas fa-images"></i> Gallery
                    </button>
                </div>
            </div>
            <div class="card-footer">
                <button class="download-btn" data-link="${map.driveLink}">
                    <i class="fas fa-download"></i> Download map
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
    galleryTitle.textContent = `Gallery: ${map.title}`;
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
