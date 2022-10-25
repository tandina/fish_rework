/* eslint-disable linebreak-style */
export default function createHeader() {
	const nav = document.querySelector(".nav-tag")
	let boxLogo = document.createElement("div")
	boxLogo.setAttribute("class","box-logo")
	nav.appendChild(boxLogo)
	let logo = document.createElement("a")
	logo.setAttribute("class", "logo")
	logo.setAttribute("aria-label", "logo du site")
	logo.setAttribute("alt-text", "lien avec le logo de Fisheye qui vous ramene sur la page d'accueil index.html ")
	logo.setAttribute( "href","./index.html")
	boxLogo.appendChild(logo)
	//Titre
	let boxTitle = document.createElement("div")
	boxTitle.setAttribute("class", "box_title")
	nav.appendChild(boxTitle)
	let title = document.createElement("h1")
	title.setAttribute("class", "title")
	title.innerHTML = "Nos photographes"
	boxTitle.appendChild(title)
}