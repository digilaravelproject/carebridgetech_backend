const { ContactDetails } = require('./src/models');

async function check() {
  try {
    const contacts = await ContactDetails.findAll();
    console.log('Contacts found:', contacts.length);
    if (contacts.length > 0) {
        console.log('✅ Contact details found in database.');
        contacts.forEach(c => console.log(`- ${c.sectionTitle}`));
    } else {
        console.log('❌ No contact details found.');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

check();
