import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import { AuthConfirmSignUp, AuthSignIn, AuthSignUp } from "definitions";

//https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out

export const awsSignUp = async ({
  username,
  email,
  password,
}: AuthSignUp): Promise<CognitoUser> => {
  const { user } = await Auth.signUp({
    username,
    password,
    attributes: {
      email, // optional
    },
  });
  return user;
};

export const awsConfirmSignup = async ({
  username,
  code,
}: AuthConfirmSignUp) => {
  return await Auth.confirmSignUp(username, code);
};

export const awsSignIn = async ({ username, password }: AuthSignIn) => {
  const user = await Auth.signIn(username, password);
  return user;
};

export const awsResendConfirmationCode = async (username: string) => {
  return await Auth.resendSignUp(username);
};

export const awsSignOut = async () => {
  await Auth.signOut();
};
