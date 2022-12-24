import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeFreezerMode, changeFridgeMode } from 'src/lib/slice/index';
import tw from 'tailwind-styled-components';

const ChangeModeBtn = () => {
  const { freezerMode } = useAppSelector((state) => state.freezerMode);
  const dispatch = useAppDispatch();

  return (
    <Miniature>
      <Title>현재위치</Title>
      <FreezerBtn
        $mode={freezerMode}
        onClick={() => dispatch(changeFreezerMode())}
      >
        <Name $mode={freezerMode}>냉동칸</Name>
        <Knob $mode={freezerMode} />
        {freezerMode && (
          <FontAwesomeIcon icon={faLocationDot} size='xs' color='#ff7d7d' />
        )}
      </FreezerBtn>
      <FridgeBtn
        $mode={!freezerMode}
        onClick={() => dispatch(changeFridgeMode())}
      >
        <Name $mode={!freezerMode}>냉장칸</Name>
        <FridgeKnob $mode={!freezerMode} />
        {!freezerMode && (
          <FontAwesomeIcon icon={faLocationDot} size='xs' color='#ff7d7d' />
        )}
      </FridgeBtn>
    </Miniature>
  );
};

const Miniature = tw.div`
  absolute
  top-0
  right-10
  flex
  flex-col
  items-center
  gap-0.5
  w-16
  h-36
`;
const Title = tw.h2`
  text-[12px]
  text-orange
`;
const FridgeBtn = tw.button<{ $mode: boolean }>`
  relative
  p-1
  w-full
  h-3/5
  flex
  flex-col
  gap-1
  justify-center
  items-center
  ${(p: { $mode: boolean }) => (p.$mode ? 'bg-white' : 'bg-gray-light')}
  ${(p: { $mode: boolean }) => (p.$mode ? 'opacity-100' : 'opacity-60')}
  rounded-md
  shadow-2xl
  border
  border-gray
`;
const FreezerBtn = tw.button<{ $mode: boolean }>`
  relative
  p-4
  w-full
  h-2/5
  flex
  flex-col
  gap-1
  justify-center
  items-center
  ${(p: { $mode: boolean }) => (p.$mode ? 'bg-white' : 'bg-gray-ligth')}
  ${(p: { $mode: boolean }) => (p.$mode ? 'opacity-100' : 'opacity-60')}
  rounded-md
  shadow-2xl
  border
  border-gray
`;
const Name = tw.span<{ $mode: boolean }>` 
  text-gray-dark
  font-bold
  text-sm
`;
const Knob = tw.div<{ $mode: boolean }>`
  absolute
  left-2
  bottom-1
  ml-0
  h-2.5
  w-1
  ${(p: { $mode: boolean }) => (p.$mode ? 'bg-gray-dark' : 'bg-gray')}
  rounded-lg
  `;
const FridgeKnob = tw(Knob)`
  top-1.5
  h-3
`;

export default ChangeModeBtn;
