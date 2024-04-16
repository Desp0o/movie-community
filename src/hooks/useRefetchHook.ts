import { useSelector } from "react-redux";

interface RootState {
  refetchStore: {
    value: boolean;
  };
}

export const useRefetchHook = () => {
  const requestRefetch = useSelector(
    (state: RootState) => state.refetchStore.value
  );

  return { requestRefetch };
};
