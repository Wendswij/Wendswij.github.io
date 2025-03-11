// Burger Button --------------------------------------------------------
function toggleMenu() {
    let menu = document.getElementById("sideMenu");
    let main = document.getElementById("main");

    if (menu.style.width === "250px") {
        menu.style.width = "0";
        main.style.marginLeft = "0";
    } else {
        menu.style.width = "250px";
        main.style.marginLeft = "250px";
    }
}

window.onclick = function(event) {
    let menu = document.getElementById("sideMenu");
    if (event.target !== menu && !menu.contains(event.target) && event.target.className !== "hamburger") {
        menu.style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }
};
// End of Burger Button --------------------------------------------------------



const categories = {
    "Dimoo": ["A", "B", "C"],
    "Azura": ["A", "B", "C"]
};

const container = document.getElementById("categories");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCategory(name, items) {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");

    const title = document.createElement("h2");
    title.textContent = name;
    categoryDiv.appendChild(title);

    shuffleArray(items); // Randomize items

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = "Flip Me";
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
                card.textContent = item;
            }
        });
        cardContainer.appendChild(card);
    });

    categoryDiv.appendChild(cardContainer);
    container.appendChild(categoryDiv);
}

let categoriesArray = Object.entries(categories);
shuffleArray(categoriesArray); // Randomize the order of categories

categoriesArray.forEach(([name, items]) => {
    createCategory(name, items);
});