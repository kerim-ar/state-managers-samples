import React, {useMemo, useState} from 'react'
import {connector} from '../common/connector.js'
import './EffectorApp.css'
import { createTodoStore } from './todo/todoStore.js'
import { removeItem, addItem } from './list/listStore.js'
import { ListType } from '../common/list.js'

/**
 * @param {ListType} list
 */
function ListView(list, listState) {
	return list.map(item => 
<div>
	<div>id: {item.id}</div>
	<div>name: {item.name}</div>
	<button 
		onClick={() => removeItem(item.id)} 
		disabled={(listState[item.id] === undefined || !!listState[item.id]) ? false : true}
	>Delete</button>
</div>
)
}

function EffectorApp() {
	const [, redraw] = useState()
	const store = useMemo(() => {
		const s = createTodoStore(connector)
		s.watch(redraw)
		return s
	}, [])
	const {title, list, listState} = store.getState()

	return (
<div className="Effector">
	<h1>Effector</h1>
	<div>
		<div>{title}</div>
		<button onClick={() => addItem()}>Add Task</button>
	</div>
	{ListView(list, listState)}
</div>
);
}

export default EffectorApp;