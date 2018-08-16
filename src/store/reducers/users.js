import { GET_ITEMS, EDIT_ITEM, DELETE_ITEM, ADD_ITEM } from '../constants'
import axios from 'axios'

export const itemsActions = (state = [], action) => {
  switch (action.type) {
    case GET_ITEMS:
      return action.users

    case EDIT_ITEM:
      const items = [...state]
      items[action.id] = action.user
      return items

    case DELETE_ITEM:
      console.log(action.id)
      const newItems = state.filter((item, i) => item.id !== action.id)
      axios.delete(`/users/${action.id}`)
      return newItems

    case ADD_ITEM:
      const updatedItems = [...state]
      axios.post('/users', action.user)
      return [...updatedItems, action.user]

    default:
      return state
  }
}

export default itemsActions
