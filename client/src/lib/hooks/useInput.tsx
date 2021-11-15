import { useState, useCallback, ChangeEvent } from 'react';

type onChangeType = (e: ChangeEvent<HTMLInputElement>) => void;

const useInput = (initValue = '') => {
  const [value, setValue] = useState(initValue);
  const [key, setKey] = useState<number>(0);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
    setKey(Number(e.target.dataset.key));
  }, []);

  return [Number(key), value, onChange] as [number, string, onChangeType];
};

export default useInput;
