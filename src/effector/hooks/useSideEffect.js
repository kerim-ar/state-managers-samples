import {Effect} from 'effector'
import { useEffect } from 'react'

/**
 * @param {{
 *   sideEffect: Effect<T, *, *>,
 *   onStarted: (undefined|function(T):void),
 *   onCompleted: (undefined|function(T):void),
 *   onFailed: (undefined|function(T):void),
 * }} param
 * @template T
 */
function useSideEffect({sideEffect, onStarted, onCompleted, onFailed}) {
	useEffect(() => {
		sideEffect.watch(payload => {
			onStarted && onStarted(payload)
			onCompleted && sideEffect.done.watch(({params}) => onCompleted(params))
			onFailed && sideEffect.fail.watch(({params}) => onFailed(params))

		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sideEffect])
}

export {
	useSideEffect,
}
