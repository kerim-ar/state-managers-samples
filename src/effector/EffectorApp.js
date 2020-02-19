import React, {useMemo, useState} from 'react'
import {connector} from '../common/connector.js'
import './EffectorApp.css'
import { createTodoStore } from './todo/todoStore.js'
import { addItem } from './list/listStore.js'
import { ListType } from '../common/list.js'
import { ItemView } from './ItemView.js'

/**
 * @param {ListType} list
 */
function ListView(list) {
	return list.map(item => <ItemView item={item}></ItemView>)
}

function EffectorApp() {
	const [, redraw] = useState()
	const store = useMemo(() => {
		const s = createTodoStore(connector)
		s.watch(redraw)
		return s
	}, [])
	const {title, list} = store.getState()

	return (
<div className="Effector">
	<h1>Effector</h1>
	<div>
		<div>{title}</div>
		<button onClick={() => addItem()}>Add Task</button>
	</div>
	{ListView(list)}
</div>
);
}

export default EffectorApp;
