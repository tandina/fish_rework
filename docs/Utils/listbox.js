/* eslint-disable linebreak-style */

import LightBox from "../Models/lightbox-class.js"
import MediaFactory from "../Models/media-class.js"
import like from "./like.js"

export default async function Listbox  () {
	const datas = "../datas.json"
	let response = await fetch(datas, {
		headers : { 
			"Content-Type": "application/json",
			"Accept": "application/json"
		}
	})
	let data = await response.json()
	console.log(data)
    
	// Récupération de l'id du photographe dans l'url
	const photographers = data.photographers
	const params = new URL(document.location).searchParams
	const idPhotographer = params.get("id")	

	// On recupère un objet avec le tableau des médias de chaque photographe
	let selectedPhotographer = photographers.find(photo => { // On cherche un photographer dans le tableau photographes
		const id = photo.id.toString()		// on récupère le id de chaques photographes qu'on converti en string
		return id === idPhotographer		// si l'id correspond à l'id de l'url selected sera le tableau du photographe de l'url courante
	})
	console.log(selectedPhotographer)
	// On fait correspondre l'id du photographe à celui du média
	const medias = data.media			// notre tableau de médias
	const selectedMedia = medias.filter(media => {  // On filtre chaque média
		const idMedia = media.photographerId  // On créé une constante pour récupérer chaque photographerId sur chaque Média
		console.log(idMedia)
		return idMedia === selectedPhotographer.id  // Si l'id d'un media correspond à l'id d'un photographe alors
	})												// Selected media retourne un tableau avec les medias de photographId
	console.log([...selectedMedia])
	console.log(selectedMedia)
	const filterMedia = (map, filtre) => (a, b) => filtre(map(a), map(b)) // Trie les éléments du tableau par ordre croissant
	const mediasLikes = [...selectedMedia].sort(filterMedia((media) => //  chaque element du tableau est trié
		media.likes, (a, b) => b - a))  				// en comparant sa valeur par rapport à l'élément précédant
	const mediasDate = [...selectedMedia].sort(filterMedia((media) => 
		new Date(media.date).getTime(), (a, b) => a - b)) 
	const mediaTitle = selectedMedia.sort((a, b) => {
		if (a.title < b.title) return -1
		if (a.title > b.title) return 1
		return 0
	})
	const list = document.getElementById("liste_media") // Notre point d'attache dans le DOM
	let box = document.createElement("div")
	box.setAttribute("class", "container")
	list.appendChild(box)
	let label = document.querySelector(".label-custom")
	label.innerHTML = "Trier par"

	mediasLikes.forEach((media) => {
		const listOfMedia = MediaFactory.createMedia(media)
		console.log(listOfMedia)
		listOfMedia.affichage(Image)
	})
	const selectElt = document.querySelector("select")
	const selectDiv = document.querySelector(".custom-select")
	const newSelect = document.createElement("div")
	newSelect.setAttribute("tabindex", "0")
	newSelect.classList.add("new-select")	
	newSelect.innerHTML = "popularité"
	selectDiv.appendChild(newSelect)
	
	const newMenu = document.createElement("div")
	newMenu.classList.add("select-items", "select-hide")

	let option1 = document.querySelector(".option1")
	option1.innerHTML = "popularité"	
	let option2 = document.querySelector(".option2")
	option2.innerHTML ="date"
	let option3 = document.querySelector(".option3")
	option3.innerHTML ="titre"

	for (let option of selectElt.options) {
		const newOption = document.createElement("div")
		newOption.setAttribute("class", "selection" )
		newOption.setAttribute("tabindex", "0")
		newOption.innerHTML = option.innerHTML
		newMenu.appendChild(newOption)
		console.log(newOption)
		if(newOption.innerHTML == "popularité") {
			newOption.setAttribute("class", "selection1")
		}
		if(newOption.innerHTML == "date") {
			newOption.setAttribute("class", "selection2")
		}
		if(newOption.innerHTML == "titre") {
			newOption.setAttribute("class", "selection3")
		}
		newOption.addEventListener("click", function () {
			for(let option of selectElt.options) {
				if(option.innerHTML === this.innerHTML) {
					console.log(option.innerHTML)
					newSelect.innerHTML = this.innerHTML								
				}
			}
			newSelect.click()
		})
		newOption.addEventListener("keydown", function (e) {
			if(e.key === "Enter") {
				for(let option of selectElt.options) {
					if(option.innerHTML === this.innerHTML) {
						newSelect.innerHTML = this.innerHTML					
					}
				}
				newSelect.click()
			}
		})
		newSelect.click()
		newMenu.appendChild(newOption)
	}
	selectDiv.appendChild(newMenu)

	newSelect.addEventListener("keydown", function(e){
		if(e.key === "Enter") {
			newSelect.click()
		}
	})

	let selection1 = document.querySelector(".selection1")
	let selection2 = document.querySelector(".selection2")
	let selection3 = document.querySelector(".selection3")

	LightBox.init()	

	function launchListbox() {

		document.querySelector(".new-select")
		newSelect.addEventListener("click", function(e) {
			let rembox = document.querySelector(".container")
			rembox.remove()
			const box = document.createElement("div")
			box.setAttribute("class", "container")
			list.appendChild(box)
			e.stopPropagation()
			this.nextSibling.classList.toggle("select-hide")
			this.classList.toggle("active")		

			if(newSelect.innerHTML == "popularité" || newSelect.innerHTML == null) {
				selection1.remove()
				selection2.innerHTML = "date"
				selection3.innerHTML = "titre"
				console.log(newSelect.innerHTML)
				mediasLikes.forEach((media) => {						
					const listOfMedia = MediaFactory.createMedia(media)
					listOfMedia.affichage(data)
				})
				like()
				LightBox.init()

			}else if(newSelect.innerHTML == "date") {
				selection1.remove()
				selection2.innerHTML = "popularité"
				selection3.innerHTML = "titre"
				console.log(newSelect.innerHTML)
				mediasDate.forEach((media) => {		
					const listOfMedia = MediaFactory.createMedia(media)
					listOfMedia.affichage(data)
				})
				
				like()
				LightBox.init()
            
			}else if(newSelect.innerHTML == "titre") {
				selection1.remove()
				selection2.innerHTML = "date"
				selection3.innerHTML = "popularité"
				console.log(newSelect.innerHTML)
				mediaTitle.forEach((media) => {
					const listOfMedia = MediaFactory.createMedia(media)
					listOfMedia.affichage(data)
				})
				like()
				LightBox.init()
			}else{
				mediaTitle.forEach((media) => {
					const listOfMedia = MediaFactory.createMedia(media)
					listOfMedia.affichage(data)
				})
				like()
				LightBox.init()	
			}
		})
	}
	launchListbox()	
}

