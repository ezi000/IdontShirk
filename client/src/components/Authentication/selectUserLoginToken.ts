import { RootState } from "../../Redux/store";

const selectUserLoginToken = (state: RootState) =>
  state.authentication.userLoginToken;

export default selectUserLoginToken;
