const listContacts = require('./listContacts');

const getContactById = async contactId => {
    const currentData = await listContacts();
    const contactById = currentData.find(contact => contact.id === `${contactId}`);

    if (!contactById) {
        return null;
    }
    return contactById;
};

module.exports = getContactById;
