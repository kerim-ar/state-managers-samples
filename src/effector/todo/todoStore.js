import { createStore, combine, createEvent, Event, restore } from "effector";
import {ConnectorType} from '../../common/connector.js'
import {createListStore, initList} from '../list/listStore.js'
import { TodoType } from "../../common/todo.js";

/** @type {Event<string>} */
const setTitle = createEvent()

/**
 * @param {ConnectorType} connector
 * @param {?TodoType} initialState
 */
function createTodoStore(connector, initialState) {
	const initialTitle = initialState ? initialState.title : 'Default title'
	const title = createStore(initialTitle)
		.on(setTitle, (_, payload) => payload)

	const listInitialState = initialState ? initialState.list : null
	const store = combine({
		title,
		list: createListStore(connector, listInitialState),
	})

	return store
}

export {
	createTodoStore,
}
