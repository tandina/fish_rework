import Photographer from "../Models/photographer-class.js"
import createHeader from "../Utils/header.js" 
createHeader()
const datas = "../datas.json"	
fetch(datas, {
	headers : { 
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
})
	.then(response => response.json())
	.then(data => {
		let photographers = data.photographers 

		// Gestion des tags
		const params = new URL(document.location).searchParams
		let currentTag = params.get("hashtag") // on récupère le tag dans l'url

		if(currentTag == null) {
			photographers.forEach(photographer => {
				const listOfPhotographers = new Photographer(photographer)
				listOfPhotographers.creation()			
			})
		}else{
			photographers.forEach(photographer => {
				const selectedTag = photographer.tags.filter((tag) => tag == currentTag)

				if(selectedTag.length > 0) {
					const listOfPhotographers = new Photographer(photographer)
					listOfPhotographers.creation()
				}			
			})		
		}

		// Bouton contenu
		const contenu = document.querySelector(".button-content")
		const menu = document.querySelector(".nav-tag")
		let height = menu.clientHeight

		const body = document.querySelector("body")
		let bodyHeight = body.clientHeight

		window.addEventListener("scroll", () => {
			if(window.scrollY > height) {
				contenu.classList.add("scroll")
			}else{
				contenu.classList.remove("scroll")
			}
		})	
		let btnContenu = document.querySelectorAll(".button-content")
		btnContenu.forEach(btn => btn.addEventListener("click", goContent))

		function goContent() {
			window.scroll(0, -bodyHeight)
		}		
	})


