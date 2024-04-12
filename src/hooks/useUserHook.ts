import { useSelector } from "react-redux";

interface RootState {
  userStore: {
    user: {
        name: string;
        avatar: string
        userID: string
    }
  };
}

export const useUserHook = () => {
  const user = useSelector((state: RootState) => state.userStore.user);

  return { user }
};
