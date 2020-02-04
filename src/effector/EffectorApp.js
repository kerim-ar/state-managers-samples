import React, {useMemo, useState} from 'react'
import {createEffectorStore, addItem, removeItem} from './createEffectorStore.js'
import {connector} from '../common/connector.js'
import './EffectorApp.css'

/**
 * @param {Array<{
 *   id: string,
 *   name: string,
 * }>} list
 * @param {Array<{
 *   id: string,
 *   enabled: string,
 * }>} listState
 */
function prepareList(list, listState) {
	return list.map(item => 
<div>
	<div>id: {item.id}</div>
	<div>name: {item.name}</div>
	<button 
		onClick={() => removeItem(item.id)} 
		disabled={(listState[item.id] === undefined || !!listState[item.id]) ? null : 'disabled'}
	>Delete</button>
</div>
)
}

function EffectorApp() {
	const [, redraw] = useState()
	const store = useMemo(() => {
		const s = createEffectorStore(connector)
		s.watch(redraw)
		return s
	}, [])
	const {title, list, listState} = store.getState()

	return (
<div className="Effector">
	<h1>Effector</h1>
	<div>
		<div>{title}</div>
		<button onClick={addItem}>Add Task</button>
	</div>
	{prepareList(list, listState)}
</div>
);
}

export default EffectorApp;