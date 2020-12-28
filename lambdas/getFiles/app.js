// eslint-disable-next-line import/no-unresolved
const AWS = require("aws-sdk");

const { AWS_REGION: region } = process.env;

const docClient = new AWS.DynamoDB.DocumentClient();

const getItems = async function ({ startKey }) {
  const params = {
    TableName: "files",
  };

  return docClient.scan(params).promise();
};

exports.handler = async (event) => {
  try {
    const { startKey } = event.queryStringParameters || {};
    const result = await getItems({ startKey });
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `${e}` }),
    };
  }
};
