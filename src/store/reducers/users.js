import { GET_ITEMS, EDIT_ITEM, DELETE_ITEM, ADD_ITEM } from '../constants'

export const itemsActions = (state = [], action) => {
  switch (action.type) {
    case GET_ITEMS:
      console.log(action.users, 'in REDUCER')
      return action.users

    case EDIT_ITEM:
      const items = [...state]
      items[action.id] = action.user
      return items

    case DELETE_ITEM:
      const newItems = state.filter((item, i) => i !== action.id)
      return newItems

    case ADD_ITEM:
      const updatedItems = [...state]
      return [...updatedItems, action.user]

    default:
      return state
  }
}

export default itemsActions
