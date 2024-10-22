import React from 'react';
import { shipData } from './shipdata.js';
import jsonata from 'jsonata';

function JSONAATA() {
    const filterData = async () => {
        console.log('Running JSONata filter');
        console.time('JSONataFilter');

        const jsonataExpression = `
            $filter(shipData, function($v) {
                (
                    ($v.ais_class in ['A', 'B']) and
                    ($v.vessel_type in [70, 52]) and
                    ($v.sog ? $v.sog <= 12) and
                    ($v.cog ? $v.cog >= 200) and
                    ($v.flag_code != '477') and
                    ($v.imo)
                )
            })
        `;

        try {
            const result = await jsonata(jsonataExpression).evaluate({ shipData });
            console.log(result, 'Filtered data with JSONata');
            console.timeEnd('JSONataFilter');
        } catch (error) {
            console.error('Error evaluating JSONata expression:', error);
        }
    };

    return (
        <div>
            <button onClick={filterData}>Filter Data</button>
        </div>
    );
}

export default JSONAATA;