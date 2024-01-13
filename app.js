const catApp = {};

catApp.apiUrl = 'https://api.thecatapi.com/v1/breeds/';

catApp.getRandomCatBreed = function () {
    return fetch(catApp.apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch cat breeds');
            }
        })
        .then(function (data) {
            console.log('API Response:', data); // Log the API response
            const randomIndex = Math.floor(Math.random() * data.length);
            return data[randomIndex];
        });
};

const btnGenerator = document.querySelector('.random-btn');

btnGenerator.addEventListener('click', function () {
    catApp.getRandomCatBreed()
        .then(function (randomCatBreed) {
            catApp.displayData(randomCatBreed);
        })
        .catch(function (error) {
            console.error(error);
        });
});

catApp.displayData = function (apiData) {
    const Name = document.querySelector('.cat-name');
    const Image = document.querySelector('.img-container');
    const Temperament = document.querySelector('.temperament');
    const Description = document.querySelector('.description');

    // Fix the following line by using Name instead of catApp.Name
    Name.textContent = apiData.name;

    const catImage = document.createElement('img');

    // Check if the API response contains the 'reference_image_id' property
    if (apiData.reference_image_id) {
        const imageUrl = `https://cdn2.thecatapi.com/images/${apiData.reference_image_id}.jpg`;
        catImage.src = imageUrl;
        catImage.alt = `${apiData.name}`;
        Image.innerHTML = ''; // Clear previous content
        Image.appendChild(catImage);
    } else {
        // Handle the case where the image URL is not available
        Image.innerHTML = 'Image not available';
    }

    // If apiData has temperament and description properties, you can use them
    if (apiData.temperament) {
        Temperament.textContent = ` ${apiData.temperament}`;
    }

    if (apiData.description) {
        Description.textContent = `Description: ${apiData.description}`;
    }
};


