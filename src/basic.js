import React, { Children } from 'react'
import {shipData} from './shipdata.js'
import jsonLogic from 'json-logic-js';



function Basic() {


    function dataCheck () {
        console.time("basic data getting check")
        console.log(shipData)
        console.timeEnd('basic data getting check')
    }
    dataCheck()


    const filterData = () => {
        console.time('wassup');
      
        const jsonLogicRule = {
          "and": [
            {
              "or": [
                { "==": [{ "var": "ais_class" }, "A"] },
                { "==": [{ "var": "ais_class" }, "B"] }
              ]
            },
            {
              "or": [
                { "==": [{ "var": "vessel_type" }, 70] },
                { "==": [{ "var": "vessel_type" }, 52] }
              ]
            },
            {
              "and": [
                { "!": { "==": [{ "var": "sog" }, null] } },
                { "<=": [{ "var": "sog" }, 12] }
              ]
            },
            {
              "and": [
                { "!": { "==": [{ "var": "cog" }, null] } },
                { ">=": [{ "var": "cog" }, 200] }
              ]
            },
            {
              "!": { "==": [{ "var": "flag_code" }, "477"] }
            },
            {
              "!!": { "var": "imo" }
            }
          ]
      };
      
        // Check if shipData has the required fields
      
        // Filter shipData based on the jsonLogicRule
        const result = shipData.filter(item => {
          const logicResult = jsonLogic.apply(jsonLogicRule, item);
          return logicResult; // Keep only the items that satisfy the rule
        });
      
        console.log(result, 'heyoyyyy filtered data');
        console.timeEnd('wassup');
      
        return result;
      };
      
      // Call the function to run the filter
      

      
      
  return (
    <div>
    
    <button onClick={filterData}>filterData</button>

    
    </div>

  )
}

export default Basic