import React from 'react'
import { ListType } from '../common/list'
import { ItemView } from './ItemView'

/**
 * @param {{
 *   list: ListType,
 * }} props
 */
function ListView({list}) {
	const items = list.map(item => <ItemView key={item.id} item={item}></ItemView>)
	return <div>{items}</div>
}

export {
	ListView,
}
