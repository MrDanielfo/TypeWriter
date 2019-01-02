
class TypeWriter  {
    constructor(txtElement, words, waitTime = 300) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = ''; 
        this.wordIndex = 0; 
        this.waitTime = parseInt(waitTime, 10); 
        this.type();
        this.isDeleting = false; 
    }

    type() {

        const current = this.wordIndex % this.words.length;
        /* El porcentaje funciona como contador el cual se empareja al encontrar números primos o divisibles entre la primera cantidad*/ 

        /*const current = 12 % 5;*/ 

        // Obtener el texto completo 
        const fullTxt = this.words[current]; 

        //Check if deleting

        if(this.isDeleting) {
            // Remove a Character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add a character
            this.txt = fullTxt.substring(0, this.txt.length + 1)
        }

        //Insert txt into element 
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`; 

        // Initial TypeSpeed

        let typeSpeed = 300;

        if(this.isDeleting) {
            typeSpeed /= 2; 
        }

        // if Word is complete  
        if(!this.isDeleting && this.txt === fullTxt ) {
            typeSpeed = this.waitTime; 
            // Set Deleting to true
            this.isDeleting = true; 
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to the next word
            this.wordIndex++; 
            // Pause before start typing
            typeSpeed = 500; 
        }

        //console.log(current); 
        setTimeout(() => {
            this.type()
        }, typeSpeed); 
    }
}

document.addEventListener('DOMContentLoaded', init);

function init() {

    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words')); 
    const wait = txtElement.getAttribute('data-wait'); 

    // Inicializar el TypeWriter

    const typeWriter = new TypeWriter(txtElement, words, wait); 


}

