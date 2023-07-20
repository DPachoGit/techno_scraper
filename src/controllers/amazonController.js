import Scraper from "../scraper/scraper.js";
import Parser from "../parser/parser.js";
import Producto from "../models/producto.js";


class AmazonController{
    constructor (){
        this.scraper = new Scraper();
        this.parser = null;
    }

    init = async () => {
        await this.scraper.init();
    }

    getData = async (query, pages) => {
        const content = await this.scraper.multiScrap(query, pages);
        this.parser = new Parser(content);
        const cards = this.parser.getCardsArray();
        this.saveData(query,cards);
        this.close();
        return cards;
    }
    saveData = async (query,cards) => {
        for(let card of cards){
            try{
                card.shop = "amazon"; 
                card.query = query; 
                const producto = new Producto(card);
                await producto.save();
            }
            catch(e){
                console.log(e);
            }
        }
    }

    

    close = async () => {
        await this.scraper.close();
    }
}

export default AmazonController;