const fs = require('fs').promises;

const contactsPath = require('./contactsPath');

const writeFile = async data => {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(data));
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = writeFile;
