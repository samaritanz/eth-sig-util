"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bn_js_1 = __importDefault(require("bn.js"));
const ethereumjs_abi_utils_1 = require("./ethereumjs-abi-utils");
describe('encoding negative int256', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.rawEncode)(['int256'], [
            new bn_js_1.default('-19999999999999999999999999999999999999999999999999999999999999', 10),
        ]).toString('hex');
        const b = 'fffffffffffff38dd0f10627f5529bdb2c52d4846810af0ac000000000000001';
        expect(a).toStrictEqual(b);
    });
});
describe('encoding string >32bytes', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.rawEncode)(['string'], [
            ' hello world hello world hello world hello world  hello world hello world hello world hello world  hello world hello world hello world hello world hello world hello world hello world hello world',
        ]).toString('hex');
        const b = '000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000c22068656c6c6f20776f726c642068656c6c6f20776f726c642068656c6c6f20776f726c642068656c6c6f20776f726c64202068656c6c6f20776f726c642068656c6c6f20776f726c642068656c6c6f20776f726c642068656c6c6f20776f726c64202068656c6c6f20776f726c642068656c6c6f20776f726c642068656c6c6f20776f726c642068656c6c6f20776f726c642068656c6c6f20776f726c642068656c6c6f20776f726c642068656c6c6f20776f726c642068656c6c6f20776f726c64000000000000000000000000000000000000000000000000000000000000';
        expect(a).toStrictEqual(b);
    });
});
describe('encoding uint32 response', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.rawEncode)(['uint32'], [42]).toString('hex');
        const b = '000000000000000000000000000000000000000000000000000000000000002a';
        expect(a).toStrictEqual(b);
    });
});
describe('encoding string response (unsupported)', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.rawEncode)(['string'], ['a response string (unsupported)']).toString('hex');
        const b = '0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001f6120726573706f6e736520737472696e672028756e737570706f727465642900';
        expect(a).toStrictEqual(b);
    });
});
describe('encoding', function () {
    it('should work for uint256', function () {
        const a = (0, ethereumjs_abi_utils_1.rawEncode)(['uint256'], [1]).toString('hex');
        const b = '0000000000000000000000000000000000000000000000000000000000000001';
        expect(a).toStrictEqual(b);
    });
    it('should work for uint', function () {
        const a = (0, ethereumjs_abi_utils_1.rawEncode)(['uint'], [1]).toString('hex');
        const b = '0000000000000000000000000000000000000000000000000000000000000001';
        expect(a).toStrictEqual(b);
    });
    it('should work for int256', function () {
        const a = (0, ethereumjs_abi_utils_1.rawEncode)(['int256'], [-1]).toString('hex');
        const b = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
        expect(a).toStrictEqual(b);
    });
    it('should work for string and uint256[2]', function () {
        const a = (0, ethereumjs_abi_utils_1.rawEncode)(['string', 'uint256[2]'], ['foo', [5, 6]]).toString('hex');
        const b = '0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000003666f6f0000000000000000000000000000000000000000000000000000000000';
        expect(a).toStrictEqual(b);
    });
});
describe('encoding bytes33', function () {
    it('should fail', function () {
        expect(() => (0, ethereumjs_abi_utils_1.rawEncode)('fail', ['bytes33'])).toThrow('types.forEach is not a function');
    });
});
describe('encoding invalid type', function () {
    it('should fail', function () {
        expect(() => (0, ethereumjs_abi_utils_1.rawEncode)(['fail'], ['bytes33'])).toThrow('Unsupported or invalid type: "fail"');
    });
});
describe('encoding invalid fixed type', function () {
    it('should fail', function () {
        expect(() => (0, ethereumjs_abi_utils_1.rawEncode)(['fixedfail'], ['bytes33'])).toThrow('Invalid parseTypeNxM input "fixedfail".');
    });
});
describe('encoding uint0', function () {
    it('should fail', function () {
        expect(() => (0, ethereumjs_abi_utils_1.rawEncode)('fail', ['uint0'])).toThrow('types.forEach is not a function');
    });
});
describe('encoding uint257', function () {
    it('should fail', function () {
        expect(() => (0, ethereumjs_abi_utils_1.rawEncode)('fail', ['uint257'])).toThrow('types.forEach is not a function');
    });
});
describe('encoding int0', function () {
    it('should fail', function () {
        expect(() => (0, ethereumjs_abi_utils_1.rawEncode)(['int0'], [1])).toThrow('Invalid int<N> width: 0');
    });
});
describe('encoding int257', function () {
    it('should fail', function () {
        expect(() => (0, ethereumjs_abi_utils_1.rawEncode)(['int257'], [1])).toThrow('Invalid int<N> width: 257');
    });
});
describe('encoding uint[2] with [1,2,3]', function () {
    it('should fail', function () {
        expect(() => (0, ethereumjs_abi_utils_1.rawEncode)(['uint[2]'], [[1, 2, 3]])).toThrow('Elements exceed array size: 2');
    });
});
describe('encoding uint8 with 9bit data', function () {
    it('should fail', function () {
        expect(() => (0, ethereumjs_abi_utils_1.rawEncode)(['uint8'], [new bn_js_1.default(1).iushln(9)])).toThrow('Supplied uint exceeds width: 8 vs 10');
    });
});
describe('solidity tight packing bool', function () {
    it('should equal', function () {
        let a = (0, ethereumjs_abi_utils_1.solidityPack)(['bool'], [true]);
        let b = '01';
        expect(a.toString('hex')).toStrictEqual(b);
        a = (0, ethereumjs_abi_utils_1.solidityPack)(['bool'], [false]);
        b = '00';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing address', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['address'], [new bn_js_1.default('43989fb883ba8111221e89123897538475893837', 16)]);
        const b = '43989fb883ba8111221e89123897538475893837';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing string', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['string'], ['test']);
        const b = '74657374';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing bytes', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['bytes'], [Buffer.from('123456', 'hex')]);
        const b = '123456';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing bytes8', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['bytes8'], [Buffer.from('123456', 'hex')]);
        const b = '1234560000000000';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing uint', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['uint'], [42]);
        const b = '000000000000000000000000000000000000000000000000000000000000002a';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing uint16', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['uint16'], [42]);
        const b = '002a';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing int', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['int'], [-42]);
        const b = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd6';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing int16', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['int16'], [-42]);
        const b = 'ffd6';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing multiple arguments', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['bytes32', 'uint32', 'uint32', 'uint32', 'uint32'], [Buffer.from('123456', 'hex'), 6, 7, 8, 9]);
        const b = '123456000000000000000000000000000000000000000000000000000000000000000006000000070000000800000009';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing uint32[]', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['uint32[]'], [[8, 9]]);
        const b = '00000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000009';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing bool[][]', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['bool[][]'], [
            [
                [true, false],
                [false, true],
            ],
        ]);
        const b = '0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing address[]', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['address[]'], [[new bn_js_1.default('43989fb883ba8111221e89123897538475893837', 16)]]);
        const b = '00000000000000000000000043989fb883ba8111221e89123897538475893837';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity tight packing uint32[2]', function () {
    it('should equal', function () {
        const a = (0, ethereumjs_abi_utils_1.solidityPack)(['uint32[2]'], [[11, 12]]);
        const b = '000000000000000000000000000000000000000000000000000000000000000b000000000000000000000000000000000000000000000000000000000000000c';
        expect(a.toString('hex')).toStrictEqual(b);
    });
});
describe('solidity packing different amounts of values and types should fail', function () {
    it('should throw "Number of types are not matching the values"', function () {
        expect(() => {
            (0, ethereumjs_abi_utils_1.solidityPack)(['uint32'], [11, 12]);
        }).toThrow('Number of types are not matching the values');
    });
});
describe('parseNumber should throw an error when passed an object', function () {
    it('should throw "Argument is not a number', function () {
        expect(() => {
            (0, ethereumjs_abi_utils_1.parseNumber)({ test: 'test' });
        }).toThrow('Argument is not a number');
    });
});
//# sourceMappingURL=ethereumjs-abi-utils.test.js.map