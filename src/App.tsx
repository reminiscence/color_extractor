import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { RecoilRoot } from 'recoil';
import MainContainer from './MainContainer';

function App() {
  const THEME_KEY = 'dark_mode';
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: THEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const handleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || colorScheme === 'light' ? 'dark' : 'light');
  };

  // color mode 조정 단축키 : ctrl(cmd) + j
  useHotkeys([['mod+J', () => handleColorScheme()]]);

  return (
    <RecoilRoot>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={handleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
          <MainContainer />
        </MantineProvider>
      </ColorSchemeProvider>
    </RecoilRoot>
  );
}

export default App;
