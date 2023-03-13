import { useState } from 'react';

interface useColorProps {
  initColor?: string;
}

const useColor = ({ initColor = '#ffffff' }: useColorProps) => {
  const [color, setColor] = useState<string>(initColor);

  const changeColor = (value: string) => {
    setColor(value);
  };

  return { color, changeColor };
};

export default useColor;
