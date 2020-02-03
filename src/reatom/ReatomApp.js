import React, {useMemo, useState} from 'react'
import {createReatomStore, addItem, action} from './createReatomStore.js'
import './ReatomApp.css'

function prepareList(store, root) {
	const {list} = store.getState(root)
	return list.map(item => 
<div>
	<div>id: {item.id}</div>
	<div>name: {item.name}</div>
	<button onClick={() => store.dispatch(action(item.id))}>Delete</button>
</div>
)
}

function ReatomApp() {
	const [, redraw] = useState()
	const {store, root} = useMemo(() => {
		const {store: s, root} = createReatomStore()
		s.subscribe(root, redraw)
		return {
			store: s,
			root,
		}
	}, [])
	const state = store.getState(root)
	
	return (
<div className="Reatom">
	<h1>Reatom</h1>
	<div>
		<div>{state.title}</div>
		<button onClick={() => store.dispatch(addItem())}>Add Task</button>
	</div>
	{prepareList(store, root)}
</div>
);
}

export default ReatomApp;