/* eslint-disable linebreak-style */

export default function like () {
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
			let selectedPhotographer = photographers.find(photo => {
				const id = photo.id.toString()
				return id === idPhotographer
			})

			const medias = data.media
			const selectedMedia = medias.filter(media => {
				const idMedia = media.photographerId
				return idMedia === selectedPhotographer.id
			})
	
			// Etiquette avec le prix et le nombre de likes total

			const svg = `<svg width="18" height="19" viewBox="0 0 18 19" fill="none"  class="total-likes" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.125 18.35L7.85625 17.03C3.35 12.36 0.375 9.28 0.375 5.5C0.375 2.42 2.4925 0 5.1875 0C6.71 0 8.17125 0.81 9.125 2.09C10.0787 0.81 11.54 0 13.0625 0C15.7575 0 17.875 2.42 17.875 5.5C17.875 9.28 14.9 12.36 10.3938 17.04L9.125 18.35Z" fill="black"/>
                </svg>`

			let sticker = document.createElement("section")
			sticker.setAttribute("class", "sticker")
			// eslint-disable-next-line no-undef
			banner.appendChild(sticker)

			let span = document.createElement("span")
			span.setAttribute("class", "total-heart")
			sticker.appendChild(span)

			let price = document.createElement("span")
			price.setAttribute("class", "price")
			sticker.appendChild(price)
	
			const listLikes = []
			let totalLikes = []
		
			// On récupère le nombre total de likes
			selectedMedia.forEach(media => {
				listLikes.push(media.likes)
				listLikes.reduce((acc, cur) => acc + cur)
				totalLikes.push(listLikes)
			})
			totalLikes = listLikes.reduce((acc, cur) => acc + cur)

			span.innerHTML = totalLikes
			price.innerHTML = " " + svg + " " + selectedPhotographer.price + "€ / jour"

			// Ajout des likes

			const likes = document.querySelectorAll(".nombre")

			likes.forEach(like => {
				like.nextSibling.addEventListener("click", (event) => {
					event.preventDefault()
					if (!event.target.classList.contains("like")) {
						const likePost = parseInt(like.innerHTML) + 1
						like.innerHTML = likePost
						console.log(span)
						const likeSpan = parseInt(span.innerHTML) +1
						span.innerHTML = likeSpan 
						totalLikes++
						event.target.classList.toggle("like")
						event.target.classList.remove("dislike")
					} else {
						const dislikePost = parseInt(like.innerHTML) - 1
						like.innerHTML = dislikePost
						const dislikeSpan = parseInt(span.innerHTML) -1
						span.innerHTML = dislikeSpan 
	
						totalLikes--
						event.target.classList.toggle("dislike")
						event.target.classList.remove("like")
					}
				})
			})

			// Clavier
				
			likes.forEach(like => like.nextSibling.addEventListener("keydown", (event) => {
				if(event.key === "Enter") {
					event.preventDefault()
					if (!event.target.classList.contains("like")) {
						//	
						const likePost = parseInt(like.innerHTML) + 1
						like.innerHTML = likePost
						console.log(span)
						const likeSpan = parseInt(span.innerHTML) +1
						span.innerHTML = likeSpan 
						totalLikes++
						event.target.classList.toggle("like")
						event.target.classList.remove("dislike")
					} else {
						//like.nextSibling.click()
						const dislikePost = parseInt(like.innerHTML) - 1
						like.innerHTML = dislikePost
						const dislikeSpan = parseInt(span.innerHTML) -1
						span.innerHTML = dislikeSpan 
		
						totalLikes--
						event.target.classList.toggle("dislike")
						event.target.classList.remove("like")
					}					
				}
			}))		
		})	
}