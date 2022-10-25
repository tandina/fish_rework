import Listbox from "../Utils/listbox.js"
import Photographer from "../Models/photographer-class.js"
import LightBox from "../Models/lightbox-class.js"
import createModal from "../Utils/modal.js"
import like from "../Utils/like.js"

const datas = "../datas.json"

fetch(datas, {
	headers : { 
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
})

	.then(response => response.json())
	.then(data => {		
		// Récupération de l'id du photographe dans l'url
		const photographers = data.photographers
		const params = new URL(document.location).searchParams
		const idPhotographer = params.get("id")
				
		// On recupère un objet avec le tableau des médias de chaque photographe
		let selectedPhotographer = photographers.find(photo => { // on récupère le tableau du photographe selectionné
			const id = photo.id.toString() // on récupère l'id du tableau
			return id === idPhotographer // on retourne l'id si le photographe actuel correspond à l'url
		})

		// Création de la carte de visite du photographe
		selectedPhotographer = new Photographer(selectedPhotographer)
		selectedPhotographer.createCard()

		createModal()
		let modalName = document.querySelector(".modal-name")
		modalName.innerHTML = selectedPhotographer.name
		Listbox()
		LightBox.init()	
		
		like()
			
	})

