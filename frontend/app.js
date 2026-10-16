const API_URL = 'http://localhost:3000/api/recipes';

const form = document.getElementById('recipeForm');
const tableBody = document.getElementById('recipeTableBody');
const recipeIdInput = document.getElementById('recipeId');
const titleInput = document.getElementById('title');
const ingredientsInput = document.getElementById('ingredients');
const instructionsInput = document.getElementById('instructions');
const prepTimeInput = document.getElementById('prep_time_mins');
const categoryInput = document.getElementById('category');

async function fetchRecipes() {
    const res = await fetch(API_URL);
    const recipes = await res.json();
    tableBody.innerHTML = '';
    recipes.forEach(r => {
        tableBody.innerHTML += `
            <tr>
                <td>${r.id}</td>
                <td>${r.title}</td>
                <td>${r.category || ''}</td>
                <td>${r.prep_time_mins || ''} mins</td>
                <td>
                    <button onclick="editRecipe(${r.id}, '${r.title}', '${r.ingredients || ''}', '${r.instructions || ''}', ${r.prep_time_mins || 0}, '${r.category || ''}')">Edit</button>
                    <button onclick="deleteRecipe(${r.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = recipeIdInput.value;
    const data = {
        title: titleInput.value,
        ingredients: ingredientsInput.value,
        instructions: instructionsInput.value,
        prep_time_mins: prepTimeInput.value,
        category: categoryInput.value
    };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    form.reset();
    recipeIdInput.value = '';
    fetchRecipes();
});

window.editRecipe = function(id, title, ingredients, instructions, prep_time, category) {
    recipeIdInput.value = id;
    titleInput.value = title;
    ingredientsInput.value = ingredients;
    instructionsInput.value = instructions;
    prepTimeInput.value = prep_time;
    categoryInput.value = category;
}

window.deleteRecipe = async function(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchRecipes();
    }
}

fetchRecipes();