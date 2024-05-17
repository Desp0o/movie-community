import { useSelector } from "react-redux";

interface RootState {
  refetchStore: {
    isRefetched: boolean;
  };
}

export const useRefetchHook = () => {
  const requestRefetch = useSelector(
    (state: RootState) => state.refetchStore.isRefetched
  );

  return { requestRefetch };
};
