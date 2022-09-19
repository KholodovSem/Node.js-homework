// Initialize
const express = require('express');
const morgan = require('morgan');
const {Command} = require('commander');
const app = express();
const PORT = 8800;

// Import helpers
const {listContacts, getContactById, removeContact, addContact} = require('./helpers/contactsAPI');

//
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({action, id, name, email, phone}) {
    switch (action) {
        case 'list':
            (async function () {
                const result = await listContacts();
                console.log(result);
            })();
            break;

        case 'get':
            (async function () {
                const result = await getContactById(id);
                console.log(result);
            })();
            break;

        case 'add':
            (async function () {
                const result = await addContact(name, email, phone);
                console.log('Contact successfully added' + '\n', result);
            })();
            break;

        case 'remove':
            (async function () {
                const result = await removeContact(id);
                console.log('Contact successfully removed' + '\n', result);
            })();
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);

//Middleware
app.use(express.json()); // Обрабатывать JSON-формат
app.use(morgan('tiny')); // Logger
app.use(express.urlencoded({extended: true})); // Обрабатывать данные с форм
app.use(express.static('public')); // Делает дерикторию общедоступной (http://localhost:8800/public_text.txt)

//Routes & Handler's
app.get('/contacts', async (req, res) => {
    const contacts = await listContacts();
    res.send(contacts);
});

app.get('/contacts/:contactId', async (req, res) => {
    contactId = req.params['contactId'];
    const contact = await getContactById(contactId);

    res.send(contact);
});

app.post('/contacts', async (req, res) => {
    await addContact(...req.body);
    res.send(req.body);
});

app.delete('/contacts/:contactId', async (req, res) => {
    contactId = req.params['contactId'];
    removeContact(contactId);
    res.send('Контакт успешно удалён');
});

//Listener
app.listen(PORT, err => {
    if (err) {
        throw err;
    }

    console.log(`Server is running on http:localhost:${PORT}`);
});
