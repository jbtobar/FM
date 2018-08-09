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
