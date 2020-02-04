import {createStore, createEvent, createEffect, combine} from 'effector'

const setTitle = createEvent()

const addItem = createEvent()
const removeItemImpl = createEvent()

const removeItem = createEffect()
const setItemEnabled = createEvent()

const removeUnavailableItemStates = createEvent()

let counter = 0

function createEffectorStore(connector) {
	const title = createStore('TODO List')
		.on(setTitle, (_, newTitle) => newTitle)

	const list = createStore([])
		.on(addItem, state => {
			const res = [...state, {
				id: `id${counter}`,
				name: `Task #${counter}`
			}]
			counter++
			return res
		})
		.on(removeItemImpl, (state, itemId) => state.filter(item => item.id !== itemId))

	const listState = createStore([])
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