
const apiKey = "5RaMN183unU0pwhNH5C2La0vNrsdNWFl3eYcqB9d";
const rover = "Perseverance";
const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${apiKey}`;

let images = [];  
let currentIndex = 0;

async function fetchMarsPhotos() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.latest_photos.length) {
            console.error("No new photos available");
            return;
        }

        images = data.latest_photos.slice(0, 15).map(photo => photo.img_src);
        
        if (images.length > 0) {
            displayPhotos();
        }
    } catch (error) {
        console.error("Error fetching Mars photos:", error);
    }
}

function displayPhotos() {
    const mainImage = document.getElementById("main-image");
    const thumbnailContainer = document.getElementById("thumbnail-container");

    if (!mainImage || !thumbnailContainer) return;

    mainImage.src = images[currentIndex];

    thumbnailContainer.innerHTML = "";

    for (let i = -2; i <= 2; i++) {
        let index = (currentIndex + i + images.length) % images.length; 
        const img = document.createElement("img");
        img.src = images[index];
        img.classList.add("thumbnail");
        img.onclick = () => changeImage(index);
        thumbnailContainer.appendChild(img);
    }
}

function changeImage(index) {
    currentIndex = index;
    displayPhotos();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length; 
    displayPhotos();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length; 
    displayPhotos();
}



function toMarsPage() {
    window.location.href = '../pages/mars.html';
}

function homePage() {
    window.location.href = '../pages/index.html';

}

function generateStarfield() {
    const starfield = document.querySelector(".starfield");
    if (!starfield) return;

    const numStars = 100; 
    let boxShadowArray = [];

    for (let i = 0; i < numStars; i++) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        boxShadowArray.push(`${x}px ${y}px white`);
    }

    starfield.style.boxShadow = boxShadowArray.join(", ");
}

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
}


setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length; 
    showSlide(currentSlide);
}, 20000);

// Scroll to navigate (loops slides)
document.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        currentSlide = (currentSlide + 1) % slides.length; // Scroll down loops back
    } else {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Scroll up loops back
    }
    showSlide(currentSlide);
});

generateStarfield();
fetchMarsPhotos();
showSlide(currentSlide);

