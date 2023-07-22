import {JSDOM} from 'jsdom';

class NeoParser {
    constructor(html) {
        this.html = html;
        this.dom = new JSDOM(this.html);
    }
    getCards = () => {
        return this.dom.window.document.querySelectorAll(".product-miniature");
    }
    getTitle = (card) => {
        return card.querySelector(".product-title").textContent.trim();
    }
    getPrice = (card) => {
        return card.querySelector(".product-price").textContent.replace("€", "").trim();
    }
    getImage = (card) => {
        return card.querySelector(".img-fluid").getAttribute("data-src");
    }
    getUrl = (card) => {
        return card.querySelector(".product-thumbnail").getAttribute("href");
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
        if (cards.length > 0){
            for(let card of cards){
                try{    
                    cardsArray.push(this.getCard(card));
                }
                catch(e){
                    console.log(e);
                }
            }
        }
        return cardsArray;
    }


}

export default NeoParser;