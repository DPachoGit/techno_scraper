import puppeteer from "puppeteer";

class PcCompScraper{
    constructor(headless = true){
        this.browser = null;
        this.page = null;
        this.headless = headless;
        this.baseURL = new URL("https://www.pccomponentes.com/");
    }
    
    init = async () => {
        this.browser = await puppeteer.launch({headless: this.headless});
        this.page = await this.browser.newPage();
    }
    close = async () => {
        await this.browser.close();
    }
    scrap = async (query,page) => {
        this.baseURL.searchParams.set("k", query);
        this.baseURL.searchParams.set("page", page);
        const url = this.baseURL.toString();
        await this.page.goto(url);
        const content = await this.page.content();
        //await new Promise(resolve => setTimeout(resolve, 5000));
        return content;
    }
    multiScrap = async (query, pages) => {
        let content = "";
        for(let i = 1; i <= pages; i++){
            content += await this.scrap(query, i);
        }
        return content;
    }

}

export default PcCompScraper;