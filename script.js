let generateImageForm = document.getElementById('generate-image-form');
let formInput = document.getElementById('input-value');
let imageContainerText = document.getElementById('imageContainerText');
let imageGenerated = document.getElementById('generated-image');
let imageContainer = document.getElementById('images-visible');

async function fetchImages(category) {
    try {
        let accessKey = 'tc0aJzvd8ssAvT_beVSqKDvtXTZB7ETP51j6_tFRSsk'; // Replace with your Unsplash Access Key
        let apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(category)}&client_id=${accessKey}`;

        console.log(`Fetching images from: ${apiUrl}`);

        let response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Unable to fetch the data');
        }

        let data = await response.json();
        console.log('API Response:', data);

        if (data.results.length > 0) {
            let imageUrl = data.results[0].urls.regular; // Get the first image from results
            imageContainerText.innerText = "Below is your generated image:";
            imageContainer.style.display = "block";
            imageGenerated.src = imageUrl;
        } else {
            imageContainerText.innerText = "No images found for this category.";
            imageContainer.style.display = "none";
        }
    } catch (error) {
        imageContainerText.innerText = "An error occurred while fetching the image.";
        imageContainer.style.display = "none";
        console.error(error);
    }
}

generateImageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let enteredText = formInput.value.trim();
    if (enteredText !== "") {
        fetchImages(enteredText);
    } else {
        imageContainerText.innerText = "Input field cannot be empty!";
        imageContainer.style.display = "none";
    }
});



