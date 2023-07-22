import NeoScraper from "../scraper/neoSraper.js";
import NeoParser from "../parser/neoParser.js";
import Producto from "../models/producto.js";

class NeoController{
    constructor (headless = true){
        this.scraper = new NeoScraper(headless);
        this.parser = null;
    }

    init = async () => {
        await this.scraper.init();
    }

    getData = async (query) => {
        const content = await this.scraper.multiScrap(query);
        this.parser = new NeoParser(content);
        const cards = this.parser.getCardsArray();
        this.saveData(query,cards);
        this.close();
        return cards;
    }

    saveData = async (query,cards) => {
        for(let card of cards){
            try{
                card.shop = "neobyte"; 
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

export default NeoController;