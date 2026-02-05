const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log,
  }
);

const tables = [
  'product_content_sections',
  'product_achievements',
  'product_target_audiences',
  'product_deployment_options'
];

const fs = require('fs');

async function logToFile(msg) {
  fs.appendFileSync('migration_log.txt', new Date().toISOString() + ': ' + msg + '\n');
}

async function migrate() {
  try {
    logToFile('Migration started');
    await sequelize.authenticate();
    console.log('Database connected.');
    logToFile('Database connected');

    // 1. Get a default platform ID to assign to existing records
    const [platforms] = await sequelize.query("SELECT platform_id FROM product_platforms LIMIT 1");
    
    let defaultPlatformId = null;
    if (platforms && platforms.length > 0) {
      defaultPlatformId = platforms[0].platform_id;
      console.log(`Found default platform ID: ${defaultPlatformId}`);
      logToFile(`Found default platform ID: ${defaultPlatformId}`);
    } else {
      console.warn('WARNING: No platforms found');
      logToFile('WARNING: No platforms found');
    }

    const queryInterface = sequelize.getQueryInterface();

    for (const table of tables) {
      console.log(`Processing table: ${table}...`);
      logToFile(`Processing table: ${table}`);
      
      // Check if column exists
      const tableInfo = await queryInterface.describeTable(table);
      if (tableInfo.platform_id) {
        console.log(`Column platform_id already exists in ${table}. Skipping addColumn.`);
        logToFile(`Column platform_id already exists in ${table}`);
      } else {
        // Add column allowing NULL initially to populate data
        await queryInterface.addColumn(table, 'platform_id', {
          type: DataTypes.STRING(50),
          allowNull: true, // Allow null initially
        });
        console.log(`Added platform_id to ${table}.`);
        logToFile(`Added platform_id to ${table}`);
      }

      // Populate existing records if we have a default platform
      if (defaultPlatformId) {
        await sequelize.query(`UPDATE ${table} SET platform_id = ? WHERE platform_id IS NULL`, {
          replacements: [defaultPlatformId]
        });
        console.log(`Updated existing records in ${table} with platform_id = ${defaultPlatformId}`);
        logToFile(`Updated records in ${table}`);
      }

      // Now alter column to be NOT NULL (optional, but good for integrity)
      if (defaultPlatformId) {
          try {
            await queryInterface.changeColumn(table, 'platform_id', {
                type: DataTypes.STRING(50),
                allowNull: false
            });
            console.log(`Changed platform_id to NOT NULL in ${table}.`);
            logToFile(`Changed to NOT NULL in ${table}`);
          } catch (e) {
              console.warn(`Could not set ${table}.platform_id to NOT NULL: ${e.message}`);
              logToFile(`Failed to set NOT NULL for ${table}: ${e.message}`);
          }
      }

      // Add Foreign Key Constraint
      try {
        await queryInterface.addConstraint(table, {
          fields: ['platform_id'],
          type: 'foreign key',
          name: `${table}_platform_id_fk`,
          references: {
            table: 'product_platforms',
            field: 'platform_id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
        console.log(`Added Foreign Key constraint to ${table}.`);
        logToFile(`Added FK constraint to ${table}`);
      } catch (error) {
        if (error.original && error.original.code === 'ER_DUP_KEY') {
             console.log(`Constraint likely already exists for ${table}. ignoring.`);
             logToFile(`Constraint already exists for ${table}`);
        } else {
            console.warn(`Failed to add FK constraint to ${table}: ${error.message}`);
            logToFile(`Failed to add FK for ${table}: ${error.message}`);
        }
      }
    }

    console.log('Migration completed successfully.');
    logToFile('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    logToFile(`Migration failed: ${error.message}`);
    process.exit(1);
  }
}

migrate();
