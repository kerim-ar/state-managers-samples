import { createStore, combine } from "effector";
import {setTitle} from './todoEvents.js'
import {ConnectorType} from '../../common/connector.js'
import {createListStore} from '../list/listStore.js'
import { createListStateStore } from "../list/listStateStore.js";

/**
 * @param {string} title
 * @param {string} newTitle 
 */
function setTitleHandler(title, newTitle) {
	return newTitle
}

/**
 * @param {ConnectorType} connector 
 */
function createTodoStore(connector) {
	const title = createStore('TODO List')
		.on(setTitle, setTitleHandler)

	return combine({
		title,
		list: createListStore(connector),
		listState: createListStateStore(),
	})
}

export {
	createTodoStore,
}