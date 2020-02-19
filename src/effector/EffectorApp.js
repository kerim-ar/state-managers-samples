import React, {useMemo, useState} from 'react'
import {connector} from '../common/connector.js'
import './EffectorApp.css'
import { createTodoStore } from './todo/todoStore.js'
import { addItem } from './list/listStore.js'
import { ListView } from './ListView.js'

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
	<ListView list={list}></ListView>
</div>
);
}

export default EffectorApp;
