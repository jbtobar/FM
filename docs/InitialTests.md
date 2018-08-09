# Initial Tests
###### From compiler.array.io
```
output:
/opt/solc/bin/solc --ast-json /tmp/gw_input -o ./

solc call has been done
/opt/solc_compiler/build/solc_parser --ast-json "gw_input_json.ast" --contractname "Temp"
```
###### For test script
```
solc --ast-json ./contracts/Tempo.sol -o ./output
```
# Test Design
---

# Solidity in Depth

#### Version Pragma
`pragma solidity ^0.4.0;`
#### Importing other Source Files
```javascript
1.
import "filename";
2.
import * as symbolName from "filename";
3.
import {symbol1 as alias, symbol2} from "filename";


4.
import "filename" as symbolName;
equivalent to
import * as symbolName from "filename";
```
#### Comments
```javascript
1. 'SingleLineComments'
// This is a single-line comment.
2. 'Multi-line comments'
/*
This is a
multi-line comment.
*/
3. 'natspec comments'
/** ... */
or
/// like
/// this
```
#### Structure of a Contract
 - State Variables
 - Functions
 - Function Modifiers
 - Events
 - Struct Types
 - Enum Types
---

## Types
### Value Types
#### Booleans
`bool` can be `true` or `false`

Operators:
 - `!`
 - `&&`
 - `||`
 - `==`
 - `!=`

note:
>The operators || and && apply the common short-circuiting rules. This means that in the expression f(x) || g(y), if f(x) evaluates to true, g(y) will not be evaluated even if it may have side-effects.

#### Integers
 - `int`/`uint`
 - `uint8` to `uint256` in steps of `8`
 - `int8` to `int256`
 - `int`/`uint` aliases for `int256`/`uint256`

Operators:
 - Comparisons:
 `<=`,`<`,`==`,`!=`,`>=`,`>` evaluate to `bool`
 - Bit Operators:
 `&`,`|`,`^` (bitwise exclusive or), `~` (bitwise negation)
 - Arithmetic Operators:
 `+`,`-`, unary `-`, unary `+`,`*`,`/`,`%` (remainder), `**` (exponentiation), `<<` (left shift), `>>` (right shift)

note:
>Division always truncates (it is just compiled to the DIV opcode of the EVM), but it does not truncate if both operators are literals (or literal expressions).

note:
>Division by zero and modulus with zero throws a runtime exception.

note:
>The result of a shift operation is the type of the left operand. The expression `x << y` is equivalent to `x * 2**y`, and `x >> y` is equivalent to `x / 2**y`. This means that shifting negative numbers sign extends. Shifting by a negative amount throws a runtime exception.

WARNING:
>The results produced by shift right of negative values of signed integer types is different from those produced by other programming languages. In Solidity, shift right maps to division so the shifted negative values are going to be rounded towards zero (truncated). In other programming languages the shift right of negative values works like division with rounding down (towards negative infinity).

#### Fixed Point Numbers

WARNING:
>Fixed point numbers are not fully supported by Solidity yet. They can be declared, but cannot be assigned to or from.

go back to this...
```
http://solidity.readthedocs.io/en/v0.4.24/types.html
```

#### Address

`address`: Holds a 20 byte value. Address types also have members and serve as a base for all contracts.

Operators:
 - `<=`,`<`,`==`,`!=`,`>=`,`>`

note:
>Starting with version 0.5.0 contracts do not derive from the address type, but can still be explicitly converted to address.

##### Members of Addresses

 - `balance` and `transfer`
 - `send` (see Warning below)
 - `call`,`callcode`,`delegatecall`

**balance and transfer**

example:
```javascript
address x = 0x123;
address myAddress = this;
if (x.balance < 10 && myAddress.balance >= 10) x.transfer(10);
```
note:
>If `x` is a contract address, its code (more specifically: its fallback function, if present) will be executed together with the `transfer` call (this is a feature of the EVM and cannot be prevented). If that execution runs out of gas or fails in any way, the Ether transfer will be reverted and the current contract will stop with an exception.

**send**

Send is the low-level counterpart of `transfer`. If the execution fails, the current contract will not stop with an exception, but `send` will return `false`.

Warning:
>There are some dangers in using `send`: The transfer fails if the call stack depth is at 1024 (this can always be forced by the caller) and it also fails if the recipient runs out of gas. So in order to make safe Ether transfers, always check the return value of `send`, use `transfer` or even better: use a pattern where the recipient withdraws the money.

**call**

`call` returns a boolean indicating whether the invoked function terminated (`true`) or caused an EVM exception (`false`). It is not possible to access the actual data returned (for this we would need to know the encoding and size in advance).

LOOK BACK AT THIS ^^^

#### Fixed-size byte arrays

`bytes1`, `bytes2`, `bytes3`, …, `bytes32`. `byte` is an alias for `bytes1`.

Operators:
 - Comparisons: <=, <, ==, !=, >=, > (evaluate to bool)
 - Bit operators: &, |, ^ (bitwise exclusive or), ~ (bitwise negation), << (left shift), >> (right shift)
 - Index access: If x is of type bytesI, then x[k] for 0 <= k < I returns the k th byte (read-only).
