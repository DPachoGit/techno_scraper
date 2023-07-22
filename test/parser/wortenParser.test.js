import Parser from "../../src/parser/parser.js";
import fs from "fs";

describe("Parser", () => {
    let parser;
    let html;
    beforeAll(async () => {
        html = fs.readFileSync("./test/test.html", "utf8");
        parser = new Parser(html);
    });
    it("should return all card containers", async () => {
        const cards = parser.getCards();
        expect(cards.length).toBe(61);
    });
    it("should return the title of a card", async () => {
        const cards = parser.getCards();
        const title = parser.getTitle(cards[1]);
        expect(title).toBe("DIGIDU | Cuadro Escudo Betis Madera, Betis Regalo, Decoración Hogar, Decoración Habitación, Decoración Salón Moderno, Regalo Futbol, Regalo Entrenador, Regalo Original (Betis)");
    });
    it("should return the price of a card", async () => {
        const cards = parser.getCards();
        const price = parser.getPrice(cards[1]);
        expect(price).toBe("29,99");
    });
    it("should return the image of a card", async () => {
        const cards = parser.getCards();
        const image = parser.getImage(cards[1]);
        expect(image).toBe("https://m.media-amazon.com/images/I/61zhQ+ja+3L._AC_UL400_.jpg");
    });
    it("should return the url of a card", async () => {
        const cards = parser.getCards();
        const url = parser.getUrl(cards[1]);
        expect(url).toContain("/sspa/click");
    });
    it("should return a card", async () => {
        const cards = parser.getCards();
        const card = parser.getCard(cards[1]);
        expect(card).toHaveProperty("title");
        expect(card).toHaveProperty("price");
        expect(card).toHaveProperty("image");
        expect(card).toHaveProperty("url");
        expect(card.price).toBe("29,99");
    });
    it("should return an array of cards", async () => {
        const cards = parser.getCardsArray();
        expect(cards.length).toBe(60);
    });
});
    