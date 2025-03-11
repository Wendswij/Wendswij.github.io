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


document.addEventListener("DOMContentLoaded", function () {
    loadCards();
});

function loadCards() {
    fetch("archive.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("cards-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading cards:", error));
}


// Card modal functions --------------------------------------------------------
let originalImgSrc = "";
let artistImgSrc = "";

function openModal(title, modalImg, artistImg, details, artist, archive) {
    let modal = document.getElementById('modal');
    let modalImage = document.getElementById('modal-img');
    
    // Show modal
    modal.style.display = 'flex';

    // Store image sources for tab switching
    originalImgSrc = modalImg;
    artistImgSrc = artistImg;

    // Set modal content
    modalImage.src = originalImgSrc;
    document.getElementById('modal-title').textContent = title;
    
    // Fill tab content dynamically
    document.getElementById('details-content').innerHTML = details;
    document.getElementById('artist-content').innerHTML = artist;
    document.getElementById('archive-content').innerHTML = archive;

    // Open the 'Details' tab by default
    document.querySelectorAll('.tabcontent').forEach(content => content.style.display = "none");
    document.getElementById('Details').style.display = "block";

    document.querySelectorAll('.tablinks').forEach(link => link.classList.remove('active'));
    document.querySelector('.tablinks').classList.add('active');
}

function openTab(evt, tabName) {
    let tabContent = document.getElementsByClassName("tabcontent");
    let tabLinks = document.getElementsByClassName("tablinks");

    // Hide all tab content
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Remove active class from all tabs
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Show the clicked tab
    let selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = "block";
        evt.currentTarget.classList.add("active");
    }

    // Change modal image if "Artist" tab is clicked
    let modalImage = document.getElementById('modal-img');
    modalImage.src = (tabName === "Artist") ? artistImgSrc : originalImgSrc;
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Close modal when clicking outside the content
document.addEventListener("click", function(event) {
    let modal = document.getElementById('modal');
    let modalContent = document.querySelector(".modal-content");

    if (event.target === modal && !modalContent.contains(event.target)) {
        closeModal();
    }
});
// ----------------------------------------------------------


// search bar
document.addEventListener("DOMContentLoaded", function () {
    let searchInput = document.getElementById("searchInput");

    // Listen for Enter key press
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission if inside a form
            searchItems();
        }
    });
});

function searchItems() {
    let input = document.getElementById("searchInput").value.trim().toLowerCase();
    let cards = document.querySelectorAll(".card");
    let noResults = document.getElementById("noResults");
    let hasResults = false;

    // Show all if input is empty
    if (input === "") {
        cards.forEach(card => card.style.display = "block");
        noResults.style.display = "none";
        return;
    }

    // Filter cards based on search input
    cards.forEach(card => {
        let title = card.querySelector("h3").textContent.toLowerCase();
        if (title.includes(input)) {
            card.style.display = "block";
            hasResults = true;
        } else {
            card.style.display = "none";
        }
    });

    // Show/hide "No results" message
    noResults.style.display = hasResults ? "none" : "block";
}