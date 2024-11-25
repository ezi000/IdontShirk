import { useSelector } from "react-redux";
import DefaultButton from "../DefaultButton";
import GoogleIcon from "../Icons/GoogleIcon";
import selectUser from "./selectUser";
import useLoginLogic from "./useLoginLogic";

const LoginButton = () => {
  const { login, logOut } = useLoginLogic();
  const user = useSelector(selectUser);

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
