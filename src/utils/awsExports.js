// import awsmobile from "../aws-exports";
import "./init";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const SECRETS = import.meta.env;
const DASHBOARD_URL = SECRETS.VITE_DASHBOARD_URL;
const COGNITO_URL = SECRETS.VITE_COGNITO_URL;
export const REGION = SECRETS.VITE_REGION;
export const USER_POOL_ID = SECRETS.VITE_USER_POOL_ID;
export const USER_POOL_APP_CLIENT_ID = SECRETS.VITE_USER_POOL_APP_CLIENT_ID;
export const cognitoURL = `${COGNITO_URL}?client_id=${USER_POOL_APP_CLIENT_ID}&response_type=code&scope=email+openid+phone&redirect_uri=${DASHBOARD_URL}`;

const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: USER_POOL_APP_CLIENT_ID,
  endpoint: COGNITO_URL,
  AdvancedSecurityDataCollectionFlag: true,
};

export const cognito = new CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: USER_POOL_APP_CLIENT_ID,
  endpoint: COGNITO_URL,
  AdvancedSecurityDataCollectionFlag: true,
});

export default poolData;
