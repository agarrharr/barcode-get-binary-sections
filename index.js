'use strict';

const binary = string => {
	const numbers = string.slice(3, 45).concat(string.slice(50, 92)).match(/.{7}/g);

	return {
		leftHandGuard: string.slice(0, 3),
		leftNumbers: numbers ? numbers.slice(0, 6) : [],
		centerGuard: string.slice(45, 50),
		rightNumbers: numbers ? numbers.slice(6, 12) : [],
		rightHandGuard: string.slice(-3),
		isBackwards: numbers ? numbers[0][0] === 1 : false
	};
};

module.exports = string => binary(string);
