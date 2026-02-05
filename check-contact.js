const { ContactDetails } = require('./src/models');

async function check() {
  try {
    const contacts = await ContactDetails.findAll();
    console.log('Contacts found:', contacts.length);
    contacts.forEach(c => console.log(`- ${c.sectionTitle}: ${c.entityName}`));
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

check();
