import { useState } from 'react';
import { colorFormatType } from '../../../types';

interface useColorFormatProps {
  initFormat?: colorFormatType;
}

const useColorFormat = ({ initFormat = 'hex' }: useColorFormatProps) => {
  const [format, setFormat] = useState<colorFormatType>(initFormat);

  const changeFormat = (value: colorFormatType) => {
    setFormat(value);
  };

  return { format, changeFormat };
};

export default useColorFormat;
