import pcComController from "../scraper/pcCompScraper.js";
import PcCompParser from "../parser/PcCompParser.js";
import Producto from "../models/producto.js";


class PcCompController{
    constructor (){
        this.scraper = new pcComController();
        this.parser = null;
    }

    init = async () => {
        await this.scraper.init();
    }

    getData = async (query, pages) => {
        const content = await this.scraper.multiScrap(query, pages);
        this.parser = new PcCompParser(content);
        const cards = await this.parser.getCardsArray();
        this.saveData(query,cards);
        this.close();
        return cards;
    }
    saveData = async (query,cards) => {
        for(let card of cards){
            try{
                card.shop = "PcComponentes"; 
                card.query = query; 
                const producto = new Producto(card);
                await producto.save();
            }
            catch(e){
                console.log(e);
            }
        }
    }

    getDataFromDB = async (req,res) => {
        let data = [];
        let query = req.query.query;
        if(query){
            try {
                data = await Producto.find({
                    $or:[
                        {title: {$regex: query, $options: "i"}},
                        {price: {$regex: query, $options: "i"}},
                        {shop: {$regex: query, $options: "i"}},
                        {query: {$regex: query, $options: "i"}}
                    ]});
            }catch(e){
                console.log(e);
            }
        }
        res.render("index", {data: data});
    }
        

    close = async () => {
        await this.scraper.close();
    }
}

export default PcCompController;