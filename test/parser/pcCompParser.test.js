import PcCompParser from "../../src/parser/parserPcComp.js";
import fs from "fs";

describe("Parser", () => {
    let parser;
    let html;
    beforeAll(async () => {
        html = fs.readFileSync("./test/pcCompTest.html", "utf8");
        parser = new PcCompParser(html);
    });
    it("should return all card containers", async () => {
        const cards = parser.getCards();
        console.log(cards)
        expect(cards.length).toBe(41);
    });
    it("should return the title of a card", async () => {
        const cards = parser.getCards();
        const title = parser.getTitle(cards[0]);
        expect(title).toBe("Kingston NV2 1TB SSD PCIe 4.0 NVMe Gen 4x4");
    });
    it("should return the price of a card", async () => {
        const cards = parser.getCards();
        const price = parser.getPrice(cards[0]);
       
        expect(price).toBe("47,99€");
    });
    it("should return the image of a card", async () => {
        const cards = parser.getCards();
        const image = parser.getImage(cards[0]);
        expect(image).toBe("https://thumb.pccomponentes.com/w-140-140/articles/1057/10578300/1498-kingston-nv2-1tb-ssd-pcie-40-nvme-gen-4x4.jpg");
    });
    it("should return the url of a card", async () => {
        const cards = parser.getCards();
        const url = parser.getUrl(cards[0]);
        expect(url).toContain("https://www.pccomponentes.com/kingston-nv2-1tb-ssd-pcie-40-nvme-gen-4x4");
    });
    it("should return a card", async () => {
        const cards = parser.getCards();
        const card = parser.getCard(cards[0]);
        expect(card).toHaveProperty("title");
        expect(card).toHaveProperty("price");
        expect(card).toHaveProperty("image");
        expect(card).toHaveProperty("url");
        expect(card.price).toBe("47,99€");
    });
    it("should return an array of cards", async () => {
        const cards = parser.getCardsArray();
        expect(cards.length).toBe(40);
    });
});
    