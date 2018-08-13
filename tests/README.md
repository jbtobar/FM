# Ubuntu tests

## from compiler.array.io
```
output:
/opt/solc/bin/solc --ast-json /tmp/gw_input -o ./

solc call has been done
/opt/solc_compiler/build/solc_parser --ast-json "gw_input_json.ast" --contractname "Temp"

OK
```

## from FM

```
solc --ast-json contracts/Temp.sol -o mezzo
```
```
~/array/array-io-fm/solc_compiler/build/solc_parser --ast-json mezzo/Temp.sol_json.ast --contractname "Temp"
```
