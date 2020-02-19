/**
 * @typedef {{
 *   canRemoveItem: function(string):Promise<boolean>,
 * }}
 */
let ConnectorType

/**
 * @type {ConnectorType}
 */
const connector = {
	canRemoveItem: id => new Promise((resolve, reject) => setTimeout(resolve, 3000, true))
}

export {
	ConnectorType,
	connector,
}
