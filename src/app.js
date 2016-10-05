import express from 'express';
import bodyParser from 'body-parser'
import compress from 'compression'
import helmet from 'helmet'

const app = express();

// use middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compress())
app.use(helmet())

app.get('/', (req, res) => {
    res.send(`hello world!`);
});

let server = app.listen(process.env.PORT || '3000', () => {
    console.log('server running http://localhost:3000');
});
