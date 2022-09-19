const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
    return fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        }
        return data;
    });
}

async function getContactById(contactId) {
    const currentData = await listContacts();

    return JSON.parse(currentData).find(contact => contact.id === contactId);
}

async function removeContact(contactId) {
    const currentData = await listContacts();
    const contact = await getContactById(contactId);

    const newData = JSON.parse(currentData).filter(contact => contact.id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(newData));

    return contact;
}

async function addContact(name, email, phone) {
    const currentData = await listContacts();

    const lastId = JSON.parse(currentData)[JSON.parse(currentData).length - 1].id;
    const newContact = {id: `${parseInt(lastId) + 1}`, name, email, phone};

    const newData = [...JSON.parse(currentData), newContact];

    fs.writeFile(contactsPath, JSON.stringify(newData), err => {
        if (err) {
            console.error(err);
        }
    });

    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
