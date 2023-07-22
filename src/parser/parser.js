import {JSDOM} from 'jsdom';

/** Clase para parsear un html */
class Parser {

    /**
     * Inicializa el parser
     * @constructor
     * @param {string} html 
     */
    constructor(html) {
        this.html = html;
        this.dom = new JSDOM(this.html);
    }
    /**
     * Devuelve un array con los elementos html que contienen los productos
     * @function
     * @returns {Array} cards
     */
    getCards = () => {
        return this.dom.window.document.querySelectorAll(".s-card-container");
    }

    /**
     *  Conseguir el título de una card
     * @function
     * @param {object} card 
     * @returns string
     */
    getTitle = (card) => {
        console.log("type:",typeof card);
        return card.querySelector(".a-text-normal").textContent.trim();
    }

    /**
     * @function
     * @param {object} card 
     * @returns string
     */
    getPrice = (card) => {
        return card.querySelector(".a-price-whole").textContent.trim();
    }

    /**
     * Conseguir la imagen de una card
     * @function
     * @param {object} card
     * @returns string
     */

    getImage = (card) => {
        return card.querySelector(".s-image").getAttribute("src");
    }

    /**
     * Conseguir la url de una card
     * @function
     * @param {object} card
     * @returns string
     */
    getUrl = (card) => {
        return "https://amazon.es"+card.querySelector("h2 .a-link-normal").getAttribute("href");
    }
    getCard = (card) => {
        return {
            title: this.getTitle(card),
            price: this.getPrice(card),
            image: this.getImage(card),
            url: this.getUrl(card)
        };
    }
    
    getCardsArray = () => {
        const cards = this.getCards();
        const cardsArray = [];
        for(let card of cards){
            try{
                cardsArray.push(this.getCard(card));
            }
            catch(e){
                console.log(e);
            }
        }
        return cardsArray;
    }


}

export default Parser;