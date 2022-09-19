const fs = require('fs').promises;

const listContacts = require('./listContacts');
const writeFile = require('./writeFile');

const addContact = async (name, email, phone) => {
    const currentContacts = await listContacts();

    const lastId = currentContacts[currentContacts.length - 1].id;
    const newContact = {id: `${parseInt(lastId) + 1}`, name, email, phone};

    const newData = [...currentContacts, newContact];
    await writeFile(newData);
    return newContact;
};

module.exports = addContact;
