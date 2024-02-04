import { DynamoDBClient, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  // UpdateCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import jwt from "jsonwebtoken";

const randomNumGenerator = () =>
  (Math.floor(Math.random() * 1000000000000000) + 777).toString();
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const TableNameNotes = "listDB";
const TableNameUsers = "User";

export const handler = async (event) => {
  console.log(event?.rawPath);
  const { path, method } = event.requestContext.http;
  const data = event.body && JSON.parse(event.body);
  const params = event?.queryStringParameters;

  let ID;
  let body = {};
  if (!path) {
    body.event = event;
  }
  if (!method) {
    body.event = event;
  }
  if (path && method) {
    body = {
      path,
      method,
    };
  }

  if (params) {
    body.params = params;
    ID = params?.id;
  }
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  const errMessage = `Unsupported route: "${path}"`;
  const healthCheck = async () => {
    body.message = "Healthy";
  };

  const homePage = () => {
    body.message = "Welcome to serverless api";
    body.event = event;
    body.data = data;
  };

  const describeTable = async () => {
    const RequestedTableName = data?.TableName;
    const command = {
      TableName: RequestedTableName,
    };
    const res = await dynamo.send(new DescribeTableCommand(command));
    body.data = res;
  };

  const checkToken = async () => {
    const authorization = event.headers.authorization;
    if (authorization.startsWith("Bearer ")) {
      const TokenArray = authorization.split(" ");
      const token = TokenArray[1];
      const decoded = jwt.verify(token, "LordIsMyShepherd");
      console.log(token, "token", TokenArray, "TokenArray");
      const command = {
        TableName: TableNameUsers,
        Key: {
          json_token: token,
        },
      };
      const res = await dynamo.send(new GetCommand(command));
      console.log(res, decoded.username, decoded);
      if (decoded.token == token) {
        body.verified = true;
      } else {
        body.verified = false;
      }
      // return decoded.token == token ? body.verified = true : body.verified = false;
    } else {
      body.message = "No bearer token found";
      statusCode = 404;
    }
  };

  const listAllUsers = async () => {
    const command = { TableName: TableNameUsers };
    const res = await dynamo.send(new ScanCommand(command));
    body.data = res.Items || [];
    body.Count = res.Count;
    statusCode = res?.["$metadata"]?.httpStatusCode;
  };

  const createSignInUser = async () => {
    const username = data.username || "Anonymous";
    const token = jwt.sign({ username }, "LordIsMyShepherd", {
      expiresIn: "1h",
    });
    const command = {
      TableName: TableNameUsers,
      Item: {
        username,
        createdAt: JSON.stringify(Date.now()),
        json_token: token,
      },
    };
    const res = await dynamo.send(new PutCommand(command));
    body.message = `User has successfully signed in!`;
    body.token = token;
    body.data = res;
  };

  const createList = async () => {
    // const tokenStatus = checkToken();
    // if (!tokenStatus.verified) {
    //   body.verified = false;
    // }
    const { description } = JSON.parse(event.body);
    const command = {
      TableName: TableNameNotes,
      Item: {
        listID: randomNumGenerator(),
        description,
        createdAt: JSON.stringify(new Date()),
      },
    };
    const res = await dynamo.send(new PutCommand(command));

    body.message = `Notes has been updated in the serverless database!`;
    body.data = res;
  };

  const updateListById = async () => {
    const command = {
      TableName: TableNameNotes,
      Item: {
        listID: ID,
        createdAt: new Date() + "",
        description: data?.description,
      },
    };
    const res = await dynamo.send(new PutCommand(command));
    const status = res?.["$metadata"]?.httpStatusCode;
    if (status === 200) {
      body.message = "The note was successfully updated";
      statusCode = status;
    }
  };

  const listAllNotes = async () => {
    const command = { TableName: TableNameNotes };
    const res = await dynamo.send(new ScanCommand(command));
    body.data = res.Items || [];
    body.Count = res.Count;
    statusCode = res?.["$metadata"]?.httpStatusCode;
  };

  const listById = async () => {
    const command = {
      TableName: TableNameNotes,
      Key: {
        listID: JSON.stringify(ID),
      },
    };
    const res = await dynamo.send(new GetCommand(command));
    body.data = res.Item;
    body.data = res;
  };

  const deleteListById = async () => {
    const command = {
      TableName: TableNameNotes,
      Key: {
        listID: Number(ID),
      },
    };
    const res = await dynamo.send(new DeleteCommand(command));
    console.log(res, "res at deleteListById method");
    body.message = `Deleted item ${ID} and result is ${res}`;
    body.data = res;
  };

  const deleteAllList = async () => {
    const command = {
      TableName: TableNameNotes,
    };
    const res = await dynamo.send(new DeleteCommand(command));
    console.log(res, "res at deleteAllList method");
    body.message = `Deleted all and result is ${res}`;
    body.data = res;
  };

  try {
    switch (true) {
      case path == "/" && method == "GET":
        homePage();
        break;
      case path == "/health-check" && method == "GET":
        await healthCheck();
        break;
      case path == "/describe-table" && method == "GET":
        await describeTable();
        break;
      case path == "/list-all-users" && method == "GET":
        await listAllUsers();
        break;
      case path == "/sign-in" && method == "PUT":
        await createSignInUser();
        break;
      case path == "/check-token" && method == "POST":
        await checkToken();
        break;
      case path == "/delete-all" && method == "DELETE":
        await deleteAllList();
        break;
      case path == "/delete-notes-by-id" && method == "PATCH":
        await deleteListById();
        break;
      case path == "/list-notes-by-id" && method == "GET":
        await listById();
        break;
      case path == "/list-all-notes" && method == "GET":
        await listAllNotes();
        break;
      case path == "/create-notes" && method == "POST":
        await createList();
        break;
      case path == "/update-notes" && method == "PUT":
        await updateListById();
        break;
      default:
        body.message = errMessage;
        throw new Error(errMessage);
    }
  } catch (err) {
    statusCode = 400;
    console.log(err, "catch error");
    body.error = err.message;
  }
  return {
    statusCode,
    body,
    headers,
  };
};

// const updateListById = async () => {
//   const command = new UpdateCommand({
//     TableName: TableNameNotes,
//     Key: {
//       listID: ID,
//     },
//     UpdateExpression:
//       "set createdAt = :createdAt, set description = :description",
//     ExpressionAttributeValues: {
//       ":createdAt": JSON.stringify(new Date()),
//       ":description": data?.description,
//     },
//     ReturnValues: "ALL_NEW",
//   });

//   // const command = {
//   //   TableName : TableNameNotes,
//   //   Item: {
//   //     listID: JSON.stringify(ID),
//   //     createdAt: JSON.stringify(new Date()),
//   //     description: data?.description,
//   //   },
//   // };
//   const res = await dynamo.send(new UpdateCommand(command));
//   const status = res?.["$metadata"]?.httpStatusCode;
//   if (status === 200) {
//     body.message = "The note was successfully updated";
//     statusCode = status;
//   }
// };
