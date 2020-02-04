/**
 * @typedef {{
 *   canRemoveItem: function():Promise<boolean>,
 * }}
 */
let ConnectorType

/**
 * @type {Connector}
 */
const connector = {
	canRemoveItem: () => new Promise((resolve, reject) => setTimeout(resolve, 5000, true))
}

export {
	ConnectorType,
	connector,
}