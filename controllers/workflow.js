import sqlite from 'sqlite3';
const sqlite3 = sqlite.verbose();

const tables = [
    'Customers',
    'Products',
    'Orders'
];

const tableWithHeaders = {
    Customers: ['CustomerId', 'FirstName', 'LastName', 'Email', 'Address'],
    Products: ['ProductId', 'Name', 'Price', 'Stock'],
    Orders: ['OrderId', 'CustomerId', 'ProductsId', 'Quantity', 'OrderDate']
}

export const getAllTables = (req, res) => {
    try {
        res.status(200).json({ data: tables });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

export const getHeadersByTable = (req, res) => {
    try {
        const { tables } = req.body
        const headersData = []
        for (let eachTable of tables) {
            headersData.push(tableWithHeaders[eachTable])
        }

        res.status(200).json({ data: headersData });

    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

export const renderWorkflowOutput = async (req, res) => {
    try {
        const data = req.body
        if (data.allEdges.length == 0) res.send({ isError: true, output: null, message: 'No Connected Edges Found' });
        if (data.selectedHeaders.length == 0) res.send({ isError: true, output: null, message: 'No Data To Show' });
        const selectedTables = data.selectedTables
        const selectedHeaders = data.selectedHeaders
        const filteredHeaders = {}
        selectedTables.forEach((eachTable) => {
            const tablesData = tableWithHeaders[eachTable.value]
            selectedHeaders.forEach((eachHeader) => {
                if (tablesData.includes(eachHeader.value)) {
                    if (filteredHeaders[eachTable.value]) {
                        filteredHeaders[eachTable.value].push(eachHeader.value)
                    } else {
                        filteredHeaders[eachTable.value] = [eachHeader.value]
                    }
                }
            })
        });
        const db = new sqlite3.Database('./database/ecommerce.db');
        const result = []
        for (let eachTable in filteredHeaders) {
            const db = new sqlite3.Database('./database/ecommerce.db', sqlite.OPEN_READWRITE);
            const result = [];
            for (let eachTable in filteredHeaders) {
                let query = `SELECT ${filteredHeaders[eachTable]} FROM ${eachTable}`;
                db.run(query, [filteredHeaders[eachTable]], (err) => {
                    console.log(filteredHeaders[eachTable])
                })
            }
            console.log(result);
            return result;
        }
        console.log(result)
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}