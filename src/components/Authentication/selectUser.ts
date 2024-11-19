import { RootState } from "../../Redux/store";

const selectUser = (state: RootState) => state.authentication.user;

export default selectUser;
