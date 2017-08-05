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

const getCenterGuardIndex = string => {
	const centerGuardIndexes = findAllMatches(string, '01010');
	const hasLeft = string.slice(0, 3) === '101';
	const hasRight = string.slice(string.length - 3, string.length) === '101';

	return (hasLeft && centerGuardIndexes.includes(45)) ?  45 :
		(hasRight && centerGuardIndexes.includes(string.length - 50)) ?  string.length - 50 : -1;
}

const getIsBackwards = (string, centerGuardIndex) =>
	((0 < centerGuardIndex - 7 && isEvenParity(string.slice(centerGuardIndex - 7, centerGuardIndex))) ||
	(string.length > centerGuardIndex + 11 && !isEvenParity(string.slice(centerGuardIndex + 5, centerGuardIndex + 12))))

const getNumbers = (hasLeftHandGuard, hasRightHandGuard, centerGuardIndex, s) =>
	s.slice(hasLeftHandGuard ? 3 : 0, centerGuardIndex).concat(s.slice(centerGuardIndex + 5, hasRightHandGuard ? s.length - 3 : s.length)).match(/.{1,7}/g)

const binary = string => {
	const originalCenterGuardIndex = getCenterGuardIndex(string);
	if (originalCenterGuardIndex === -1) {
		return false;
	}

	const isBackwards = getIsBackwards(string, originalCenterGuardIndex);
	const s = isBackwards ? reverseString(string) : string;
	const centerGuardIndex = isBackwards ? s.length - originalCenterGuardIndex - 5 : originalCenterGuardIndex;
	const hasLeftHandGuard = s.slice(0, 3) === '101' && centerGuardIndex === 45;
	const hasRightHandGuard = s.slice(string.length - 3, string.length) === '101' && centerGuardIndex === string.length - 50;
	const numbers = getNumbers(hasLeftHandGuard, hasRightHandGuard, centerGuardIndex, s);

	return {
		leftNumbers: numbers ? numbers.slice(0, 6) : [],
		rightNumbers: numbers ? numbers.slice(6, 12) : [],
		hasLeftHandGuard,
		hasRightHandGuard,
		isBackwards
	};
};

module.exports = string => binary(string);
