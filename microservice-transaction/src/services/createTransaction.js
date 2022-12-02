const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const { config } = require('../config/dynamodb-local');

const dynamodb = new AWS.DynamoDB.DocumentClient(
  process.env.NODE_ENV === 'test' ? config : {}
);

const createTransaction = async (event) => {
  const {
    numero_ini,
    saldo_cuenta,
    numero_destino,
    saldo_destino,
    montoTrasferido,
    nombre,
    correo,
  } = JSON.parse(event.body);

  const createdAt = new Date();
  const id = v4();

  // Generar codigo Transaccion
  let random = Math.random();
  random = random * 100 + 10000;
  cod_operacion = Math.trunc(random);

  const newTransaction = {
    id: id,
    fechaCrea: createdAt,
    cod_operacion: cod_operacion,
    nombre: nombre,
    correo: correo,
    numero_ini: numero_ini,
    saldo_cuenta: saldo_cuenta,
    numero_destino: numero_destino,
    saldo_destino: saldo_destino,
    montoTrasferido: montoTrasferido,
  };

  //   setTimeout(async () => {
  try {
    let generarRandomError = Boolean(Math.round(Math.random()));
    if (process.env.NODE_ENV === 'test') {
      generarRandomError = false;
    }
    if (generarRandomError) {
      return {
        status: 400,
        message: 'Ups, ocurrio un error en la transacccion',
      };
    }

    await dynamodb
      .put({
        TableName: 'TransactionTable',
        Item: newTransaction,
      })
      .promise();

    return {
      status: 200,
      body: JSON.stringify(newTransaction),
      message: 'Transacción exitosa',
    };
  } catch (error) {
    console.log(error);
  }
  //   }, 10000);
};

module.exports = {
  createTransaction,
};
