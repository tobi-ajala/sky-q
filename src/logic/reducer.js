import { ADD_ITEM, DELETE_ITEM, CHANGE_ITEM_STATUS } from './constants';

let nextId = 4;

export const initialState = {
  items: [
    { id: 1, content: 'Call mum', status: 'pending' },
    { id: 2, content: 'Buy cat food', status: 'complete' },
    { id: 3, content: 'Water the plants', status: 'complete' },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newItem = {
        id: nextId++,
        content: action.content,
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };
    case DELETE_ITEM:
      const newData = Object.assign([], state.items)
      const currentItem = state.items.filter((item) => item.id === action.payload);
      const completedItem = state.items.filter((item) => item.status === 'pending');
      console.log(completedItem, 'kdjanzxjkbdnfm')
      newData.splice(currentItem, 1);
      return {
        ...state,
        items: newData
      };
    case CHANGE_ITEM_STATUS:
      // let actualItem = state.items.filter((item) => item.id === action.payload.itemId)
      // actualItem['status'] = action.payload.status;
      const { itemId, itemStatus } = action.payload;
      const items = state.items.map((item) => item.id === itemId ? {
        ...item, status: itemStatus
      } : item);
      return {
        ...state,
        items
      };
    default:
      return state;
  }
};

export default reducer;
