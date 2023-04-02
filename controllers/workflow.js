export const getAllTables = (req, res) => {
    try {
        const tables = [
            'Customers',
            'Products',
            'Orders'
        ];
        res.status(200).json({ data: tables });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

export const getHeadersByTable = (req, res) => {
    try {
        const { tables } = req.body
        const tableWithHeaders = {
            Customers: ['CustomerId', 'FirstName', 'LastName', 'Email', 'Address'],
            Products: ['ProductId', 'Name', 'Price', 'Stock'],
            Orders: ['OrderId', 'CustomerId', 'ProductsId', 'Quantity', 'OrderDate']
        }
        const headersData = []
        for (let eachTable of tables) {
            headersData.push(tableWithHeaders[eachTable])
        }

        res.status(200).json({ data: headersData });

    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}