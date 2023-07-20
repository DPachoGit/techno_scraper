import express from 'express';
import AmazonController from './controllers/amazonController.js';
const app = express();

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    const amazonController = new AmazonController();
    amazonController.getDataFromDB(req,res);
    });

app.get('/scrap', (req, res) => {
    res.render('scrap');
    });

app.post('/scrap', async (req, res) => {
    const amazonController = new AmazonController();
    await amazonController.init();
    let query  = req.body.query;
    let pages = 4;
    const content = await amazonController.getData(query, pages);
    res.send(content);
    }
);

app.listen(3003, () => {
    console.log('Example app listening on port 3000!');
    }
);