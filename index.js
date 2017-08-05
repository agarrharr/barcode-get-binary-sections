'use strict';

const isEvenParity = string => string.split('').reduce((a, c) => Boolean(Number(c)) ? !a: a, true);
const reverseString = s => s.split('').reverse().join('');

const binary = string => {
	const isBackwards = isEvenParity(string.slice(3, 10));
	const s = isBackwards ? reverseString(string) : string;
	const numbers = s.slice(3, 45).concat(s.slice(50, 92)).match(/.{7}/g);

	return {
		leftHandGuard: s.slice(0, 3),
		leftNumbers: numbers ? numbers.slice(0, 6) : [],
		centerGuard: s.slice(45, 50),
		rightNumbers: numbers ? numbers.slice(6, 12) : [],
		rightHandGuard: s.slice(-3),
	};
};

module.exports = string => binary(string);
