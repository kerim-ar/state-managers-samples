import { declareAction, declareAtom, createStore, combine } from "@reatom/core";
import {ConnectorType} from '../common/connector.js'

// actions
const setTitle = declareAction();
const addItem = declareAction();
const removeItemImpl = declareAction()
const setItemEnabled = declareAction()
const removeUnavailableItemStates = declareAction()

// side effects
let removeItem = null

let counter = 0

/**
 * @param {ConnectorType} connector 
 */
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

	/**
	 * @type {Array<{
	 *   id: string,
	 *   name: string,
	 * }>}
	 */
	const listData = []
	const list = declareAtom(listData, on => [
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

	/**
	 * @type {Object<string, boolean>}
	 */
	const listStateData = {}
	const listState = declareAtom(listStateData, on => [
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