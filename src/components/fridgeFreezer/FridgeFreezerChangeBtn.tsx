import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useAppDispatch } from 'src/lib/hooks';
import { showFreezer } from 'src/lib/slice/showFreezerSlice';
import tw from 'tailwind-styled-components';

interface IFridgeFreezerChangeBtnProps {
  btnName: string;
}

const FridgeFreezerChangeBtn = ({ btnName }: IFridgeFreezerChangeBtnProps) => {
  const dispatch = useAppDispatch();

  return (
    <FridgeBtn onClick={() => dispatch(showFreezer())}>
      <span>{btnName}</span>
      <FontAwesomeIcon
        icon={
          btnName === '냉장칸 보기'
            ? icon({
                name: 'arrow-down',
              })
            : icon({
                name: 'arrow-up',
              })
        }
      />
    </FridgeBtn>
  );
};

const FridgeBtn = tw.button`
  flex
  justify-center
  items-center
  gap-2
  h-12
  bg-white-dark
  w-[calc(2*theme(spacing.60))]
  rounded-xl
  shadow-inner
  text-gray
  font-bold
  text-sm
`;

export default FridgeFreezerChangeBtn;
