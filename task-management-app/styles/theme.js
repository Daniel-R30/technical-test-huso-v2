export const colors = {
	white: '#FDFDFF',
    black: '#393D3F', //onix
    gray: '#C6C5B9', //silver
    mainColor: '#62929E', //blue (munsell)
    secondaryColor: '#546A7B', //payne's grey
    red: '#D94F4F', //red (pigment)
};

const lightTheme = {
  background: colors.white,
  text: colors.black,
  primary: colors.mainColor,
  secondary: colors.secondaryColor,
};

const darkTheme = {
  background: colors.black,
  text: colors.white,
  primary: colors.mainColor,
  secondary: colors.secondaryColor,
};

export const getThemeColors = (theme) => {
  return theme === 'dark' ? darkTheme : lightTheme;
};
