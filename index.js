// Import command
const {Command} = require('commander');

// Import helpers
const {listContacts, getContactById, removeContact, addContact} = require('./db');

//Initialize command
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({action, id, name, email, phone}) => {
    switch (action) {
        case 'list':
            const contacts = await listContacts();
            console.log(contacts);
            break;

        case 'get':
            const contact = await getContactById(id);
            if (!contact) {
                throw new Error(`Contact with id=${id} not found`);
            }
            console.log(contact);
            break;

        case 'add':
            const newContact = await addContact(name, email, phone);
            console.log(newContact);
            break;

        case 'remove':
            const removedContact = await removeContact(id);
            console.log(removedContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
};

invokeAction(argv);
