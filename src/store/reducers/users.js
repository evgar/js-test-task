import { GET_ITEMS, EDIT_ITEM, DELETE_ITEM, ADD_ITEM } from '../constants'
import axios from 'axios'

export const itemsActions = (state = [], action) => {
  switch (action.type) {
    case GET_ITEMS:
      return action.users

    case EDIT_ITEM:
      const items = [...state]
      const { id, user } = action
      items[id - 1] = user
      axios.put(`/users/${id}`, user)
      return items

    case DELETE_ITEM:
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
