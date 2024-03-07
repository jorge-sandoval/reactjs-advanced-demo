import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InnerCustomInput: ForwardRefRenderFunction<
  HTMLInputElement,
  CustomInputProps
> = (props, ref) => {
  return <input type="text" {...props} ref={ref} />;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  InnerCustomInput
);

export default CustomInput;
