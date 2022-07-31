import express from 'express';
import path from 'path';
import { generate } from './image-generator';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This line is not important, is just to show template in / route
app.use(express.static(path.join(__dirname, './badge-template')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './badge-template/index.html'));
});

app.get('/generate', async (req, res) => {
    const { username, category } = req.query;
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(Buffer.from(await generate({ username: (username as string) || 'default', category: (category as string) || 'default category' })));
});

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
})