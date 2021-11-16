import { useState, useCallback, ChangeEvent } from 'react';

type UseInputFn = {
  (initialValue: string): {
    key: number;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
};

const useInput: UseInputFn = (initValue = '') => {
  const [value, setValue] = useState(initValue);
  const [key, setKey] = useState<number>(0);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
    setKey(Number(e.target.dataset.key));
  }, []);

  return { key: +key, value, onChange };
};

export default useInput;
