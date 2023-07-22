import puppeteer from "puppeteer";
import {JSDOM} from 'jsdom';


class NeoScraper{
    constructor(headless = true){
        this.browser = null;
        this.page = null;
        this.headless = headless;
        this.baseURL = new URL("https://www.neobyte.es/buscador");
    }
    
    init = async () => {
        this.browser = await puppeteer.launch(
            {
                headless: this.headless,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
    
            });
            this.page = await this.browser.newPage();
    }
    close = async () => {
        await this.browser.close();
    }
    scrap = async (query, page = "1") => {
        this.baseURL.searchParams.set("s", query);
        this.baseURL.searchParams.set("page", page);
        const url = this.baseURL.toString();
        await this.page.goto(url);
        try {
            await this.page.waitForSelector(".product-miniature");
        }catch(e){
            console.log(e);
        }
        const content = await this.page.content();
        //await new Promise(resolve => setTimeout(resolve, 5000));
        return content;
    }
    multiScrap = async (query) => {
        let content = "";
        content = await this.scrap(query, "1")
        let dom = new JSDOM(content);
        let num = dom.window.document.querySelectorAll(".page-list li a");
        if (num.length > 0){
            num = parseInt(num[num.length - 2].textContent)
            for(let i = 2; i <= num; i++){
                content += await this.scrap(query, i);
            }
        }
        return content;
    }
    

}

export default NeoScraper;