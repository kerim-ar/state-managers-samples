import { declareAction, declareAtom, createStore, combine } from "@reatom/core";

const setTitle = declareAction();

const addItem = declareAction();
const removeItem = declareAction();

const action = declareAction()

let counter = 0

function createReatomStore() {
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
		on(removeItem, (state, itemId) => state.filter(item => item.id !== itemId))
	]);
	const root = combine({
		title,
		list
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
	action,
}