const AWS = require('aws-sdk');

const getTransaction = async (event) => {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const result = await dynamodb.scan({
            TableName: 'TransactionTable'
        }).promise()

        const transaction = result.Items;
        console.log(transaction)

        return {
            status: 200,
            body:{
                transaction
            }
        }

};

module.exports = {
    getTransaction
}

