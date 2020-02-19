import { createStore, combine, createEvent, Event } from "effector";
import {ConnectorType} from '../../common/connector.js'
import {createListStore} from '../list/listStore.js'

/** @type {Event<string>} */
const setTitle = createEvent()

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
	})
}

export {
	createTodoStore,
}
