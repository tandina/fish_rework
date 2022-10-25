/* eslint-disable linebreak-style */

export default class Photographer {
	constructor (data) {
		this.id = data.id
		this.name = data.name
		this.city = data.city
		this.country = data.country
		this.tagline = data.tagline
		this.price = data.price
		this.portrait = data.portrait
	}

	creation () {

		const list = document.getElementById("photographes") // Notre point d'attache dans le DOM

		// Carte pour chaque photographe
		const card = document.createElement("section")
		card.setAttribute("class", "card")
		list.appendChild(card)

		// Header de la carte
		const headerCard = document.createElement("a")
		headerCard.setAttribute("class", "header-card")
		headerCard.setAttribute("href", "photographes.html?id=" + this.id)
		card.appendChild(headerCard)

		// Conteneur de la photo
		const avatar = document.createElement("div")
		avatar.setAttribute("class", "avatar")
		headerCard.appendChild(avatar)

		// Photo de profil
		const picture = document.createElement("img")
		picture.setAttribute("alt", "photo du photographe")
		picture.setAttribute("class", "photo-profil")
		avatar.appendChild(picture)
		picture.src = "./docs/images/" + this.portrait

		// Nom du photographe
		const nameCard = document.createElement("h2")
		nameCard.setAttribute("class", "photographer-name")
		headerCard.appendChild(nameCard)
		nameCard.innerHTML = this.name

		// Main de la carte
		const mainCard = document.createElement("div")
		mainCard.setAttribute("class", "main-card")
		card.appendChild(mainCard)

		// Ville du photographe
		const city = document.createElement("h3")
		city.setAttribute("class", "city")
		mainCard.appendChild(city)
		city.innerHTML = this.city + ", " + this.country

		// Description du photographe
		const description = document.createElement("p")
		description.setAttribute("class", "description")
		mainCard.appendChild(description)
		description.innerHTML = this.tagline

		// Prix
		const price = document.createElement("p")
		price.setAttribute("class", "price")
		mainCard.appendChild(price)
		price.innerHTML = this.price + "€/jour"

		
	}

	createCard () {
		// Bannière pour chaque photographe
		const bannerPhotographer = document.createElement("section")
		bannerPhotographer.setAttribute("class", "banner-photographer")
		// eslint-disable-next-line no-undef
		banner.appendChild(bannerPhotographer)

		// Infos de la bannière
		const description = document.createElement("div")
		description.setAttribute("class", "description-photographer")
		bannerPhotographer.appendChild(description)

		// Nom du photographe
		const onePhotographerName = document.createElement("h2")
		onePhotographerName.setAttribute("class", "photographer-name")
		onePhotographerName.innerHTML = this.name
		description.appendChild(onePhotographerName)

		// Localisation du photographe
		const onePhotographerCity = document.createElement("h3")
		onePhotographerCity.setAttribute("class", "city")
		onePhotographerCity.innerHTML = this.city + ", " + this.country
		description.appendChild(onePhotographerCity)

		// Description du photographe
		const onePhotographerTagline = document.createElement("p")
		onePhotographerTagline.setAttribute("class", "description")
		onePhotographerTagline.innerHTML = this.tagline
		description.appendChild(onePhotographerTagline)

		

		// Bouton de la modal
		const boxBtn = document.createElement("div")
		boxBtn.setAttribute("class", "box-btn")
		bannerPhotographer.appendChild(boxBtn)

		const modalBtn = document.createElement("a")
		modalBtn.setAttribute("tabindex", "0")
		modalBtn.setAttribute("class", "modal-btn")
		modalBtn.setAttribute("type", "submit")
		modalBtn.setAttribute("aria-label", "Contact Me")
		modalBtn.innerHTML = "Contactez-moi"
		boxBtn.appendChild(modalBtn)

		// Conteneur de la photo
		const avatar = document.createElement("div")
		avatar.setAttribute("class", "single-avatar")
		bannerPhotographer.appendChild(avatar)

		// Photo de profil
		const picture = document.createElement("img")
		picture.setAttribute("alt", "photo du photographe")
		picture.setAttribute("class", "photo-profil")
		avatar.appendChild(picture)
		picture.src = "./docs/images/" + this.portrait
	}
}
