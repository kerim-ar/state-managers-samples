import {createStore, createEvent, createEffect, combine} from 'effector'
import {ConnectorType} from '../common/connector.js'

// events
const setTitle = createEvent()
const addItem = createEvent()
const removeItemImpl = createEvent()
const setItemEnabled = createEvent()
const removeUnavailableItemStates = createEvent()

// side effects
const removeItem = createEffect()

let counter = 0

/**
 * @param {ConnectorType} connector 
 */
function createEffectorStore(connector) {
	const title = createStore('TODO List')
		.on(setTitle, (_, newTitle) => newTitle)

	/**
	 * @type {Array<{
	 *   id: string,
	 *   name: string,
	 * }>}
	 */
	const listData = []
	const list = createStore(listData)
		.on(addItem, state => {
			const res = [...state, {
				id: `id${counter}`,
				name: `Task #${counter}`
			}]
			counter++
			return res
		})
		.on(removeItemImpl, (state, itemId) => state.filter(item => item.id !== itemId))

	/**
	 * @type {Object<string, boolean>}
	 */
	const listStateData = {}
	const listState = createStore(listStateData)
		.on(removeUnavailableItemStates, (state, items) => state.filter(item => !items.include(item.id)))
		.on(setItemEnabled, (state, {id, enabled}) => {
			return {
				...state,
				[id]: enabled,
			}
		})

	removeItem.use(async itemId => {
		setItemEnabled({
			id: itemId,
			enabled: false,
		})
		const canRemoveItem = await connector.canRemoveItem(itemId)
		if (canRemoveItem)
		{
			removeItemImpl(itemId)
		}
		else
		{
			setItemEnabled({
				id: itemId,
				enabled: true,
			})
		}
	})
	

	return combine({
		title,
		list,
		listState,
	})
}

export {
	createEffectorStore,

	setTitle,
	
	addItem,
	removeItem,
}