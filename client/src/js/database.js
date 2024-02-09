import { openDB } from 'idb';

const initdb = async () =>

//initiates the database
  openDB('jate', 1, {

    upgrade(db) {
      //checks if database already exists

      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      
      //creates database with auto id
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// takes content and adds it to the database
export const putDb = async (content) => {

  try {

    console.log('PUT to the database');

    // connects to database and version needed
    const jateDb = await openDB('jate', 1);

    const tx = jateDb.transaction('jate', 'readwrite');

    const store = tx.objectStore('jate');

    const request = store.put({ content: content });
    const result = await request;
    console.log('Data saved to jateDb', result);

  } catch (error) {

    console.log('Error', error);
    throw error;

  }
};

// get all content
export const getDb = async () => {

  try {

    console.log('GET from the database');

    // connects to database and version needed
    const jateDb = await openDB('jate', 1);

    // create a transaction with a named database and data permissions
    const tx = jateDb.transaction('jate', 'readonly');

    // open up the object store for desired database
    const store = tx.objectStore('jate');

    // create a request to get all data in object store
    const request = store.getAll();

    // waits for the results to the request and logs them, then returns
    const result = await request;
    console.log('result.value', result);
    return result.value;

  } catch (error) {

    console.log('Error', error);
    throw error;

  }
};

initdb();
