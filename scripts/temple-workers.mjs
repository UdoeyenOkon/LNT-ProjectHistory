import { workers } from "../data/lnt-workers.mjs";


function createWorkersCard(workers) {
    workers.forEach((worker) => {
        let workersPhotoCard = document.createElement("section");

        let title = document.createElement("div");

        let name = document.createElement("h2");
        name.textContent = worker.name;

        let profession = document.createElement("profession");
        profession.textContent = worker.profession;

        let country = document.createElement("country");
        country.innerHTML = `<strong>( ${worker.country} )</strong>`;

        title.append(name, profession, country);

        let button = document.createElement("button");
        button.textContent = 'Learn More';

        let figure = document.createElement("figure");
        let image = document.createElement("img");
        image.src =worker.image;
        image.alt = worker.name;
        image.width = 200;
        image.height = 300;
        image.loading = 'lazy';
        image.decoding = 'async';
        figure.appendChild(image);

        // let company = document.createElement("company");
        // company.innerHTML = `<strong>Company</strong>: ${worker.company}`;

        // let responsibility = document.createElement("p");
        // responsibility.innerHTML = `<strong>Responsibilities</strong>: ${worker.responsibility}`;

        workersPhotoCard.append(title, button, figure);
        button.addEventListener("click", () => showWorkersDetails(worker));
        document.getElementById("workers-photocard").appendChild(workersPhotoCard);

    });
    
}
createWorkersCard(workers);


// Replace 'unload' with 'pagehide' in your event registration calls
// Example: Change fromEvent(window, 'unload') to:
const eventName = 'pagehide';

// If you are calling a generic listener:
window.addEventListener('pagehide', (event) => {
    if (event.persisted) {
        // The page is being cached
    }
    // Perform cleanup logic here
});


function showWorkersDetails(workers) {
    const detailsOfWorkers = document.querySelector("#workers-detail");
    detailsOfWorkers.innerHTML = "";
    detailsOfWorkers.innerHTML = `
    <div>
    <h3>${workers.name}</h3>
  
    <button class="close-button">❌</button>
    </div>
      <p>${workers.profession}</p>
    <p>(${workers.country})</p>
    <p><span class="label"><strong>Company: </strong></span> ${workers.company} </p>
    <p><span class="label"> <strong>Responsibilities: </strong></span>${workers.responsibility}</p>
    `;
    detailsOfWorkers.showModal()
    let closeModal = document.querySelector(".close-button");
    closeModal.addEventListener("click", () => detailsOfWorkers.close());
}


