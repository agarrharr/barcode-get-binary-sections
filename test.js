import test from 'ava';
import m from './';

test(t => {
	t.deepEqual(m('10100011010110001001100100011010001101000110101010111001011001101101100100111011001101000100101'),
		{
			leftHandGuard: '101',
			leftNumbers: ['0001101', '0110001', '0011001', '0001101', '0001101', '0001101'],
			centerGuard: '01010',
			rightNumbers: ['1110010', '1100110', '1101100', '1001110', '1100110', '1000100'],
			rightHandGuard: '101',
			isBackwards: false
		});

	t.deepEqual(m('10100011010110001001100100011010001101000110101010'),
		{
			leftHandGuard: '101',
			leftNumbers: ['0001101', '0110001', '0011001', '0001101', '0001101', '0001101'],
			centerGuard: '01010',
			rightNumbers: [],
			rightHandGuard: '010',
			isBackwards: false
		});

	t.deepEqual(m('1010001101011000100110010001101000110100011010'),
		{
			leftHandGuard: '101',
			leftNumbers: ['0001101', '0110001', '0011001', '0001101', '0001101', '0001101'],
			centerGuard: '0',
			rightNumbers: [],
			rightHandGuard: '010',
			isBackwards: false
		});

	t.deepEqual(m('101000110101100010011001000110100011010001101'),
		{
			leftHandGuard: '101',
			leftNumbers: ['0001101', '0110001', '0011001', '0001101', '0001101', '0001101'],
			centerGuard: '',
			rightNumbers: [],
			rightHandGuard: '101',
			isBackwards: false
		});

	t.deepEqual(m('101000110101100010011001000110100011010'),
		{
			leftHandGuard: '101',
			leftNumbers: ['0001101', '0110001', '0011001', '0001101', '0001101'],
			centerGuard: '',
			rightNumbers: [],
			rightHandGuard: '010',
			isBackwards: false
		});

	t.deepEqual(m('1010001101011000100110010001101000110'),
		{
			leftHandGuard: '101',
			leftNumbers: ['0001101', '0110001', '0011001', '0001101'],
			centerGuard: '',
			rightNumbers: [],
			rightHandGuard: '110',
			isBackwards: false
		});

	t.deepEqual(m('101'),
		{
			leftHandGuard: '101',
			leftNumbers: [],
			centerGuard: '',
			rightNumbers: [],
			rightHandGuard: '101',
			isBackwards: false
		});

	t.deepEqual(m('1'),
		{
			leftHandGuard: '1',
			leftNumbers: [],
			centerGuard: '',
			rightNumbers: [],
			rightHandGuard: '1',
			isBackwards: false
		});

	t.deepEqual(m(''),
		{
			leftHandGuard: '',
			leftNumbers: [],
			centerGuard: '',
			rightNumbers: [],
			rightHandGuard: '',
			isBackwards: false
		});
});
