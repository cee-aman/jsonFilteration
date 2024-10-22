import React, { useEffect, useState } from 'react';
import { shipData } from './shipdata.js';
import createDatabase from './database.js';

const DataHandler = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const injectData = async () => {
    setLoading(true);
    setError(null);
    try {
      const db = await createDatabase();
      
      // Remove all existing data
      await db.todos.find().remove();
      console.log("Old data removed");
  
      // Insert the new shipData
      await db.todos.bulkInsert(shipData);
      console.log(`Injected ${shipData.length} items into the database`);
  
      const totalRecords = await db.todos.find().exec();
      console.log(`Total records in the database: ${totalRecords.length}`);
      
    } catch (err) {
      setError(`Error injecting data: ${err.message || 'Unknown error'}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const db = await createDatabase();
      console.time("rxdb data getting check");
      const fetchedData = await db.todos.find().exec();
      console.timeEnd("rxdb data getting check");
console.log(fetchedData)
      const newData = fetchedData.map((item) => item._data);
      setData(newData);
      console.log('Fetched Data:', newData);
    } catch (err) {
      setError(`Error fetching data: ${err.message || 'Unknown error'}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {

  //   const fetchData = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const db = await createDatabase();
  //       console.time("rxdb data getting check");
  //       const fetchedData = await db.todos.find().exec();
  //       console.timeEnd("rxdb data getting check");
  // console.log(fetchedData)
  //       const newData = fetchedData.map((item) => item._data);
  //       setData(newData);
  //       console.log('Fetched Data:', newData);
  //     } catch (err) {
  //       setError(`Error fetching data: ${err.message || 'Unknown error'}`);
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData()

  // }, [])
  

  // New function to filter data using RxDB's find method
 // New function to filter data using RxDB's find method
const filterData = async () => {
    console.time('rxdb filter time');
    const db = await createDatabase();
    
    // Build the selector based on the filtering conditions
    const items = await db.todos.find({
        selector: {
            $and: [
                {
                    ais_class: { $ne: 'B' }, // ais_class must NOT equal 'B'
                },
                {
                    $or: [
                        {
                            vessel_type: { $ne: 80 }, // vessel_type must NOT equal 80
                        },
                        {
                            mmsi_type: { $eq: 'Normal_ship' }, // mmsi_type must equal 'Normal_ship'
                        },
                        {
                            sog: { $lt: 100 }, // sog must be less than 12
                        },
                        {
                            cog: { $gt: 200 }, // cog must be greater than 200
                        },
                        {
                            $and: [
                                { length: { $eq: null } }, // length must be null
                                { width: { $eq: null } }, // width must be null
                                { draught: { $eq: null } }, // draught must be null
                                { 'addl_info.lpc': { $eq: null } }, // addl_info.lpc must be null
                            ]
                        }
                    ]
                }
            ]
        }
    }).exec();

    console.timeEnd('rxdb filter time');
};


  return (
    <div>
      <h1>Data Handler</h1>
      {loading && <p>Loading...</p>}
      <button onClick={injectData}>Inject Data</button>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={() => filterData()}>
        Filter Data
      </button>
      <button > Clear PrevData</button>
            {data.length > 0 && (
        <div>
          <h2>{loading ? 'Filtering...' : 'Fetched and Filtered Data'}</h2>
          {/* Add list items here */}
        </div>
      )}
    </div>
  );
};

export default DataHandler;
