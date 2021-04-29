<template>
  <div class="Rooms col-6 py-2" dropzone="zone" draggable="true" @dragover.prevent @drop.prevent="moveItem">
    <div class="row justify-content-center">
      <div class="col-3 text-light bg-info rounded-pill p-1">
        {{ roomData.name }}
      </div>
    </div>
    <transition-group name="item" tag="div" class="row space-evenly mt-3">
      <Items
        v-for="item in state.items"
        :key="item.id"
        :room-id="roomData.id"
        :item-data="item"
        draggable="true"
      />
    </transition-group>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import Items from '../components/Item'
import { AppState } from '../AppState'
import { itemService } from '../services/ItemService'
export default {
  name: 'Rooms',
  props: ['roomData'],
  components: {
    Items
  },
  setup(props) {
    const state = reactive({
      items: computed(() => AppState.rooms[props.roomData.id].items),
      itemToMove: computed(() => AppState.tempItem)
    })
    return {
      state,
      moveItem() {
        console.log('AppState', AppState.tempItem, props.roomData.id)
        itemService.moveItem(state.itemToMove.oldRoomId, props.roomData.id)
      }
    }
  }
}
</script>

<style scoped>
.Rooms {
  height: 30vh;
  background-color: white;
  border: 1px;
  border-style: solid;
  border-color: black;
}

.item-enter-active,
.item-leave-active {
  transition: all 0.5s ease;
}

.item-enter-from,
.item-leave-to {
  transform: translate(0px, -3vh);
  opacity: 0;
}
</style>
