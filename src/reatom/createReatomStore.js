import { declareAction, declareAtom, createStore, combine } from "@reatom/core";

const setTitle = declareAction();

const addItem = declareAction();
const removeItemImpl = declareAction()

const setItemEnabled = declareAction()

let removeItem = null

const removeUnavailableItemStates = declareAction()

let counter = 0

function createReatomStore(connector) {
	removeItem = declareAction(async (itemId, store) => {
		store.dispatch(setItemEnabled({
			id: itemId,
			enabled: false,
		}))
		const canRemoveItem = await connector.canRemoveItem(itemId)
		if (canRemoveItem)
		{
			store.dispatch(removeItemImpl(itemId))
		}
		else
		{
			store.dispatch(setItemEnabled({
				id: itemId,
				enabled: true,
			}))
		}
	});

	const title = declareAtom('TODO List', on => [
		on(setTitle, (_, newTitle) => newTitle)
	]);
	const list = declareAtom([], on => [
		on(addItem, state => {
			const res = [...state, {
				id: `id${counter}`,
				name: `Task #${counter}`
			}]
			counter++
			return res
		}),
		on(removeItemImpl, (state, itemId) => state.filter(item => item.id !== itemId))
	]);

	const listState = declareAtom([], on => [
		on(removeUnavailableItemStates, (state, items) => state.filter(item => !items.include(item.id))),
		on(setItemEnabled, (state, {id, enabled}) => {
			return {
				...state,
				[id]: enabled,
			}
		})
	])

	const root = combine({
		title,
		list,
		listState,
	})
	return {
		root,
		store: createStore(root),
	}
}

export {
	createReatomStore,
	
	setTitle,
	
	addItem,
	removeItem,
}