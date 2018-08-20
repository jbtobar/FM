#!/bin/bash
v=`cat /dev/stdin`

cli_wallet='/home/jbt/array/array-io-core/build/programs/cli_wallet/cli_wallet --wallet-file=/home/jbt/array/wallet.json --chain-id b6b83a593686087531ce581540564d20b2f75ff9879e9dd2eccfa9a79744b949 -sws://hawking.array.io:8090/ws'
do2='/home/jbt/array/FM/tests/scripts/do2.sh'

solc --ast-json contracts/Temp.sol -o mezzo

~/array/array-io-fm/solc_compiler/build/solc_parser --ast-json mezzo/Temp.sol_json.ast --contractname "Temp"

grep -Po '"hash":.*?[^\\]",' abi.json | grep -Po '"hash":.*?[^\\]",'|awk -F':' '{print $2}' | tr -d '"' | tr -d ',' > converted.txt

#`echo blawan | bash scripts/do2.sh | $cli_wallet`
cmd="echo $v | bash scripts/do2.sh | $cli_wallet"
eval $cmd
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
