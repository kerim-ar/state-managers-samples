import React, { useState } from 'react'
import { removeItem } from './list/listStore'
import { useSideEffect } from './hooks/useSideEffect'
import { ListItemType } from '../common/list'

/**
 * @param {{
 *   item: ListItemType,
 * }} props
 */
function ItemView({item}) {
	const [disabled, setDisabled] = useState(false)
	useSideEffect({
		sideEffect: removeItem,
		onStarted: removedItemId => setDisabled(removedItemId === item.id),
		onCompleted: () => setDisabled(false),
		onFailed: undefined,
	})
	return (
<div>
	<div>id: {item.id}</div>
	<div>name: {item.name}</div>
	<button
		onClick={() => removeItem(item.id)}
		disabled={disabled}
	>Delete</button>
</div>)
}

export {
	ItemView,
}
