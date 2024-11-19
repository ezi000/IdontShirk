import { useSelector } from "react-redux";
import DefaultButton from "../DefaultButton";
import GoogleIcon from "../Icons/GoogleIcon";
import selectUser from "./selectUser";
import useLoginLogic from "./useLoginLogic";

const Login = () => {
  const { login, logOut } = useLoginLogic();
  const user = useSelector(selectUser);

  console.log("user", user);

  return (
    <div>
      {user.id ? (
        <div>
          <img src={user.picture} alt="user image" />
          <p>Name: {user.name}</p>
          <DefaultButton onClick={logOut}>Log out</DefaultButton>
        </div>
      ) : (
        <DefaultButton startIcon={<GoogleIcon />} onClick={() => login()}>
          Sign in with Google
        </DefaultButton>
      )}
    </div>
  );
};

export default Login;
