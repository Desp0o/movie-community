import { useSelector } from "react-redux";

interface RootState {
  feedRefetchStore: {
    value: boolean;
  };
}

export const useRefetchHook = () => {
  const useFeedRefetch = useSelector(
    (state: RootState) => state.feedRefetchStore.value
  );

  return { useFeedRefetch };
};