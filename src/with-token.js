import { lifecycle } from 'recompose'
import { grecaptchaLoad, grecaptchaGetToken } from './grecaptcha'


const asyncSetToken = async (siteKey, action) => {
	await grecaptchaLoad(siteKey)
	const token = await grecaptchaGetToken(siteKey, action)
	return token
}


const withGrecaptchaToken = lifecycle({
	componentDidMount() {
		const { siteKey, action } = this.props
		if(!siteKey) {
			throw new Error('[grecapthca-react-v3] No siteKey supplied.')
		}
		if(!action) {
			throw new Error('[grecapthca-react-v3] No action supplied.')
		}
		asyncSetToken(siteKey, action)
			.then(token => {
				this.setState({
					token,
					error: null,
				})
			})
			.catch(error => {
				this.setState({
					token: null,
					error,
				})
			})
	}
})

export default withGrecaptchaToken
