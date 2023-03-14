import { useState } from 'react';
import {
  Button,
  ColorInput,
  ColorPicker,
  Divider,
  Group,
  Input,
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
import { CLEAR_COLOR, COLOR_FORMAT, NICK_NAME_DESC, NICK_NAME_LABEL, NICK_PLACEHOLDER } from '../../common/Constants';
import dayjs from 'dayjs';

const MainPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const { color, changeColor } = useColor({ initColor: '#ffffff' });
  const { format, changeFormat } = useColorFormat({ initFormat: COLOR_FORMAT.HEX });
  const COLOR_KEY = 'select_color_obj';
  const [selectedColorObj, setSelectedColorObj] = useLocalStorage<{
    [index: string]: { title: string; color: string }[];
  }>({
    key: COLOR_KEY,
    defaultValue: {},
    getInitialValueInEffect: true,
  });
  const [nickInput, setNickInput] = useState<string>('');
  const matches = useMediaQuery('(max-width: 56rem)');

  const handleSelectColor = () => {
    const title = nickInput || '';
    const currentDateKey = dayjs(new Date()).format('YYYY-MM-DD');

    setSelectedColorObj(prevState => ({
      ...prevState,
      [currentDateKey]:
        prevState[currentDateKey] != null ? [...prevState[currentDateKey], { title, color }] : [{ title, color }],
    }));
    setNickInput('');
  };

  const handleClearColor = (date: string) => {
    const fileterdColorObjKeyList = Object.keys(selectedColorObj).filter(key => key !== date);
    const filteredColorObj: { [index: string]: { title: string; color: string }[] } = {};

    fileterdColorObjKeyList.forEach(key => {
      filteredColorObj[key] = selectedColorObj[key];
    });

    setSelectedColorObj(filteredColorObj);
  };

  const selectedColorObjKeyList = Object.keys(selectedColorObj).sort((a, b) => (a > b ? 0 : 1));

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
                { value: COLOR_FORMAT.HEX, label: COLOR_FORMAT.HEX.toUpperCase() },
                { value: COLOR_FORMAT.HEXA, label: COLOR_FORMAT.HEXA.toUpperCase() },
                { value: COLOR_FORMAT.RGB, label: COLOR_FORMAT.RGB.toUpperCase() },
                { value: COLOR_FORMAT.RGBA, label: COLOR_FORMAT.RGBA.toUpperCase() },
                { value: COLOR_FORMAT.HSL, label: COLOR_FORMAT.HSL.toUpperCase() },
                { value: COLOR_FORMAT.HSLA, label: COLOR_FORMAT.HSLA.toUpperCase() },
              ]}
              value={format}
              onChange={changeFormat}
            />
            <Input.Wrapper
              id="input-nick"
              label={NICK_NAME_LABEL}
              description={NICK_NAME_DESC}
              style={{ marginTop: 16 }}>
              <Input
                id="input-nick"
                placeholder={NICK_PLACEHOLDER}
                value={nickInput}
                onChange={e => setNickInput(e.target.value)}
              />
            </Input.Wrapper>
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
          {selectedColorObjKeyList.map((item, idx) => {
            const date = selectedColorObjKeyList[idx];
            const colorObjList = selectedColorObj[date];

            return (
              <div key={`date_selected_color_${idx}`}>
                <Group>
                  <Title order={5}>{date}</Title>
                  {colorObjList.length > 0 ? (
                    <Button onClick={() => handleClearColor(date)} variant={'outline'}>
                      {CLEAR_COLOR}
                    </Button>
                  ) : null}
                </Group>
                <Divider my={8} />
                <Grid columns={16} style={{ maxWidth: 675, minHeight: 50, margin: 0 }}>
                  {colorObjList.map((colorItem, idx) => {
                    const { title, color } = colorItem;

                    return (
                      <Tooltip
                        key={`selected_color_${idx}`}
                        label={title ? `${title} / ${color}` : color}
                        transitionProps={{ transition: 'skew-up', duration: 300 }}>
                        <Grid.Col
                          span={1}
                          style={{
                            border: `1px solid ${colorScheme === 'dark' ? '#ffffff' : '#1d1d1f'}`,
                            backgroundColor: color,
                            height: 10,
                            margin: 4,
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            if (title !== '') {
                              setNickInput(title);
                            } else if (nickInput !== '') {
                              setNickInput('');
                            }

                            if (color.includes('#')) {
                              if (color.length === 9) {
                                changeFormat(COLOR_FORMAT.HEXA);
                              } else {
                                changeFormat(COLOR_FORMAT.HEX);
                              }

                              changeColor(color);

                              return;
                            }

                            if (color.includes(COLOR_FORMAT.RGB)) {
                              if (color.includes(COLOR_FORMAT.RGBA)) {
                                changeFormat(COLOR_FORMAT.RGBA);
                              } else {
                                changeFormat(COLOR_FORMAT.RGB);
                              }

                              changeColor(color);

                              return;
                            }

                            if (color.includes(COLOR_FORMAT.HSL)) {
                              if (color.includes(COLOR_FORMAT.HSLA)) {
                                changeFormat(COLOR_FORMAT.HSLA);
                              } else {
                                changeFormat(COLOR_FORMAT.HSL);
                              }

                              changeColor(color);

                              return;
                            }
                          }}
                        />
                      </Tooltip>
                    );
                  })}
                </Grid>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
