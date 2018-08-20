# Step 1

FOR 'Temp.sol' IN LIST_OF_CONTRACTS, DO:

```sh
#!/bin/bash
solc --ast-json contracts/Temp.sol -o mezzo

~/array/array-io-fm/solc_compiler/build/solc_parser --ast-json mezzo/Temp.sol_json.ast --contractname "Temp"

grep -Po '"hash":.*?[^\\]",' abi.json | grep -Po '"hash":.*?[^\\]",'|awk -F':' '{print $2}' | tr -d '"' | tr -d ',' > converted.txt



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
   call_contract "jb103" "aacabc0b"
   echo
done
#EOF
```
<!--
```sh
grep -Po '"hash":.*?[^\\]",' abi.json | grep -Po '"hash":.*?[^\\]",'|awk -F':' '{print $2}'
```
```sh
grep -Po '"hash":.*?[^\\]",' abi.json | grep -Po '"hash":.*?[^\\]",'|awk -F':' '{print $2}' | tr -d '"' | tr -d ','
``` -->


YES BELOW:
```sh
grep -Po '"hash":.*?[^\\]",' abi.json | grep -Po '"hash":.*?[^\\]",'|awk -F':' '{print $2}' | tr -d '"' | tr -d ',' > conv.txt
```


```sh
#!/bin/bash
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
```



sh scripts/do.sh | cli_wallet

# do.sh
```sh
#!/bin/bash
echo 'unlock dionysus'
echo 'create_contract "jb104" "nathan" %/home/jbt/array/tests/solc_parser_res.forth "" [] 100000 true'
sleep 3
#EOF
```

```sh
#!/bin/bash
v=`cat /dev/stdin`
echo 'unlock dionysus'
echo 'create_contract "jb104" "nathan" %/home/jbt/array/tests/solc_parser_res.forth "" [] 100000 true'
sleep 3
#EOF
```




```sh
cat converted.txt | while read line
do
   # do something with $line here
   v=$line
   i=${#v}

   while [ $i -gt 0 ]
   do
       i=$[$i-2]
       echo -n ${v:$i:2}
   done
done
```


echo 00d66d7e | scripts/endian.sh
```sh
# check stdin
if [ -t 0 ]; then exit; fi

v=`cat /dev/stdin`
i=${#v}

while [ $i -gt 0 ]
do
    i=$[$i-2]
    echo -n ${v:$i:2}
done
```





echo blau | bash scripts/do2.sh | cli_wallet

<!-- do2.sh -->
```sh
#!/bin/bash
v=`cat /dev/stdin`
#i=${#v}
echo 'unlock dionysus'
echo 'create_contract "'$v'" "nathan" %/home/jbt/array/tests/solc_parser_res.forth "" [] 100000 true'
sleep 3
#EOF
```







#!/bin/bash
#cat converted.txt | while read line
echo 'unlock dionysus'
#do
   # do something with $line here
   # echo $line
#   v=$line
#   echo 'call_contract "blawan" "'${v:6:2}${v:4:2}${v:2:2}${v:0:2}'"'
   echo 'call_contract "blawan" "aacabc0b"'
   # echo 'unlock dionysus'
   # echo 'create_contract "'$v'" "nathan" %/home/jbt/array/tests/solc_parser_res.forth "" [] 100000 true'
   # echo ${v:6:2}${v:4:2}${v:2:2}${v:0:2}
#done
#EOF
