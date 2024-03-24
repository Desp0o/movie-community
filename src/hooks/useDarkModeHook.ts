import { useSelector } from "react-redux";

interface RootState {
  darkModeStore: {
    isDarkBg: boolean;
  };
}

export const useDarkModeHook = () => {
  const isDark = useSelector(
    (state: RootState) => state.darkModeStore.isDarkBg
  );

  return { isDark };
};
