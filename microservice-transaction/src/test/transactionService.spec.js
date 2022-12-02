const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const jestConfig = require('../../jest.config');
const { config } = require('../config/dynamodb-local');
const { createTransaction } = require('../services/createTransaction');
const { getTransaction } = require('../services/getTransaction');
const { getTransactionById } = require('../services/getTransactionById');

const ddb = new DocumentClient(config);

it('should get all transactions', async () => {
  const newTransaction = {
    id: '123',
    nombre: 'nombre',
    correo: 'correo',
    cod_operacion: '1234',
    comp_bancario: '321',
    numero_ini: 'numero_ini',
    saldo_cuenta: 'saldo_cuenta',
    numero_destino: 'numero_destino',
    saldo_destino: 'saldo_destino',
    message: 'message',
    fechaCrea: 'createdAt',
    actualizado: false,
  };
  await ddb
    .put({ TableName: 'TransactionTable', Item: newTransaction })
    .promise();

  const result = await getTransaction();

  expect(result.status).toBe(200);
});

it('should get a transaction by Id', async () => {
  const newTransaction = {
    id: '123',
    nombre: 'nombre',
    correo: 'correo',
    cod_operacion: '1234',
    comp_bancario: '321',
    numero_ini: 'numero_ini',
    saldo_cuenta: 'saldo_cuenta',
    numero_destino: 'numero_destino',
    saldo_destino: 'saldo_destino',
    message: 'message',
    fechaCrea: 'createdAt',
    actualizado: false,
  };
  await ddb
    .put({ TableName: 'TransactionTable', Item: newTransaction })
    .promise();

  const event = {
    pathParameters: { id: '123' },
  };
  const result = await getTransactionById(event);

  expect(result.status).toBe(200);
});

it('should create a new transaction', async () => {
  const newTransaction = {
    nombre: 'Juan Albites',
    correo: 'albites@correo.com',
    numero_ini: '123456789',
    saldo_cuenta: '334',
    numero_destino: '987654321',
    saldo_destino: '4345',
    montoTrasferido: '100',
  };
  const event = {
    body: JSON.stringify(newTransaction),
  };

  const result = await createTransaction(event);

  expect(result.status).toBe(200);
});
