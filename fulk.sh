#!/bin/bash
cat converted.txt | while read line
echo 'unlock dionysus'
do
   # do something with $line here
   # echo $line
   v=$line
   echo 'call_contract "blawan" "${v:6:2}${v:4:2}${v:2:2}${v:0:2}"'
   # echo 'unlock dionysus'
   # echo 'create_contract "'$v'" "nathan" %/home/jbt/array/tests/solc_parser_res.forth "" [] 100000 true'
   # echo ${v:6:2}${v:4:2}${v:2:2}${v:0:2}
done
#EOF
