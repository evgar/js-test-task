import { GET_ITEMS, EDIT_ITEM, DELETE_ITEM, ADD_ITEM } from '../constants'

export function getItems(users) {
  return { type: GET_ITEMS, users }
}

export function editItem(user, id) {
  return {type: EDIT_ITEM, user, id}
}

export function deleteItem(id) {
  return { type: DELETE_ITEM, id }
}

export function addNewItem(user) {
  return { type: ADD_ITEM, user }
}