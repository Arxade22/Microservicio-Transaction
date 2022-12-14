// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "microservice-transaction",
    "version": "1"
  },
  "paths": {
    "/transaction": {
      "post": {
        "summary": "createTransaction",
        "description": "",
        "operationId": "createTransaction.post./transaction",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      },
      "get": {
        "summary": "getTransaction",
        "description": "",
        "operationId": "getTransaction.get./transaction",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    },
    "/transaction/{id}": {
      "get": {
        "summary": "getTransactionById",
        "description": "",
        "operationId": "getTransactionById.get./transaction/{id}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    }
  },
  "definitions": {},
  "securityDefinitions": {}
};