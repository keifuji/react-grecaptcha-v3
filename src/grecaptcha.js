//import { polyfill } from 'es6-promise'
//import 'babel-core/register'
import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import loadScript from 'load-script'

/**
 * makeScriptSourceUrl
 *
 * @param {string} siteKey
 * @returns {string}
 */
const makeScriptSourceUrl = siteKey => `https://www.google.com/recaptcha/api.js?render=${siteKey}`


let scriptIsLoaded = false


/**
 * isGrecaptchaLoaded
 *
 * Has grecapthca script loaded?
 *
 * @returns {bool}
 */
export const isGrecaptchaLoaded = () => scriptIsLoaded


/**
 * grecaptchaLoad
 *
 * Load grecaptcha script tag.
 *
 * スクリプトタグを追加してgrecaptchaを読み込む
 *
 * @param {string} siteKey
 */
export const grecaptchaLoad = siteKey => new Promise((resolve, reject) => {
	try {
		if(isGrecaptchaLoaded()) {
			resolve()
		} else {
			loadScript(makeScriptSourceUrl(siteKey), (err, res) => {
				if(err) {
					reject(err)
				}

				console.log('grecaptchaLoad: ', res)

				scriptIsLoaded = true
				resolve()
			})
		}
	} catch(e) {
		reject(e)
	}
})


/**
 * grecaptchaGetToken
 *
 * grecaptchaを実行
 *
 * @param {string} siteKey
 * @param {string} action Action name (accepts only alphabet or '/')
 * @returns {Promise}
 */
export const grecaptchaGetToken = (siteKey, action) => new Promise((resolve, reject) => {
	try {
		grecaptcha.ready(() => {
			grecaptcha
				.execute(siteKey, { action }) 
				.then(token => {
					console.log('For testing: ', 
						`curl -F secret=YOUR_SECRET_KEY -F response=${token} https://www.google.com/recaptcha/api/siteverify`
					)
					resolve(token)
				})
		})
	} catch(e) {
		reject(e)
	}
	
})


/**
 * grecapthcaLoadAndGetToken
 *
 * Loads grecaptcha script and gets token from Google.
 *
 * @param {string} siteKey
 * @param {string} action Action name (accepts only alphabet or '/')
 * @return {string} token
 */
export const grecapthcaLoadAndGetToken = async (siteKey, action) => {
	await grecaptchaLoad(siteKey)
	const token = await grecaptchaGetToken(siteKey, action)
	return token
}


/**
 * grecaptchaGetScore
 *
 * Send token to your server and get score.
 *
 * サーバーのエンドポイント(url)にtokenを送信して、結果(score)を取得する
 *
 * @param {string} url Endpoint URL which receives a token and returns its score.
 * @param {object} options Options for fetch
 * @param {string} token 
 * @returns score
 */
export const grecaptchaGetScore = async (url, options = {}, token) => {

	const res = await fetch(url, {
		mode: 'cors',
		method: 'POST',
		...options,
		body: JSON.stringify({ token }),
	})

	if(!res) {
		throw new Error(`[react-grecaptcha-v3] no response from ${url}`)
	}

	if(!res.ok) {
		throw new Error(`[react-grecaptcha-v3] failed to fetch: ${res.status} ${res.statusText}`)
	}

	const json = await res.json()
	const { success, score, 'error-codes': errors } = json

	if(!success) {
		console.warn('[react-grecaptcha-v3] error-codes:', errors)
		throw new Error(`[react-grecaptcha-v3] failed to get score: ${errors && errors[0]}`)
	}
	return score
}

