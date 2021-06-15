import { onBeforeMount, onBeforeUnmount } from "vue"
import { GET_MESSENGER } from "../types"
import { injectStrict } from "./injectStrict"

export const subscribe = (event: string, callback: any) => {
  const messenger = injectStrict(GET_MESSENGER)

  onBeforeMount(() => 
    messenger.addEventListener(event, callback)
  )

  onBeforeUnmount(() => 
    messenger.removeEventListener(event, callback)
  )
}
