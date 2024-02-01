import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const TableName = "listDB";

export const handler = async (event) => {
  console.log(event);
  const { path, method } = event.requestContext.http;
  const params = event?.queryStringParameters;
  let response = {};
  if (!path) {
    response.event = event;
  }
  if (!method) {
    response.event = event;
  }
  if (path && method) {
    response = {
      path,
      method,
    };
  }

  if (params) {
    response.params = params;
  }
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  const errMessage = `Unsupported route: "${path}"`;
  const healthCheck = async () => {};

  const homePage = async () => {
    response.message = "Welcome to serverless api";
  };

  const createList = async () => {
    const { description } = JSON.parse(event.body);
    await dynamo
      .send(
        new PutCommand({
          TableName,
          Item: {
            id: "2",
            description,
            createdAt: JSON.stringify(new Date()),
          },
        })
      )
      .promise();
    response.message = `Notes has been updated in the database!`;
  };

  const updateListById = async () => {
    const config = {
      TableName,
      Item: {
        id: 11,
        createdAt: JSON.stringify(new Date()),
        description: "Microservice",
      },
    };
    await dynamo.put(config).promise();
    response.message = "Successfully Updated The Notes!";
  };

  const listAll = async () => {
    const result = await dynamo.send(new ScanCommand({ TableName })).promise();
    response.data = result.Items || [];
    // response.message = response.Items;
  };

  const listById = async () => {
    const result = await dynamo.send(
      new GetCommand({
        TableName,
        Key: {
          id: params?.id,
        },
      }).promise()
    );
    response.data = result.Item;
  };

  const deleteListById = async () => {
    dynamo.send(
      new DeleteCommand({
        TableName,
        Key: {
          id: params?.id,
        },
      }).promise()
    );
    response.message = `Deleted item ${params?.id}`;
  };

  const deleteAllList = async () => {
    dynamo.send(
      new DeleteCommand({
        TableName,
        Key: {},
      }).promise()
    );
    response.message = `Deleted all`;
  };

  try {
    switch (true) {
      case path == "/" && method == "GET":
        await homePage();
        break;
      case path == "/health-check" && method == "GET":
        await healthCheck();
        break;
      case path == "/list" && method == "DELETE":
        await deleteAllList();
        break;
      case path == "/list/{id}" && method == "DELETE":
        await deleteListById();
        break;
      case path == "/list/{id}" && method == "GET":
        await listById();
        break;
      case path == "/list" && method == "GET":
        await listAll();
        break;
      case path == "/list" && method == "POST":
        await createList();
        break;
      case path == "/list/{id}" && method == "PATCH":
        await updateListById();
        break;
      default:
        response.message = errMessage;
        throw new Error(errMessage);
    }
  } catch (err) {
    statusCode = 400;
    response.error = err.message;
  }
  return {
    statusCode,
    response,
    headers,
  };
};
