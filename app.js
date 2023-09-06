import express from 'express'
import bodyParser from 'body-parser'
import {
    pipeline
} from '@xenova/transformers';
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = process.env.PORT || 5000
let generator;

app.get('/', (req, res) => {
    res.send('Welcome to Node MIF Summarization')
})


app.post('/mif', async (req, res) => {
    let body = req.body;
    let text = body.text || "";

    let output = await generator(text, {
        max_new_tokens: 100,
    });
    res.send(output)
})


app.listen(port, async () => {
    generator = await pipeline('summarization');
    console.log(`Example app listening on port ${port}`)
})