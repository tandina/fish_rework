/* eslint-disable linebreak-style */
export default function createModal() {
	/** *** Création de la Modal *****/
	const modal = document.querySelector(".modal")
	modal.setAttribute("tabindex", "-1")
	/** *** Header de la modale *****/
	const headerModal = document.createElement("div")
	headerModal.setAttribute("class", "modal-header")
	modal.appendChild(headerModal)
	/** *** Titre de la modale *****/
	const modalTitle = document.createElement("div")
	modalTitle.setAttribute("class", "modal-title")
	modalTitle.innerHTML = "Contactez-moi "
	headerModal.appendChild(modalTitle)
	/** *** Nom du photographe *****/
	const modalName = document.createElement("div")
	modalName.setAttribute("class", "modal-name")
	headerModal.appendChild(modalName)
	/** *** Bouton de fermeture de la modale *****/
	let closemodalbtn = document.createElement("button")
	closemodalbtn.setAttribute("class", "close-modal-btn")
	closemodalbtn.setAttribute("aria-labelledby", "Close Contact form")
	headerModal.appendChild(closemodalbtn)
	/** *** Formulaire de la modale *****/
	const form = document.createElement("form")
	form.setAttribute("id", "validation")
	form.setAttribute("class", "modal-form")
	modal.appendChild(form)
	/** *** Prénom *****/
	const name = document.createElement("label")
	name.setAttribute("class", "name-label")
	name.setAttribute("for", "name-input")
	name.innerHTML = "Prénom"
	form.appendChild(name)
	const errorName = document.createElement("div")
	errorName.setAttribute("class", "formData")
	errorName.setAttribute("data-error-visible", "false")
	errorName.setAttribute("data-error", "2 caractères minimum et pas de chiffres")
	name.appendChild(errorName)
	const inputName = document.createElement("input")
	inputName.setAttribute("aria-labelledby", "First name")
	inputName.setAttribute("id", "first")
	inputName.setAttribute("name", "first")
	inputName.setAttribute("class", "name-input")
	inputName.setAttribute("label", "name-label")
	name.appendChild(inputName)
	/** *** Nom *****/
	const surname = document.createElement("label")
	surname.setAttribute("class", "surname-label")
	surname.setAttribute("for", "surname-input")
	surname.innerHTML = "Nom"
	form.appendChild(surname)
	const errorSurname = document.createElement("div")
	errorSurname.setAttribute("class", "formData")
	errorSurname.setAttribute("data-error-visible", "false")
	errorSurname.setAttribute("data-error", "2 caractères minimum et pas de chiffres")
	surname.appendChild(errorSurname)
	const inputSurname = document.createElement("input")
	inputName.setAttribute("aria-labelledby", "Last name")
	inputSurname.setAttribute("id", "last")
	inputSurname.setAttribute("class", "surname-input")
	inputSurname.setAttribute("label", "surname-label")
	surname.appendChild(inputSurname)
	/** *** Email *****/
	const letterBox = document.createElement("label")
	letterBox.setAttribute("class", "email-label")
	letterBox.setAttribute("for", "email-input")
	letterBox.innerHTML = "Email"
	letterBox.ariaLabel = "Veuillez indiquer votre adresse Email"
	form.appendChild(letterBox)
	const errorEmail = document.createElement("div")
	errorEmail.setAttribute("class", "formData")
	errorEmail.setAttribute("data-error-visible", "false")
	errorEmail.setAttribute("data-error", "format email exigé")
	letterBox.appendChild(errorEmail)
	const inputEmail = document.createElement("input")
	inputName.setAttribute("aria-labelledby", "Email")
	inputEmail.setAttribute("id", "email")
	inputEmail.setAttribute("class", "email-input")
	inputEmail.setAttribute("label", "email-label")
	letterBox.appendChild(inputEmail)
	/** *** Message *****/
	const message = document.createElement("label")
	message.setAttribute("class", "message-label")
	message.setAttribute("for", "message-input")
	message.innerHTML = "Votre message"
	form.appendChild(message)
	const errorMessage = document.createElement("div")
	errorMessage.setAttribute("class", "formData")
	errorMessage.setAttribute("data-error-visible", "false")
	errorMessage.setAttribute("data-error", "Votre message ne peut pas être vide")
	message.appendChild(errorMessage)
	const inputMessage = document.createElement("textarea")
	inputMessage.setAttribute("aria-labelledby", "Your message")
	inputMessage.setAttribute("id", "message")
	inputMessage.setAttribute("class", "message-input")
	inputMessage.setAttribute("label", "message-label")
	message.appendChild(inputMessage)
	/** *** Bouton submit *****/
	let submit = document.createElement("button")
	submit.setAttribute("class", "submit-btn")
	submit.setAttribute("type", "submit")
	submit.setAttribute("aria-labelledby", " Send")
	submit.innerHTML = "Envoyer"
	form.appendChild(submit)
	/** *** Lancement de la modale *****/
	const modalbtn = document.querySelectorAll(".modal-btn")
	modalbtn.forEach((btn) => btn.addEventListener("click", launchModal))
	modalbtn.forEach((btn) => btn.addEventListener("keydown",(e) => {
		if(e.key === "Enter") {
			btn.click()
		}
	}))
	/** *** Fermeture de la modale *****/
	closemodalbtn = document.querySelectorAll(".close-modal-btn")
	closemodalbtn.forEach((btn) => btn.addEventListener("click", closeModal))
	submit = document.querySelectorAll("submit-btn")
	submit.forEach((btn) => btn.addEventListener("click", validateForm))
	/** *** Véfification du formulaire *****/
	const first = document.querySelector("#first")
	const last = document.querySelector("#last")
	const email = document.querySelector("#email")
	const text = document.querySelector("#message")
	const errors = document.querySelectorAll(".formData")
	const validation = document.querySelector("#validation")
	let formOk = false
	function validateForm () {
		const regexIdentity = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/ // Regex pour le nom et le prénom, acceptant un minimum de 2 caractères
		// eslint-disable-next-line no-control-regex
		const regexMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y
		if (!first.value || regexIdentity.test(first.value) === false) {
			errors[0].dataset.errorVisible = "true"
			return formOk === false
		} else {
			errors[0].dataset.errorVisible = "false"
		}
		if (!last.value || regexIdentity.test(last.value) === false) {
			errors[1].dataset.errorVisible = "true"
			return formOk === false
		} else {
			errors[1].dataset.errorVisible = "false"
		}
		if (!email.value || regexMail.test(email.value) === false) {
			errors[2].dataset.errorVisible = "true"
			return formOk === false
		} else {
			errors[2].dataset.errorVisible = "false"
		}
		if (!text.value || regexIdentity.test(text.value) === false) {
			errors[3].dataset.errorVisible = "true"
			return formOk === false
		} else {
			errors[3].dataset.errorVisible = "false"
		}
		return (formOk = true)
	}
	validation.addEventListener("submit", (e) => {
		e.preventDefault()
		validateForm()
		if (formOk) {
			console.log("Prénom: " + first.value + " Nom: " + last.value + " Email: " + email.value + " Message: " + text.value)
			alert("Formulaire rempli avec succès !")
			location.reload()
			closeModal()
		}
	})
	let main = document.getElementById("liste_media")
	let banner = document.getElementById("banner")
	console.log(main)
	function launchModal () {	
		const  focusableElements =
		"button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])"
		const main = document.getElementById("main")
		main.style.filter = "blur(3px) grayscale(50%)"
		const firstFocusableElement = modal.querySelectorAll(focusableElements)[0] // premier element focusable de la modale
		const focusableContent = modal.querySelectorAll(focusableElements)
		const lastFocusableElement = focusableContent[focusableContent.length - 1] // dernier element focusable de la modale
		document.addEventListener("keydown", function(e) {
			let isTabPressed = e.key === "Tab" 
			let escape = e.key === "Escape"
					
			if (!isTabPressed && !escape) {
				return
			}
			
			if(escape) {
				closeModal()
			}
			if (e.shiftKey) { // si shift est pressé en même temps que Tab
				if (document.activeElement === firstFocusableElement) {
					lastFocusableElement.focus() // add focus for the last focusable element
					e.preventDefault()
				}
			}						
			else { // if tab key is pressed
				if (document.activeElement === lastFocusableElement) { // si le dernier element focuasble est l'element courant
					firstFocusableElement.focus() // ajoute le focus pour le premier element focusable 
					e.preventDefault()
				}
			}
		})		
		firstFocusableElement.focus()		
		modal.style.display = "block"
		document.querySelector(".modal").focus()
		banner.setAttribute("aria-hidden", "true")	
	}
	function closeModal () {
		const main = document.getElementById("main")
		modal.style.display = "none"
		main.style.filter = "none"
	}
}