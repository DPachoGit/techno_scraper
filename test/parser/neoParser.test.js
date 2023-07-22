import NeoParser from "../../src/parser/neoParser.js";
import fs from "fs";

describe("Parser", () => {
    let parser;
    let html;
    beforeAll(async () => {
        html = fs.readFileSync("./test/neoTest.html", "utf8");
        parser = new NeoParser(html);
    });
    it("should return all card containers", async () => {
        const cards = parser.getCards();
        expect(cards.length).toBeGreaterThanOrEqual(4);
    });
    it("should return the title of a card", async () => {
        const cards = parser.getCards();
        const title = parser.getTitle(cards[0]);
        expect(title).toBe("Disco duro Seagate 1TB 2.5 SATA 6GB 128MB");
    });
    it("should return the price of a card", async () => {
        const cards = parser.getCards();
        const price = parser.getPrice(cards[0]);
        expect(price).toBe("37,90 €");
    });
    it("should return the image of a card", async () => {
        const cards = parser.getCards();
        const image = parser.getImage(cards[0]);
        expect(image).toBe("https://www.neobyte.es/8956-home_default/disco-duro-seagate-1tb-2-5-sata-6gb-128mb.jpg");
    });
    it("should return the url of a card", async () => {
        const cards = parser.getCards();
        const url = parser.getUrl(cards[0]);
        expect(url).toContain("https://www.neobyte.es/disco-duro-seagate-1tb-2-5-sata-6gb-128mb-285.html");
    });
    it("should return a card", async () => {
        const cards = parser.getCards();
        const card = parser.getCard(cards[0]);
        expect(card).toHaveProperty("title");
        expect(card).toHaveProperty("price");
        expect(card).toHaveProperty("image");
        expect(card).toHaveProperty("url");
        expect(card.price).toBe("37,90 €");
    });
    it("should return an array of cards", async () => {
        const cards = parser.getCardsArray();
        expect(cards.length).toBeGreaterThanOrEqual(2);
    });
});
    