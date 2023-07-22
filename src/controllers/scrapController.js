import AmazonController from "./amazonController.js";
import PcCompController from "./pcCompController.js";
import Producto from "../models/producto.js";

class ScrapController {
    constructor (){
        this.amazonController = new AmazonController();
        this.pcComController = new PcCompController();
    }

    init = async () => {
        await this.amazonController.init();
        await this.pcComController.init();
    }

    getData = async (query, pages) => {
        let content = await this.amazonController.getData(query, pages);
        content = content.concat(await this.pcComController.getData(query, pages));
        return content;
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
}

export default ScrapController;