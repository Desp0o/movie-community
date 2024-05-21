import { useSelector } from "react-redux";

interface RootState {
  userStore: {
    user: {
        score: string | number;
        name: string;
        avatar: string;
        userID: string;
        bells: number;
    }
  };
}

export const useUserHook = () => {
  const user = useSelector((state: RootState) => state.userStore.user);

  return { user }
};
