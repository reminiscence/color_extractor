import { Header as MantineHeader, useMantineColorScheme, Text, Title, ThemeIcon, Tooltip } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const matches = useMediaQuery('(max-width: 48rem)');

  return (
    <MantineHeader height={{ base: 50, md: 70 }} p={'md'}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <Title order={matches ? 3 : 1}>{'Color Extractor'}</Title>
        <div>
          <div onClick={() => toggleColorScheme()} style={{ cursor: 'pointer' }}>
            {colorScheme === 'dark' ? (
              <Tooltip label={'light mode'}>
                <ThemeIcon size="lg" variant="light">
                  <IconSun size={20} />
                </ThemeIcon>
              </Tooltip>
            ) : (
              <Tooltip label={'dark mode'}>
                <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                  <IconMoon size={20} />
                </ThemeIcon>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </MantineHeader>
  );
};

export default Header;
