const AWS = require('aws-sdk');
const { config } = require('../config/dynamodb-local');

const dynamodb = new AWS.DynamoDB.DocumentClient(
  process.env.NODE_ENV === 'test' ? config : {}
);

const getTransactionById = async (event) => {
  const { id } = event.pathParameters;
  const result = await dynamodb
    .get({
      TableName: 'TransactionTable',
      Key: {
        id,
      },
    })
    .promise();

  const task = result.Item;

  return {
    status: 200,
    body: {
      task,
    },
  };
};

module.exports = {
  getTransactionById,
};
