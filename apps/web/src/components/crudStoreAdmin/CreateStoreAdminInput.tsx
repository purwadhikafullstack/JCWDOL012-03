import React from 'react';
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

interface Props {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  placeholder: string;
  options?: { id: string; name: string }[];
}

const StoreAdminFormInput: React.FC<Props> = ({
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
  options,
}) => {
  return (
    <FormControl my={4} id={name} isRequired>
      <FormLabel>{label}</FormLabel>
      {options ? (
        <Select
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        >
          {options.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          type={name === 'password' ? 'password' : 'text'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </FormControl>
  );
};

export default StoreAdminFormInput;
