import { useState, useCallback, ChangeEvent } from 'react';

type onChangeType = (e: ChangeEvent<HTMLInputElement>) => void;

const useInput = (initValue = '') => {
  const [value, setValue] = useState(initValue);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, onChange] as [string, onChangeType];
};

export default useInput;
