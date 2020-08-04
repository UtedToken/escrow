export async function loadScript(url) {
	return await new Promise((resolve) => {
		if (
			!Array.from(document.getElementsByClassName('script')).find(
				(item) => item.src === url,
			)
		) {
			const script = document.createElement('script')
			script.src = url
			script.async = false
			script.onload = resolve
			document.head.append(script)
		} else {
			resolve()
		}
	})
}

export function getScript(key, apiKey, CURRENCY) {
	key = key.toLowerCase()
	switch (key) {
		case 'paypal': {
			return (
				'https://www.paypal.com/sdk/js?client-id=' +
				apiKey +
				'&vault=true&currency=' +
				CURRENCY
			)
		}
		case 'stripe': {
			return 'https://js.stripe.com/v3/'
		}
	}
}
