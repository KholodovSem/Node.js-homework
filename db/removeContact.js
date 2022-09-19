const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const writeFile = require('./writeFile');

const removeContact = async contactId => {
    const currentData = await listContacts();
    const contact = await getContactById(contactId);

    const newData = currentData.filter(contact => contact.id !== contactId);

    await writeFile(newData);
    return contact;
};

module.exports = removeContact;
