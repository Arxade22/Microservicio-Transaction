const {v4} = require('uuid')
const AWS = require('aws-sdk');

const createTransaction = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient(); 
    const cuenta_inicial  = {
        "numero_ini" : "1223124112",
        "saldo_cuenta" : "150 ",
    }
    const cuenta_destino  = {
        "numero_destino" : "99999999999999",
        "saldo_destino" : "987563626 ",
    }
    const{cod_operacion, comp_bancario, message} = JSON.parse(event.body);
    const{numero_ini, saldo_cuenta } = cuenta_inicial;
    const{numero_destino , saldo_destino } = cuenta_destino;
    // monto a transferir 
    const createdAt = new Date();
    const id = v4(); 
    const nombre = "Martin"
    const correo = "braulio.villegas2019@gmail.com"
    // const message = await ({
     
    // }).promise()

    const newTransaction = {
        id : id,
        nombre : nombre,
        correo: correo,
        cod_operacion : cod_operacion,
        comp_bancario : comp_bancario,
        numero_ini: numero_ini,
        saldo_cuenta:saldo_cuenta,
        numero_destino:numero_destino,
        saldo_destino:saldo_destino,
        message: message, 
        fechaCrea: createdAt,
        actualizado: false 
    }

    await dynamodb.put({
        TableName: 'TransactionTable',
        Item: newTransaction
    }).promise()

    return{
        statusCode: 200,
        body: JSON.stringify(newTransaction)
    }
};


module.exports = {
    createTransaction,
};