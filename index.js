'use strict';

const CENTER_PATTERN = '01010';
const END_PATTERN = '101';
const END_LENGTH = 3;
const CENTER_LENGTH = 5;
const NUMBER_LENGTH = 7;
const CENTER_INDEX = END_LENGTH + 6 * NUMBER_LENGTH;

const isEvenParity = s => s.split('').reduce((a, c) => Boolean(Number(c)) ? !a: a, true);
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

const getCenterGuardIndex = s => {
	const centerGuardIndexes = findAllMatches(s, CENTER_PATTERN);
	const hasLeft = s.slice(0, END_LENGTH) === '101';
	const hasRight = s.slice(s.length - END_LENGTH, s.length) === '101';

	return (hasLeft && centerGuardIndexes.includes(CENTER_INDEX)) ?  CENTER_INDEX :
		(hasRight && centerGuardIndexes.includes(s.length - CENTER_INDEX - CENTER_LENGTH)) ?  s.length - CENTER_INDEX - CENTER_LENGTH : -1;
}

const getIsBackwards = (s, centerGuardIndex) => {
	const numberBeforeCenterGuard = s.slice(centerGuardIndex - NUMBER_LENGTH, centerGuardIndex);
	const numberAfterCenterGuard = s.slice(centerGuardIndex + CENTER_LENGTH, centerGuardIndex + CENTER_LENGTH + NUMBER_LENGTH);
	return ((0 < centerGuardIndex - NUMBER_LENGTH && isEvenParity(numberBeforeCenterGuard)) ||
		(s.length > centerGuardIndex + CENTER_LENGTH + NUMBER_LENGTH && !isEvenParity(numberAfterCenterGuard)));
};

const getNumbers = (hasLeftHandGuard, hasRightHandGuard, centerGuardIndex, s) =>
	s.slice(hasLeftHandGuard ? END_LENGTH : 0, centerGuardIndex)
		.concat(s.slice(centerGuardIndex + CENTER_LENGTH, hasRightHandGuard ? s.length - END_LENGTH : s.length))
		.match(/.{1,7}/g)

const binary = string => {
	const originalCenterGuardIndex = getCenterGuardIndex(string);
	if (originalCenterGuardIndex === -1) {
		return false;
	}

	const isBackwards = getIsBackwards(string, originalCenterGuardIndex);
	const s = isBackwards ? reverseString(string) : string;
	const centerGuardIndex = isBackwards ? s.length - originalCenterGuardIndex - CENTER_LENGTH : originalCenterGuardIndex;
	const hasLeftHandGuard = s.slice(0, END_LENGTH) === END_PATTERN && centerGuardIndex === CENTER_INDEX;
	const hasRightHandGuard = s.slice(s.length - END_LENGTH, s.length) === END_PATTERN && centerGuardIndex === s.length - CENTER_INDEX - CENTER_LENGTH;
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
