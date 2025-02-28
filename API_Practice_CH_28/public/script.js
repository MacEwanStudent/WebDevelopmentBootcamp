document.addEventListener("DOMContentLoaded", async () => {
    const buttons = document.querySelectorAll(".cookbook");
    const ingredientsBox = document.getElementById("ingredients");
    console.log("Loading...")
    try {
        const response = await fetch("./recipe.json");
        if (!response.ok) throw new Error("Failed to load JSON");

        const data = await response.json();
        const recipes = data; // Assuming `recipe.json` has a `recipes` array

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const index = button.dataset.index;
                const selectedRecipe = recipes[index];
                console.log("clicked!", selectedRecipe);

                //ingredientsBox.innerHTML = `<strong>${selectedRecipe.ingredients}</strong><br>${selectedRecipe.ingredients.join(", ")}`;
                ingredientsBox.innerHTML = `
                    <h3>${selectedRecipe.name} ${selectedRecipe.emoji}</h3>
                    <p><strong>Protein:</strong> ${selectedRecipe.ingredients.protein.name} (${selectedRecipe.ingredients.protein.preparation})</p>
                    <p><strong>Salsa:</strong> ${selectedRecipe.ingredients.salsa.name} - Spiciness: ${selectedRecipe.ingredients.salsa.spiciness}</p>
                    <h4>Toppings:</h4>
                    <ul>
                        ${selectedRecipe.ingredients.toppings
                            .map(topping => `
                                <li>
                                    <strong>${topping.name}</strong> (${topping.quantity}): 
                                    ${topping.ingredients.join(", ")}
                                </li>
                            `)
                            .join("")
                        }
                    </ul>
                `;

            });
        });

    } catch (error) {
        console.error("Error loading recipes:", error);
    }
});
