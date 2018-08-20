#!/bin/bash
v=`cat /dev/stdin`

solc --ast-json contracts/Temp.sol -o mezzo

~/array/array-io-fm/solc_compiler/build/solc_parser --ast-json mezzo/Temp.sol_json.ast --contractname "Temp"

grep -Po '"hash":.*?[^\\]",' abi.json | grep -Po '"hash":.*?[^\\]",'|awk -F':' '{print $2}' | tr -d '"' | tr -d ',' > converted.txt

`echo $v | bash scripts/do2.sh | cli_wallet`

cat converted.txt | while read line
do
   # do something with $line here
   echo $line
   v=$line
   i=${#v}

   while [ $i -gt 0 ]
   do
       i=$[$i-2]
       echo -n ${v:$i:2}
   done
   echo
done
#EOF
