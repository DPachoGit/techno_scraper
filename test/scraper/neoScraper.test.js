import NeoScraper from "../../src/scraper/neoSraper.js";

describe("Scraper", () => {
    let scraper;
    beforeAll(async () => {
        scraper = new NeoScraper(false);
        await scraper.init();
    });
    afterAll(async () => {
        await scraper.close();
    });
    it("should return a string", async () => {
        let query = "disco";
        const content = await scraper.scrap(query);
        expect(content).toContain("Neobyte");
    }, 30000);
});