
export const navbutton = document.querySelector("#ham-button");
export const navLink = document.querySelector("#nav-bar");

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navLink.classList.toggle("show");
});