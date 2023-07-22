import express from 'express';

import ScrapController from './controllers/scrapController.js';

const app = express();

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('src/public'));

app.get('/', (req, res) => {
    const scrapController = new ScrapController();
    scrapController.getDataFromDB(req,res);
});

app.get('/scrap', (req, res) => {
    res.render('scrap',{data:[]});
    });
    
app.post('/scrap', async (req, res) => {
    const scrapController = new ScrapController();
    await scrapController.init();
    let query  = req.body.query;
    let pages = 1;
    const content = await scrapController.getData(query, pages);
    res.render("scrap",{data:content});
    }
);
app.listen(3000, () => {
    console.log('Example app listening on port 3003!');
    }
);