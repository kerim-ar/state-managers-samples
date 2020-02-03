import {createStore, createEvent, combine} from 'effector'

const setTitle = createEvent()

const addItem = createEvent()
const removeItem = createEvent()

let counter = 0

function createEffectorStore() {
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
		.on(removeItem, (state, itemId) => state.filter(item => item.id !== itemId))

	return combine({
		title,
		list,
	})
}

export {
	createEffectorStore,

	setTitle,
	
	addItem,
	removeItem,
}