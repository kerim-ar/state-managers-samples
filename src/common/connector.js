/**
 * @typedef {{
 *   canRemoveItem: function(string):Promise<boolean>,
 * }}
 */
let ConnectorType

function getRandomBoolean() {
	return Math.random() > 0.5
}

/**
 * @type {ConnectorType}
 */
const connector = {
	canRemoveItem: id => new Promise((resolve, reject) => setTimeout(resolve, 3000, getRandomBoolean()))
}

export {
	ConnectorType,
	connector,
}
