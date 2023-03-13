import {
  Button,
  ColorInput,
  ColorPicker,
  Divider,
  Group,
  Select,
  rem,
  Grid,
  Tooltip,
  useMantineColorScheme,
  Title,
} from '@mantine/core';
import useColor from './hooks/useColor';
import useColorFormat from './hooks/useColorFormat';
import { useLocalStorage, useMediaQuery } from '@mantine/hooks';

const MainPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const { color, changeColor } = useColor({ initColor: '#ffffff' });
  const { format, changeFormat } = useColorFormat({ initFormat: 'hex' });
  const THEME_KEY = 'select_color';
  const [selectedColorList, setSelectedColorList] = useLocalStorage<string[]>({
    key: THEME_KEY,
    defaultValue: [],
    getInitialValueInEffect: true,
  });
  const matches = useMediaQuery('(max-width: 43rem)');

  const handleSelectColor = () => {
    setSelectedColorList(prevState => [...prevState, color]);
  };

  const handleClearColor = () => {
    setSelectedColorList([]);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: 32,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <div>
        <Group
          style={{
            alignItems: matches ? 'center' : 'flex-start',
            flexDirection: matches ? 'column' : 'row',
          }}>
          <div>
            <ColorPicker
              style={{ marginBottom: rem(16) }}
              size={'xl'}
              format={format}
              value={color}
              onChange={changeColor}
            />
            <ColorInput size={'lg'} defaultValue={color} format={format} value={color} onChange={changeColor} />
          </div>
          <Divider w={matches ? '100%' : undefined} orientation={matches ? 'horizontal' : 'vertical'} my={16} />
          <div style={{ width: matches ? '100%' : undefined }}>
            <Select
              defaultValue={format}
              label={'컬러 포맷'}
              data={[
                { value: 'hex', label: 'HEX' },
                { value: 'hexa', label: 'HEXA' },
                { value: 'rgb', label: 'RGB' },
                { value: 'rgba', label: 'RGBA' },
                { value: 'hsl', label: 'HSL' },
                { value: 'hsla', label: 'HSLA' },
              ]}
              value={format}
              onChange={changeFormat}
            />
            <Button onClick={handleSelectColor} style={{ marginTop: 8, marginRight: 8 }}>
              {'컬러 선택'}
            </Button>
          </div>
        </Group>
        <Divider my={16} />
        <div>
          <Title order={4} style={{ marginBottom: 16 }}>
            {'선택한 컬러'}
          </Title>
          <Grid columns={16} style={{ maxWidth: 675, minHeight: 50 }}>
            {selectedColorList.map((item, idx) => {
              return (
                <Tooltip key={`selected_color_${idx}`} label={item}>
                  <Grid.Col
                    span={1}
                    style={{
                      border: `1px solid ${colorScheme === 'dark' ? '#ffffff' : '#1d1d1f'}`,
                      backgroundColor: item,
                      height: 10,
                      margin: 4,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      if (item.includes('#')) {
                        if (item.length === 9) {
                          changeFormat('hexa');
                        } else {
                          changeFormat('hex');
                        }

                        changeColor(item);

                        return;
                      }

                      if (item.includes('rgb')) {
                        if (item.includes('rgba')) {
                          changeFormat('rgba');
                        } else {
                          changeFormat('rgb');
                        }

                        changeColor(item);

                        return;
                      }

                      if (item.includes('hsl')) {
                        if (item.includes('hsla')) {
                          changeFormat('hsla');
                        } else {
                          changeFormat('hsl');
                        }

                        changeColor(item);

                        return;
                      }
                    }}
                  />
                </Tooltip>
              );
            })}
          </Grid>
          <Button onClick={handleClearColor} variant={'outline'} style={{ marginTop: 32 }}>
            {'clear color'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
