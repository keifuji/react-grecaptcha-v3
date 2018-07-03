
/* サーバー側(AWS Lambda)のコード

request.post({url, headers,
	body: JSON.stringify({secret, response: トークン, ...})
})

// 1. tokenを取得して、
// 2. Google(grecaptcha)に問い合わせて
// 3. 結果のscoreを返す

const request = require('request')

const grecaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify'
const {
	grecaptchaSharedKey,
} = process.env

exports.handler = (event, context, callback) => {
	
	const { token } = event

	if(token) {
		request
			.post({
				url,
				body: JSON.stringify({
					secret: grecaptchaSharedKey,
					response: token,
					//remoteip: optional
				})
			})
			.on('response', (response) => {
				callback(null, response)
			})
			.on('error', err => {
				callback(err)
			})
	}

	callback('エラー: tokenがありません')

}


// PHPの場合 => /php以下を参照

*/
