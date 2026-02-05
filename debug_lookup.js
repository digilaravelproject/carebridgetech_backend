const { ProductPlatform, sequelize } = require('./src/models');

async function testLookup() {
  try {
    console.log('Testing ProductPlatform lookup...');
    const idToFind = 2; // The ID from the user's error log
    const platform = await ProductPlatform.findByPk(idToFind);

    if (platform) {
      console.log('SUCCESS: Found platform!');
      console.log('ID (PK):', platform.id);
      console.log('PlatformId (String):', platform.platformId);
      console.log('Full Object:', platform.toJSON());
    } else {
      console.error('FAILURE: Could not find platform with ID', idToFind);
    }

  } catch (error) {
    console.error('ERROR during lookup:', error);
  } finally {
    await sequelize.close();
  }
}

testLookup();
