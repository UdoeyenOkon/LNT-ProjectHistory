import { workers } from "../data/lnt-workers.mjs";


// --------------------------------------------------
// DISPLAY WORKERS
// --------------------------------------------------

function createWorkersCard(workersToDisplay) {
    const workersContainer = document.getElementById("workers-photocard");

    // Clear existing cards before displaying new results
    workersContainer.innerHTML = "";

    // Display message if no workers match the search
    if (workersToDisplay.length === 0) {
        workersContainer.innerHTML = `
            <p class="no-results">
                No workers found matching your search.
            </p>
        `;
        return;
    }

    workersToDisplay.forEach((worker) => {
        let workersPhotoCard = document.createElement("section");

        let title = document.createElement("div");

        let name = document.createElement("h2");
        name.textContent = worker.name;

        let profession = document.createElement("p");
        profession.textContent = worker.profession;

        let country = document.createElement("p");
        country.innerHTML = `<strong>( ${worker.country} )</strong>`;

        title.append(name, profession, country);

        let button = document.createElement("button");
        button.textContent = "Learn More";

        let figure = document.createElement("figure");

        let image = document.createElement("img");
        image.src = worker.image;
        image.alt = worker.name;
        image.width = 150;
        image.height = 225;
        image.loading = "lazy";
        image.decoding = "async";

        figure.appendChild(image);

        workersPhotoCard.append(title, button, figure);

        button.addEventListener("click", () => {
            showWorkersDetails(worker);
        });

        workersContainer.appendChild(workersPhotoCard);
    });
}


// --------------------------------------------------
// SEARCH WORKERS
// --------------------------------------------------

function searchWorkers(searchTerm) {
    const searchValue = searchTerm.trim().toLowerCase();

    // If the search box is empty, display all workers
    if (searchValue === "") {
        createWorkersCard(workers);
        return;
    }

    const filteredWorkers = workers.filter((worker) => {
        // Search through all values in each worker object
        return Object.values(worker).some((value) =>
            String(value).toLowerCase().includes(searchValue)
        );
    });

    createWorkersCard(filteredWorkers);
}


// --------------------------------------------------
// SEARCH EVENT
// --------------------------------------------------

const searchInput = document.querySelector("#worker-search");
searchInput.addEventListener("input", () => {
    searchWorkers(searchInput.value);
});


// --------------------------------------------------
// INITIAL DISPLAY
// --------------------------------------------------

createWorkersCard(workers);


// --------------------------------------------------
// WORKER DETAILS MODAL
// --------------------------------------------------

function showWorkersDetails(worker) {
    const detailsOfWorkers = document.querySelector("#workers-detail");
    detailsOfWorkers.innerHTML = "";
    detailsOfWorkers.innerHTML = `
        <div>
            <h3>${worker.name}</h3>
            <button class="close-button">❌</button>
        </div>
        <p>${worker.profession}</p>
        <p>(${worker.country})</p>
        <p><span class="label"><strong>Company:</strong></span>${worker.company}</p>
        <p><span class="label"><strong>Responsibilities:</strong></span>${worker.responsibility}</p>
        <p>${worker.id}</p> `;

    detailsOfWorkers.showModal();

    const closeModal = document.querySelector(".close-button");

    closeModal.addEventListener("click", () => {
        detailsOfWorkers.close();
    });
}


// --------------------------------------------------
// PAGEHIDE EVENT
// --------------------------------------------------

window.addEventListener("pagehide", (event) => {

    if (event.persisted) {
        // The page is being cached
    }

    // Perform cleanup logic here
});


