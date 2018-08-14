# cli_wallet build on Ubuntu
```
Ubuntu 16.04.3 LTS (GNU/Linux 4.4.0-109-generic x86_64)
```
## Prerequisites
Libraries, not sure if all these are needed but its what I did. These are all the libraries needed for bitshares build.
```
sudo apt-get update
sudo apt-get install cmake make libbz2-dev libdb++-dev libdb-dev libssl-dev openssl libreadline-dev autoconf libtool git ntp libcurl4-openssl-dev g++ libcurl4-openssl-dev
sudo apt-get install libboost-all-dev
```
##### Building boost 1.67
```
wget -c 'http://sourceforge.net/projects/boost/files/boost/1.67.0/boost_1_67_0.tar.bz2/download' -O boost_1_67_0.tar.bz2
tar xjf boost_1_67_0.tar.bz2
[ $( sha256sum boost_1_67_0.tar.bz2 | cut -d ' ' -f 1 ) == "2684c972994ee57fc5632e03bf044746f6eb45d4920c343937a465fd67a5adba" ] || ( echo 'Corrupt download' ; exit 1 )
cd boost_1_67_0
sudo ./bootstrap.sh --prefix=/usr/local
sudo ./b2 install
```
##### Installing gperftools
If you get `-ltcmalloc_minimal not found`  error
```
sudo apt-get install google-perftools libgoogle-perftools-dev
```
##### openssl-1.1.0g

Looking back at my bash history I don't seem to have installed this version, but I had to point to it during cmake like so:
```
-DOPENSSL_ROOT_DIR=/usr/local/src/openssl-1.1.0g
-DOPENSSL_LIBRARIES=/usr/local/src/openssl-1.1.0g/lib
-DOPENSSL_INCLUDE_DIR=/usr/local/src/openssl-1.1.0g/include
```

## To make cli_wallet
```
git clone git@github.com:arrayio/array-io-core.git
cd array-io-core
git submodule update --init --recursive
mkdir build
cd build
cmake -DOPENSSL_ROOT_DIR=/usr/local/src/openssl-1.1.0g -DOPENSSL_LIBRARIES=/usr/local/src/openssl-1.1.0g/lib -DOPENSSL_INCLUDE_DIR=/usr/local/src/openssl-1.1.0g/include -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
make cli_wallet
```
Building cli_wallet succeeded, however, I had some errors in the process:

## Errors I encountered:

#### virtual memory exhausted
Failed with 2GB RAM, 3GB RAM.

Solved with 4GM RAM.
#### Problems with fc libraries `crypto/dh.cp`
Exact problem here:
```
[ 28%] Building CXX object libraries/fc/CMakeFiles/fc.dir/src/crypto/dh.cpp.o
```
Solved by pointing cmake to correct openssl version.
#### "expected string-literal before.."
exact error:
```
/home/jbt/array/array-io-core/libraries/chain/IFMHostImpl.cpp:238:59: error: expected ‘,’ before ‘)’ token
     static_assert(sizeof(taddr.addr._hash) == sizeof(addr));
                                                           ^
/home/jbt/array/array-io-core/libraries/chain/IFMHostImpl.cpp:238:59: error: expected string-literal before ‘)’ token
```
I found the following discussion with people having same problem here:
https://github.com/raphaelsc/Am-I-affected-by-Meltdown/issues/3

And the solution is in this commit:

https://github.com/raphaelsc/Am-I-affected-by-Meltdown/commit/0216748ca89d1583901cefc3ae47912896cad00c

What I did is the following:

On this file:
```
/array-io-core/libraries/chain/IFMHostImpl.cpp
line 538:29
```
changed it from:
```
...
bool IFMHostImpl::env_map_address(const TAddr& addr, TAccountID& account, bool *create)
{
    address taddr;
    static_assert(sizeof(taddr.addr._hash) == sizeof(addr));
...
```
to
```
...
bool IFMHostImpl::env_map_address(const TAddr& addr, TAccountID& account, bool *create)
{
    address taddr;
    static_assert(sizeof(taddr.addr._hash) == sizeof(addr), "Not sure what this will do...");
...
```
Just added an argument in the `static_assert()`

#### `-ltcmalloc_minimal not found`

Make sure gperftools are installed:
```
sudo apt-get install google-perftools libgoogle-perftools-dev
```


---

# Running Tests

alias cli_wallet=''
```
create_contract "c10103012" "nathan" %/home/jbt/array/tests/solc_parser_res.forth "" [] 100000 true


```

```
execute_contract "tickers001" "nathan" "8810d422" 0 BTS 10000 "" true
```
