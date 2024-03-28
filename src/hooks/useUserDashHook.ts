import { useSelector } from "react-redux";

interface RootState {
  userDashStore: {
    isDashVisible: boolean;
  };
}

export const useUserDashHook = () => {
  const userDashState = useSelector(
    (state: RootState) => state.userDashStore.isDashVisible
  );

  return { userDashState };
};
