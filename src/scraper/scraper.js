import puppeteer from "puppeteer";

/**
 * @class Scraper
 */
class Scraper{
    /**
     * @constructor
     * @param {boolean} headless
     */
    constructor(headless = true){
        this.browser = null;
        this.page = null;
        this.headless = headless;
        this.baseURL = new URL("https://www.amazon.es/s");
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
    scrap = async (query,page) => {
        try{
            this.baseURL.searchParams.set("k", query);
            this.baseURL.searchParams.set("page", page);
            const url = this.baseURL.toString();
            await this.page.goto(url);
            await this.page.waitForSelector(".s-card-container",{timeout: 5000});
            const content = await this.page.content();
            //await new Promise(resolve => setTimeout(resolve, 5000));
            return content;
        }
        catch(e){
            return [];
        }
        
    }
    multiScrap = async (query, pages) => {
        let content = "";
        for(let i = 1; i <= pages; i++){
            content += await this.scrap(query, i);
        }
        return content;
    }

}

export default Scraper;