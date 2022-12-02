const AWS = require('aws-sdk');
const { config } = require('../config/dynamodb-local');

const dynamodb = new AWS.DynamoDB.DocumentClient(
  process.env.NODE_ENV === 'test' ? config : {}
);

const getTransaction = async (event) => {
  const result = await dynamodb
    .scan({
      TableName: 'TransactionTable',
    })
    .promise();

  const transaction = result.Items;

  return {
    status: 200,
    body: {
      transaction,
    },
  };
};

module.exports = {
  getTransaction,
};
