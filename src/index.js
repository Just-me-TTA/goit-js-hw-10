import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");

// Отримуємо породи і заповнюємо селект
fetchBreeds().then((breeds) => {
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
});

// Обробник події для вибору породи
breedSelect.addEventListener("change", (event) => {
  const breedId = event.target.value;
  if (breedId) {
    fetchCatByBreed(breedId).then((catData) => {
      if (catData) {
        // Відображаємо інформацію про кота
        const catImage = catData[0].url;
        const catBreed = catData[0].breeds[0];
        catInfo.innerHTML = `
          <img src="${catImage}" alt="Cat">
          <div class="cats-story">
            <h2>${catBreed.name}</h2>
            <p><strong>Опис:</strong> ${catBreed.description}</p>
            <p><strong>Темперамент:</strong> ${catBreed.temperament}</p>
          </div>
        `;
      }
    });
  } else {
    catInfo.innerHTML = ""; // Очищуємо інформацію про кота
  }
});