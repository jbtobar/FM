>stella 159.65.5.33


solc --ast-json contracts/Temp.sol -o mezzo
~/array/array-io-fm/solc_compiler/build/solc_parser --ast-json mezzo/Temp.sol_json.ast --contractname "Temp"


sha3.keccak_256('Temp::Abc(uint256)').hexdigest()


0bbccaaa

aacabc0b



Using 0.4.21 and compiles without the above errors, I still have this error though:
```
ERROR: SourceUnit: PragmaDirective: is not supported yet
contr id = 459 ; depsize = 0
```
the solc version:
```
jbt@stella:~/array/FM/tests$ solc --version
solc, the solidity compiler commandline interface
Version: 0.4.21+commit.dfe3193c.Linux.g++
```
Anyway, a question about calling the contract:
In the default `Temp` contract, the function: `"Temp::GetA()"` has a hash of `aacabc0b` by looking at the abi.json or by computing sha3.keccak_256 hexdigest().
However, I see that the function is called like this: `call_contract "jb101" "0bbccaaa"`. From where do I get the `"0bbccaaa"`?
