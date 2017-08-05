import test from 'ava';
import m from './';

test(t => {
	// leftGuard, leftNumbers, 1 bit of centerGuard
	t.deepEqual(m('1010001101011000100110010001101000110100011010'), false);

	// leftGuard, leftNumbers
	t.deepEqual(m('101001100101011110011001000110100011010001101'), false);

	t.deepEqual(m('1'), false);
	t.deepEqual(m(''), false);

	// leftGuard, leftNumbers, centerGuard, rightNumbers, rightGuard
	t.deepEqual(m('10100011010110001001100100011010001101000110101010111001011001101101100100111011001101000100101'),
		{
			leftNumbers: ['0001101', '0110001', '0011001', '0001101', '0001101', '0001101'],
			rightNumbers: ['1110010', '1100110', '1101100', '1001110', '1100110', '1000100'],
			hasLeftHandGuard: true,
			hasCenterGuard: true,
			hasRightHandGuard: true,
			isBackwards: false
		});

	// leftGuard, leftNumbers, centerGuard, 2 bits of rightNumbers
	t.deepEqual(m('1010001101011000100110010001101000110100011010101010'),
		{
			leftNumbers: ['0001101', '0110001', '0011001', '0001101', '0001101', '0001101'],
			rightNumbers: ['10'],
			hasLeftHandGuard: true,
			hasCenterGuard: true,
			hasRightHandGuard: false,
			isBackwards: false
		});

	// leftGuard, leftNumbers, centerGuard
	t.deepEqual(m('10100011010110001001100100011010001101000110101010'),
		{
			leftNumbers: ['0001101', '0110001', '0011001', '0001101', '0001101', '0001101'],
			rightNumbers: [],
			hasLeftHandGuard: true,
			hasCenterGuard: true,
			hasRightHandGuard: false,
			isBackwards: false
		});
});

test(t => {
	// rightGuard, rightNumbers, centerGuard, leftNumbers, leftGuard
	t.deepEqual(m('10100100010110011011100100110110110011010011101010101100010110001011000100110010001101011000101'),
		{
			leftNumbers: ['0001101', '0110001', '0011001', '0001101', '0001101', '0001101'],
			rightNumbers: ['1110010', '1100110', '1101100', '1001110', '1100110', '1000100'],
			hasLeftHandGuard: true,
			hasCenterGuard: true,
			hasRightHandGuard: true,
			isBackwards: true
		});

	// centerGuard, leftNumbers, leftGuard
	t.deepEqual(m('01010101100010110001011000100110010001101011000101'),
		{
			leftNumbers: ['0001101', '0110001', '0011001', '0001101', '0001101', '0001101'],
			rightNumbers: [],
			hasLeftHandGuard: true,
			hasCenterGuard: true,
			hasRightHandGuard: false,
			isBackwards: true
		});
});
