export const deleteItem = (index) => {
      return {
        type: 'DELETE_ITEM',
        payload: index
      }
  };
export const changeItemStatus = (itemStatus, itemId) => {
  const status = itemStatus === 'complete' ? 'pending' : 'complete';
  const payload = {
    itemStatus: status,
    itemId: itemId
  }
  return {
    type: 'CHANGE_ITEM_STATUS',
    payload
  }
}
