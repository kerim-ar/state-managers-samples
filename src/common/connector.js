const connector = {
	canRemoveItem: () => new Promise((resolve, reject) => setTimeout(resolve, 5000, true))
}

export {
	connector,
}