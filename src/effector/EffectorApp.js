import React, {useMemo, useState} from 'react'
import {createEffectorStore, addItem, removeItem} from './createEffectorStore.js'
import './EffectorApp.css'

/**
 * @param {Array<{
 *   id: string,
 *   namr: string,
 * }>} list 
 */
function prepareList(list) {
	return list.map(item => 
<div>
	<div>id: {item.id}</div>
	<div>name: {item.name}</div>
	<button onClick={() => removeItem(item.id)}>Delete</button>
</div>
)
}

function EffectorApp() {
	const [, redraw] = useState()
	const store = useMemo(() => {
		const s = createEffectorStore()
		s.watch(redraw)
		return s
	}, [])
	const state = store.getState()

	return (
<div className="Effector">
	<h1>Effector</h1>
	<div>
		<div>{state.title}</div>
		<button onClick={addItem}>Add Task</button>
	</div>
	{prepareList(state.list)}
</div>
);
}

export default EffectorApp;