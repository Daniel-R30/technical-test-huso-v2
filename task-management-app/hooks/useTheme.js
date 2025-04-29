import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/theme/themeSlice';
import { getThemeColors } from '../styles/theme';

export const useTheme = () => {
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const themeColors = useMemo(() => getThemeColors(theme), [theme]);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  return { theme, themeColors, toggleTheme: toggle };
};
