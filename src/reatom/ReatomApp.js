//@ts-check

import React, {useMemo, useState} from 'react'
import {createReatomStore, addItem, removeItem} from './createReatomStore.js'
import {connector} from '../common/connector.js'
import './ReatomApp.css'
import { Store } from "@reatom/core";

/**
 * @param {Array<{
 *   id: string,
 *   name: string,
 * }>} list
 * @param {Object<string, boolean>} listState
 * @param {Store} store
 */
function prepareList(list, listState, store) {
	return list.map(item => 
<div>
	<div>id: {item.id}</div>
	<div>name: {item.name}</div>
	<button 
		onClick={() => store.dispatch(removeItem(item.id))} 
		disabled={(listState[item.id] === undefined || !!listState[item.id]) ? false : true}
	>Delete</button>
</div>
)
}

function ReatomApp() {
	const [, redraw] = useState()
	const {store, root} = useMemo(() => {
		const {store: s, root} = createReatomStore(connector)
		s.subscribe(root, redraw)
		return {
			store: s,
			root,
		}
	}, [])
	const {title, list, listState} = store.getState(root)
	
	return (
<div className="Reatom">
	<h1>Reatom</h1>
	<div>
		<div>{title}</div>
		<button onClick={() => store.dispatch(addItem())}>Add Task</button>
	</div>
	{prepareList(list, listState, store)}
</div>
);
}

export default ReatomApp;