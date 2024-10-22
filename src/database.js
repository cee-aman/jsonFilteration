import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { vesselSchema } from './schema.js'; // Importing the vessel schema


// Enable dev-mode
addRxPlugin(RxDBDevModePlugin);

async function createDatabase() {
    const myDatabase = await createRxDatabase({
        name: 'mydatabase1',
        storage: getRxStorageDexie(),
        ignoreDuplicate: true // This option allows the database to be recreated if it already exists

    });

    // Add collections to the database
    await myDatabase.addCollections({
        todos: {
            schema: vesselSchema
        }
    });

    return myDatabase;
}

export default createDatabase;