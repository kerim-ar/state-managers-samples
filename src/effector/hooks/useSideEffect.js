import {Effect, Subscription} from 'effector'
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
		/** @type {?Subscription} */
		let onCompletedUnwatchFn = null
		/** @type {?Subscription} */
		let onFailedUnwatchFn = null
		const onStartedUnwatchFn = sideEffect.watch(payload => {
			onStarted && onStarted(payload)

			onCompletedUnwatchFn = onCompleted
				? sideEffect.done.watch(({params}) => onCompleted(params))
				: null

			onFailedUnwatchFn =	onFailed
				? sideEffect.fail.watch(({params}) => onFailed(params))
				: null

		})
		return () => {
			onStartedUnwatchFn()
			onCompletedUnwatchFn && onCompletedUnwatchFn()
			onFailedUnwatchFn && onFailedUnwatchFn()
		}
	}, [onCompleted, onFailed, onStarted, sideEffect])
}

export {
	useSideEffect,
}
