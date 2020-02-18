import { createEffect, Effect, createStore } from "effector";
import { ListStateType } from "../../common/listState";

/** @type {Effect<{
 *   id: string,
 *   enabled: boolean,
 * }>} */
const setItemEnabled = createEffect()

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