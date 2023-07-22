import {JSDOM} from 'jsdom';

class Parser {
    constructor(html) {
        this.html = html;
        this.dom = new JSDOM(this.html);
    }
    getCards = () => {
        return this.dom.window.document.querySelectorAll(".s-card-container");
    }
    getTitle = (card) => {
        return card.querySelector(".a-text-normal").textContent.trim();
    }
    getPrice = (card) => {
        return card.querySelector(".a-price-whole").textContent.trim();
    }
    getImage = (card) => {
        return card.querySelector(".s-image").getAttribute("src");
    }
    getUrl = (card) => {
        return "https://www.worten.es"+card.querySelector("h2 .a-link-normal").getAttribute("href");
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