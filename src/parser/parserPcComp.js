import {JSDOM} from 'jsdom';

class PcCompParser {
    constructor(html) {
        this.html = html;
        this.dom = new JSDOM(this.html);
    }
    getCards = () => {
        return this.dom.window.document.querySelectorAll("#product-grid > div");
    }
    getTitle = (card) => {
        return card.querySelector(".product-card__title").textContent.trim();
    }
    getPrice = (card) => {
        return card.querySelector(".product-card__price-container").textContent.trim();
    }
    getImage = (card) => {
        return card.querySelector("img").getAttribute("src");
    }
    getUrl = (card) => {
        return "https://www.pccomponentes.com"+card.querySelector("a").getAttribute("href");
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

export default PcCompParser;