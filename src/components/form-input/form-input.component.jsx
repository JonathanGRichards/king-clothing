import {
  Group,
  FormInput as StyledFormInput,
  FormInputLabel,
} from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <StyledFormInput {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={otherProps.value.length}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
