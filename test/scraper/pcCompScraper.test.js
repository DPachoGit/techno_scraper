import PcCompScraper from "../../src/scraper/pcCompScraper.js";

describe("Scraper", () => {
    let scraper;
    beforeAll(async () => {
        scraper = new PcCompScraper(false);
        await scraper.init();
    });
    afterAll(async () => {
        await scraper.close();
    });
    it("should return a string", async () => {
        let query = "iphone";
        const content = await scraper.scrap(query,2);
        expect(content).toContain("www.pccomponentes.com");
    }, 30000);
});