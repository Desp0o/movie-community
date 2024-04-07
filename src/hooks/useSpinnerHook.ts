import { useSelector } from "react-redux";

interface RootState {
  spinnerSote: {
    value: boolean;
  };
}

export const useSpinnerHook = () => {
  const isSpinner = useSelector((state: RootState) => state.spinnerSote.value);

  return { isSpinner };
};
