import express from 'express';
import path from 'path';
import { generate } from './image-generator';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'image-template.html'));
});

app.get('/generate', async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(Buffer.from(await generate()));
});

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
})