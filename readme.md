# barcode-get-binary-sections

[![Build Status](https://travis-ci.org/agarrharr/barcode-get-binary-sections.svg?branch=master)](https://travis-ci.org/agarrharr/barcode-get-binary-sectionsid)

## Install

```
$ npm install --save barcode-get-binary-sections
```

## Usage

```js
const barCodeGetBinarySections = require('barcode-get-binary-sections');

barCodeGetBinarySections('10100011010110001001100100011010001101000110101010111001011001101101100100111011001101000100101')
//=> {
  leftNumbers: ['0001101', '0110001', '0011001', '0001101', '0001101', '0001101'],
  rightNumbers: ['1110010', '1100110', '1101100', '1001110', '1100110', '1000100'],
  hasLeftHandGuard: true,
  hasRightHandGuard: true,
  isBackwards: false
}
```

## API

### barCodeGetBinarySections(bars)

Returns the parts of the barcode as an object.

#### bars

Type: `string`

A binary representation of the barcode in binary.

## License

MIT
