import React, {useMemo, useState} from 'react'
import {connector} from '../../common/connector.js'
import './EffectorApp.css'
import { createTodoStore } from '../todo/todoStore.js'
import { addItem } from '../list/listStore.js'
import { ListView } from './ListView.js'

const KEY = 'effector-app'

function EffectorApp() {
	const [, redraw] = useState()
	const store = useMemo(() => {
		const initialStateStr = localStorage.getItem(KEY)
		const initialState = initialStateStr ? JSON.parse(initialStateStr) : null
		const s = createTodoStore(connector, initialState)
		s.watch(() => {
			localStorage.setItem(KEY, JSON.stringify(s.getState()))
			redraw({})
		})
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
