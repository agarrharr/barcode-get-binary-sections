'use strict';

const isEvenParity = string => string.split('').reduce((a, c) => Boolean(Number(c)) ? !a: a, true);
const reverseString = s => s.split('').reverse().join('');

const findAllMatches = (s, search) => {
	var lastMatch;
	var result = [];

	if ((lastMatch = s.indexOf(search)) >= 0) {
		result.push(lastMatch);

		while ((lastMatch = s.indexOf(search, lastMatch + 1)) >= 0) {
			result.push(lastMatch);
		}
	}
	return result;
}

const binary = string => {
	const centerGuardIndexes = findAllMatches(string, '01010');
	let hasCenterGuard = false;
	let centerGuardIndex;
	for (let i = 0; i < centerGuardIndexes.length; i++) {
		if (string.slice(0, 3) === '101' && centerGuardIndexes.includes(45)) {
			hasCenterGuard = true;
			centerGuardIndex = 45;
		} else if (string.slice(string.length - 3, string.length) === '101' && centerGuardIndexes.includes(string.length - 50)) {
			hasCenterGuard = true;
			centerGuardIndex = string.length - 50;
		}
	}
	if (!hasCenterGuard) {
		return false;
	}

	const isBackwards = string.length > 3 &&
		(
		(0 < centerGuardIndex - 7 && isEvenParity(string.slice(centerGuardIndex - 7, centerGuardIndex))) ||
			(string.length > centerGuardIndex + 11 && !isEvenParity(string.slice(centerGuardIndex + 5, centerGuardIndex + 12)))
		)
	const s = isBackwards ? reverseString(string) : string;
	if (isBackwards) {
		centerGuardIndex = s.length - centerGuardIndex - 5;
	}
	const hasLeftHandGuard = s.slice(0, 3) === '101';
	const hasRightHandGuard = s.slice(string.length - 3, string.length) === '101';
	const numbers = s.slice(hasLeftHandGuard ? 3 : 0, centerGuardIndex).concat(s.slice(centerGuardIndex + 5, hasRightHandGuard ? s.length - 3 : s.length)).match(/.{1,7}/g);

	return {
		leftNumbers: numbers ? numbers.slice(0, 6) : [],
		rightNumbers: numbers ? numbers.slice(6, 12) : [],
		hasCenterGuard,
		hasLeftHandGuard: hasLeftHandGuard ? (hasCenterGuard ? centerGuardIndex === 45 : false) : false,
		hasRightHandGuard,
		isBackwards
	};
};

module.exports = string => binary(string);
