const fs = require('fs');
const path = require('path');

function parseHtml(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const elements = doc.body.getElementsByTagName('*');
  const elementsArray = Array.from(elements);
  return elementsArray;
}

function parseCss(cssString) {
  const parser = new CSSParser();
  const result = parser.parse(cssString);
  return result;
}

function parseJs(jsString) {
  const parser = new JSParser();
  const result = parser.parse(jsString);
  return result;
}

function parseFile(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const fileString = fileBuffer.toString();
  if (path.extname(filePath) === '.html') {
    return parseHtml(fileString);
  } else if (path.extname(filePath) === '.css') {
    return parseCss(fileString);
  } else if (path.extname(filePath) === '.js') {
    return parseJs(fileString);
  } else {
    throw new Error(`Unsupported file type: ${path.extname(filePath)}`);
  }
}

module.exports = { parseHtml, parseCss, parseJs, parseFile };