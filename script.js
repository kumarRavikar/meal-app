// Get references to elements
const searchMealInput = document.getElementById('searchMeal');
const searchMealBtn = document.getElementById('searchMealBtn');
const mealContainer = document.getElementById('mealContainer');


async function fetchMeals(query) {      // Function to fetch the meals from TheMealDB API in our meal app
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.error('Error fetching meals:', error);
        return [];
    }
}

// Function to render meals
function renderMeals(meals) {
    mealContainer.innerHTML = ''; // Clear previous meals

    if (meals && meals.length > 0) {
        meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'col-md-4 mb-4';

            mealCard.innerHTML = `
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.substring(0, 100)}...</p>
                        <a href="${meal.strYoutube}" class="btn btn-primary" target="_blank">Watch Video</a>
                    </div>
                </div>
            `;

            mealContainer.appendChild(mealCard);
        });
    } else {
        mealContainer.innerHTML = '<p class="text-center">No meals found. Try another search.</p>';
    }
}


searchMealBtn.addEventListener('click', async () => {// Event listener  use for the search button
    const query = searchMealInput.value.trim();
    if (query) {
        const meals = await fetchMeals(query);
        renderMeals(meals);
    }
});
