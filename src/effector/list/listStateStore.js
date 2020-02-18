import { Event, createStore, createEvent } from "effector";
import { ListStateType } from "../../common/listState";

/** @type {Event<{
 *   id: string,
 *   enabled: boolean,
 * }>} */
const setItemEnabled = createEvent()

function createListStateStore() {
	return createStore(/** @type {ListStateType} */({}))
		.on(setItemEnabled, (state, {id, enabled}) => ({
			...state,
			[id]: enabled,
		}))
}

export {
	setItemEnabled,
	createListStateStore,
}
