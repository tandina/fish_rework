/* eslint-disable linebreak-style */

export default class LightBox {
	static init () {	    	
		const links = Array.from(document.querySelectorAll(".media-single-photographer"))  // On crée un tableau à partir de nos médias
		let gallery = links.map(link => link.getAttribute("src"))			// On séléctionne l'attribut src pour avoir le chemin absolu de chaque médias
		console.log (gallery)
		const titles = Array.from(document.querySelectorAll(".titre-media")) // On crée un tableau à partir de nos titres médias
		let Arraytitles = titles.map(title => title.innerHTML)			// On séléctionne pour chaque titre le contenu html de title
		let main = document.getElementById("liste_media")
		let header = document.getElementById("header")
		let banner = document.getElementById("banner")
		let list = document.getElementById("list")
		
		
		links.forEach(link =>
			link.addEventListener( "click", function (e) {     // Pour chaque lien on déclenche au clic une nouvelle lightbox
				main.setAttribute("aria-hidden", "true")
				header.setAttribute("aria-hidden", "true")
				list.setAttribute("aria-hidden", "true")	   // avec les différents attributs aria nécessaire ainsi
				main.style.display = "none"
				header.style.display = "none"
				list.style.display = "none"
				banner.style.display ="none"
				banner.setAttribute("aria-hidden", "true")
				e.preventDefault()
				console.log(e.currentTarget)		// le media sur lequel on a cliqué
				new LightBox(e.currentTarget.getAttribute("src"), e.currentTarget.getAttribute("value"), 
					gallery, Arraytitles)		// On récupère la valeur pour le titre et le src pour le chemin vers le média
			}))

		// Clavier

		links.forEach(link =>
			link.addEventListener( "keydown", function (e) {
				let enter = e.key === "Enter"
				if(enter) {
					header.setAttribute("aria-hidden", "true")
					main.setAttribute("aria-hidden", "true")
					list.setAttribute("aria-hidden", "true")
					main.style.display = "none"
					header.style.display = "none"
					list.style.display = "none"
					banner.style.display ="none"
					banner.setAttribute("aria-hidden", "true")
					new LightBox(e.currentTarget.getAttribute("src"), e.currentTarget.getAttribute("value"),
						gallery, Arraytitles)
				}
			}))
	}

	constructor (url, title , gallery, Arraytitles) {
		this.element = this.buildDom(url)
		this.gallery = gallery
		this.Arraytitles = Arraytitles
		this.title = title
		this.startMedia(url, title)
		this.onKeyUp = this.onKeyUp.bind(this)
		const box = document.querySelector(".box")
		box.appendChild(this.element)
		document.addEventListener("keyup", this.onKeyUp)
		
	}

	startMedia (url, title) {
		this.url = null
		this.title = null
		const container = this.element.querySelector(".lightbox__container")
		const loader = document.createElement("div")
		loader.classList.add("lightbox__loader")
		const p = document.createElement("h2")
		p.classList.add("lightbox-title")
		container.innerHTML = "" // évite d'afficher une deuxième image en dessous de la première
		container.setAttribute("tabindex", "-1")
		container.appendChild(loader)
		container.focus()
		console.log(url)  // chemin vers l'image
		if (url.includes("jpg")) {
			const image = new Image()
			image.setAttribute("tabindex", "0")
			image.onload = () => {
				container.removeChild(loader)  // On efface le loader
				container.appendChild(image)
				container.appendChild(p)
				this.url = url
				this.title = title				
			}			
			image.src = url
			p.innerHTML = title
		} else if (url.includes("mp4")) {
			const video = document.createElement("video")			
			container.removeChild(loader)
			container.appendChild(video)
			container.appendChild(p)
			this.url = url
			this.title = title			
			video.src = url	
			video.setAttribute("tabindex", "0")	
			video.setAttribute("controls", "")
			video.setAttribute("type", "video/mp4")
			p.innerHTML = title
		}
	}

	onKeyUp (e) {
		if (e.key === "Escape") {
			this.close(e)
		} else if (e.key === "ArrowLeft") {
			this.prev(e)
		} else if (e.key === "ArrowRight") {
			this.next(e)
		}
	}

	close (e) {
		e.preventDefault()
		this.element.classList.add("fadeOut")
		window.setTimeout(() => {
			this.element.parentElement.removeChild(this.element)
		}, 500)
		document.removeEventListener("keyup", this.onKeyUp) // On supprime l'évènement
		let main = document.getElementById("liste_media")
		let banner = document.getElementById("banner")
		let list = document.getElementById("list")
		let header = document.getElementById("header")
		main.style.display = "block"
		banner.style.display ="block"
		header.style.display ="block"
		list.style.display ="block"
		banner.setAttribute("aria-hidden", "false")
		main.setAttribute("aria-hidden", "false")
		header.setAttribute("aria-hidden", "false")
		list.setAttribute("aria-hidden", "false")
	}

	next (e) {
		e.preventDefault()
		let positionImage = this.gallery.findIndex(media => media === this.url)
		let positionTitle = this.Arraytitles.findIndex((info) => info === this.title)
		console.log(positionImage)

		if (positionImage === this.gallery.length - 1) {  
			positionImage = -1			// Si on arrive à la fin du tableau, on retourne à l'index de début
			positionTitle = -1			// idem pour le titre
		}
		this.startMedia(
			this.gallery[positionImage + 1],
			this.Arraytitles[positionTitle + 1]
		)
	}

	prev (e) {
		e.preventDefault()
		let positionImage = this.gallery.findIndex(media => media === this.url)
		let positionTitle = this.Arraytitles.findIndex((info) => info === this.title)

		if (positionImage == 0) {
			positionImage = this.gallery.length			// Si on est au début du tableau, on passe à la fin
			positionTitle = this.Arraytitles.length
		}
		this.startMedia(
			this.gallery[positionImage - 1],
			this.Arraytitles[positionTitle - 1]
		)
	}
	
	buildDom () {
		const dom = document.createElement("div")
		dom.classList.add("lightbox")
		dom.innerHTML = `<button class="lightbox-close" aria-label= "image closeup view" tabindex="0"></button>      
                         <button class="lightbox-next"  aria-label= "Next image" tabindex="0"> </button>
                         <button class="lightbox-prev"  aria-label= "Previous image" tabindex="0"> </button>
                               <div class="lightbox__container"> </div>`
		dom.querySelector(".lightbox-close").addEventListener("click", this.close.bind(this))
		dom.querySelector(".lightbox-next").addEventListener("click", this.next.bind(this))
		dom.querySelector(".lightbox-prev").addEventListener("click", this.prev.bind(this))
		return dom
	}
}
