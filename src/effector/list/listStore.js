import {Effect,Event, createStore, createEffect, createEvent} from 'effector'
import { ListType } from '../../common/list.js'

let counter = 0

/** @type {Effect<string, *, *>} */
const removeItem = createEffect()

/** @type {Event<void>} */
const addItem = createEvent()

/** @type {Event<string>} */
const removeItemCompleted = createEvent()

/**
 * @param {{
 *   canRemoveItem: function(string):Promise<boolean>,
 * }} connector
 */
function createListStore(connector) {
	const store = createStore(/** @type {ListType} */([]))
		.on(addItem, state => {
			const res = [...state, {
				id: `id${counter}`,
				name: `Task #${counter}`
			}]
			counter++
			return res
		})
		.on(removeItemCompleted, (state, itemId) =>
			state.filter(item => item.id !== itemId)
		)

	removeItem.use(async itemId => {
		console.log('removeItem effect')
		const canRemoveItem = await connector.canRemoveItem(itemId)
		if (canRemoveItem)
		{
			removeItemCompleted(itemId)
		}
	})

	return store
}

export {
	createListStore,

	addItem,
	removeItemCompleted,

	removeItem,
}
