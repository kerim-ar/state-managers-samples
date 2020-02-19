import {Effect,Event, createStore, createEffect, createEvent} from 'effector'
import { ListType } from '../../common/list.js'

let counter = 0

/**
 * @param {ListType} list
 */
function getCounterValue(list) {
	let res = 0
	for (const item of list)
	{
		const value = Number(item.id.substring(2))
		if (value > res)
		{
			res = value
		}
	}
	return ++res
}

/** @type {Effect<string, *, *>} */
const removeItem = createEffect()

/** @type {Event<void>} */
const addItem = createEvent()

/** @type {Event<string>} */
const removeItemCompleted = createEvent()

/** @type {Event<ListType>} */
const initList = createEvent()

/**
 * @param {{
 *   canRemoveItem: function(string):Promise<boolean>,
 * }} connector
 * @param {?ListType} initialState
 */
function createListStore(connector, initialState) {
	/** @type {ListType} */
	let initState = []

	if (initialState)
	{
		initState = initialState
		counter = getCounterValue(initialState)
	}

	const store = createStore(initState)
		.on(initList, (_, payload) => payload)
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
	initList,
}
