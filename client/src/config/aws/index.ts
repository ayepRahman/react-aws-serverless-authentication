export const awsConfig = {
  // aws_cognito_region: process.env.REACT_APP_AWS_REGION, // (required) - Region where Amazon Cognito project was created
  Auth: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_CLIENT_ID,
  },
};
