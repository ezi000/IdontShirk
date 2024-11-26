import DefaultButton from "../DefaultButton";
import GoogleIcon from "../Icons/GoogleIcon";
import useLoginLogic from "./useLoginLogic";
import { User } from "./User";

const LoginButton = ({ user }: { user: User }) => {
  const { login, logOut } = useLoginLogic();

  return (
    <>
      {user.id ? (
        <DefaultButton onClick={logOut}>Log out</DefaultButton>
      ) : (
        <DefaultButton startIcon={<GoogleIcon />} onClick={() => login()}>
          Sign in with Google
        </DefaultButton>
      )}
    </>
  );
};

export default LoginButton;
