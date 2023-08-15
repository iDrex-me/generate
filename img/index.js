const express = require('express');
const { createCanvas } = require('canvas');

const app = express();
const port = 3000;

function wrapText(context, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        if (context.measureText(currentLine + " " + word).width < maxWidth) {
            currentLine += " " + word;
        } else {
            splitCurrentLine(currentLine, lines, maxWidth, context);
            currentLine = word;
        }
    }
    splitCurrentLine(currentLine, lines, maxWidth, context);  // Para a última linha

    return lines;
}

function splitCurrentLine(line, lines, maxWidth, context) {
    const words = line.split(' ');
    let currentSubLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        if (context.measureText(currentSubLine + " " + word).width < maxWidth) {
            currentSubLine += " " + word;
        } else {
            lines.push(currentSubLine);
            currentSubLine = word;
        }
    }
    lines.push(currentSubLine);
}



app.get('/img', (req, res) => {
    const MAX_WIDTH = 1000;
    const MAX_HEIGHT = 1000;
    const MAX_TEXT_LENGTH = 100;

    const text = req.query.text ? req.query.text.slice(0, MAX_TEXT_LENGTH) : 'Texto padrão';
    const size = (req.query.size || '500x500').split('x');
    const color = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(req.query.color) ? req.query.color : '#000';
    const background = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(req.query.background) ? req.query.background : '#FFF';

    let width = Math.min(parseInt(size[0], 10), MAX_WIDTH);
    let height = Math.min(parseInt(size[1], 10), MAX_HEIGHT);

    // Garantir que os valores sejam válidos
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        width = 500;
        height = 500;
    }

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '30px Arial';
    const lines = wrapText(context, text, width - 40);  // 40 é uma margem de 20px de cada lado
    const lineHeight = 30;  // Defina a altura da linha baseada no tamanho da fonte
    for (let j = 0; j < lines.length; j++) {
        context.fillText(lines[j], width / 2, height / 2 - (lines.length - 1) * lineHeight / 2 + j * lineHeight);
    }
    

    res.writeHead(200, { 'Content-Type': 'image/png' });
    canvas.createPNGStream().pipe(res);
});

app.listen(port, () => {
    console.log(`App ouvindo em http://localhost:${port}`);
});
