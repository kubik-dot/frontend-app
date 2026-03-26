const fs = require('fs');
const path = require('path');

class Parser {
    constructor(filePath) {
        this.filePath = path.resolve(__dirname, filePath);
    }

    readFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    parseJSON(data) {
        try {
            return JSON.parse(data);
        } catch (err) {
            throw new Error('Invalid JSON format');
        }
    }

    async parse() {
        const fileContent = await this.readFile();
        return this.parseJSON(fileContent);
    }
}

module.exports = Parser;