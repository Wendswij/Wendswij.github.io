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


// Predefined Collection Object (Series)
const collection = {
    "Dimoo": ["Series A", "Series B", "Series C"],
    "Chaka": ["Series X", "Series Y", "Series Z"],
    "Nyota": ["Series 1", "Series 2", "Series 3"]
};

// Load additional figures from localStorage (or create an empty object)
let additionalFigures = JSON.parse(localStorage.getItem("additionalFigures")) || {};

const checklistContainer = document.getElementById("checklist");

function loadChecklist() {
    const savedChecklist = JSON.parse(localStorage.getItem("figurineChecklist")) || {};

    // Loop through each category in the collection
    for (const [category, series] of Object.entries(collection)) {
        // Create a container for the category
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");

        // Category Title
        const categoryTitle = document.createElement("h3");
        categoryTitle.textContent = category;
        categoryContainer.appendChild(categoryTitle);

        // Create a grid container for the predefined series cards (unchanged)
        const seriesContainer = document.createElement("div");
        seriesContainer.classList.add("container");
        series.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");

            const label = document.createElement("label");
            label.textContent = item;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = savedChecklist[`${category}-${item}`] || false;
            checkbox.addEventListener("change", () => {
                savedChecklist[`${category}-${item}`] = checkbox.checked;
                localStorage.setItem("figurineChecklist", JSON.stringify(savedChecklist));
            });

            card.appendChild(label);
            card.appendChild(checkbox);
            seriesContainer.appendChild(card);
        });
        categoryContainer.appendChild(seriesContainer);

        // --- Additional Figures Section (Notebook List Style) ---

        // Header for Additional Figures
        const additionalHeader = document.createElement("h4");
        additionalHeader.textContent = "Additional Figures";
        additionalHeader.style.marginTop = "20px";
        additionalHeader.style.color = "#00a78e";
        categoryContainer.appendChild(additionalHeader);

        // Create a notebook-style container for additional figures
        const notebookList = document.createElement("div");
        notebookList.classList.add("notebook-list");
        categoryContainer.appendChild(notebookList);

        // Ensure an array exists for this category in additionalFigures
        if (!additionalFigures[category]) {
            additionalFigures[category] = [];
        }
        // Render each stored additional figure as a notebook list item
        additionalFigures[category].forEach(item => {
            addNotebookItem(notebookList, category, item, savedChecklist);
        });

        // Form to add a new additional figure (notebook style)
        const newFigureForm = document.createElement("div");
        newFigureForm.classList.add("new-figure-form");

        const newFigureInput = document.createElement("input");
        newFigureInput.type = "text";
        newFigureInput.placeholder = "Add a new figure name";

        const addFigureButton = document.createElement("button");
        addFigureButton.textContent = "Add";
        addFigureButton.classList.add("button");

        // Function to handle adding a new figure
        function addNewFigure() {
            const newFigureName = newFigureInput.value.trim();
            if (newFigureName !== "") {
                // Save new figure in additionalFigures
                additionalFigures[category].push(newFigureName);
                localStorage.setItem("additionalFigures", JSON.stringify(additionalFigures));
                // Add to notebook list
                addNotebookItem(notebookList, category, newFigureName, savedChecklist);
                newFigureInput.value = "";
            }
        }

        // Add event listener for the Add button
        addFigureButton.addEventListener("click", addNewFigure);

        // Add event listener so pressing Enter/Return triggers addNewFigure
        newFigureInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                e.preventDefault(); // Prevent form submission if any
                addNewFigure();
            }
        });

        newFigureForm.appendChild(newFigureInput);
        newFigureForm.appendChild(addFigureButton);
        categoryContainer.appendChild(newFigureForm);

        // Append this category container to the main checklist container
        checklistContainer.appendChild(categoryContainer);
    }
}

function addNotebookItem(container, category, item, savedChecklist) {
    const notebookItem = document.createElement("div");
    notebookItem.classList.add("notebook-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = savedChecklist[`${category}-${item}`] || false;
    checkbox.addEventListener("change", () => {
        savedChecklist[`${category}-${item}`] = checkbox.checked;
        localStorage.setItem("figurineChecklist", JSON.stringify(savedChecklist));
    });

    const label = document.createElement("label");
    label.textContent = item;

    // Create Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        // Remove from additionalFigures array for this category
        const index = additionalFigures[category].indexOf(item);
        if (index > -1) {
            additionalFigures[category].splice(index, 1);
            localStorage.setItem("additionalFigures", JSON.stringify(additionalFigures));
        }
        // Remove from DOM
        container.removeChild(notebookItem);
        // Remove saved checkbox state if exists
        delete savedChecklist[`${category}-${item}`];
        localStorage.setItem("figurineChecklist", JSON.stringify(savedChecklist));
    });

    notebookItem.appendChild(checkbox);
    notebookItem.appendChild(label);
    notebookItem.appendChild(deleteBtn);
    container.appendChild(notebookItem);
}

function saveChecklist() {
    // This function can be used to force a save (if needed)
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const savedChecklist = {};
    checkboxes.forEach(checkbox => {
        const label = checkbox.parentNode.querySelector("label").textContent;
        const category = checkbox.parentNode.parentNode.parentNode.querySelector("h3").textContent;
        savedChecklist[`${category}-${label}`] = checkbox.checked;
    });
    localStorage.setItem("figurineChecklist", JSON.stringify(savedChecklist));
    alert("Checklist saved!");
}

loadChecklist();