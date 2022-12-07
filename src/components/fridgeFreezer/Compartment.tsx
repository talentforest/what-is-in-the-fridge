import tw from 'tailwind-styled-components';

interface ICompartmentProps {
  size?: string;
  children?: any;
}

const Compartment = ({ size, children }: ICompartmentProps) => {
  return <Space $size={size}>{children}</Space>;
};

const Space = tw.div<{ $size: string }>`
  w-full
  ${(p: { $size: string }) =>
    p.$size === 'large' ? 'h-32' : p.$size === 'medium' ? 'h-28' : 'h-24'}
  bg-white
  rounded-lg
  shadow-inner
  flex
  flex-col
  justify-end
`;

export default Compartment;
