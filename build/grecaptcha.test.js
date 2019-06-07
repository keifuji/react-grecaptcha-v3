'use strict';

var _chai = require('chai');

var _grecaptcha = require('./grecaptcha');

var siteKey = '6LfoRWIUAAAAAMU7uF2lnt_RbbwW-KIltAjCnkwp';
var secretKey = '6LfoRWIUAAAAAGkx80NZaAoFl2g1tZrg5m7ezqO8';
var action = 'test';

describe('grecaptcha', function () {

	it('load grecaptcha script', function (done) {
		_chai.assert.isFalse((0, _grecaptcha.isGrecaptchaLoaded)());
		(0, _grecaptcha.grecaptchaLoad)(siteKey).then(function () {
			_chai.assert.isTrue((0, _grecaptcha.isGrecaptchaLoaded)());
			done();
		}).catch(function (e) {
			throw e;
			//done()
		});
	});
});

// ブラウザで実行
mocha.run();
