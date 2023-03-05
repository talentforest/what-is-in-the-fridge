import { spaceName } from 'src/lib/slice/newFoodSlice';

export const getSpaceName = (space: spaceName, freezerMode: boolean) => {
  const fridgeDoor =
    space === 'space_5' || space === 'space_6' || space === 'space_7';

  const freezerDoor = space === 'space_3' || space === 'space_4';

  if (freezerMode) return freezerDoor ? 'door' : 'inner';
  return fridgeDoor ? 'door' : 'inner';
};
