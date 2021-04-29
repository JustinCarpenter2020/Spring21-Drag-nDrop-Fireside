import { AppState } from '../AppState'

class ItemService {
  setItemToMove(item, oldRoomId) {
    AppState.tempItem = item
    AppState.tempItem.oldRoomId = oldRoomId
    console.log(AppState.tempItem)
  }

  moveItem(oldRoomId, newRoomId) {
    // Here is where you put any api request to edit
    const itemMoving = AppState.tempItem
    const oldIndex = AppState.rooms.findIndex(r => r.id === oldRoomId)
    const newRoom = AppState.rooms.find(r => r.id === newRoomId)

    AppState.rooms[oldIndex].items = AppState.rooms[oldIndex].items.filter(i => i.id !== itemMoving.id)
    newRoom.items.push(itemMoving)
  }
}

export const itemService = new ItemService()
