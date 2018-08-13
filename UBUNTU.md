# Ubuntu Guide
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
changed it so:
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

## Notes

 - We need OPENSSL 1.1.0g and to point to it during cmake
 - We need boost 1.67. Its not on apt-get, so I built it from source


### Errors I encountered

# tcmallominimal

# Ubuntu Guide
## To build solc_compiler
Libraries, not sure if all of these are needed, but its what I did.
```
sudo apt-get update
sudo apt-get install cmake make libbz2-dev libdb++-dev libdb-dev libssl-dev openssl libreadline-dev autoconf libtool git ntp libcurl4-openssl-dev g++ libcurl4-openssl-dev
sudo apt-get install libboost-all-dev
```
Now cloning array-io-fm
```
git clone https://github.com/arrayio/array-io-fm.git
cd array-io-fm
cd solc_compiler
mkdir build && cd build
cmake ..
make
```
solc_parser should be done
## Get solc_compiler
```
sudo add-apt-repository ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install solc
```

```
cd array
mkdir tests
cd tests
git init
solc
mkdir contracts
mkdir mezzo
nano contracts/Temp.sol
solc --ast-json contracts/Temp.sol -o mezzo
ls mezzo
ls /opt
~/array/array-io-fm/solc_compiler/build/solc_parser
~/array/array-io-fm/solc_compiler/build/solc_parser --ast-json mezzo/Temp.sol_json.ast --contractname "Temp"
nano ./solc_parser_res.forth
~/array/array-io-fm/solc_compiler/build/solc_parser
ls
mkdir dev && cd dev
git clone https://github.com/bitshares/bitshares-core.git
cd bitshares-core.git
cd bitshares-core
git checkout 2.0.180612
git submodule update --init --recursive
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo .
sudo apt-get install autoconf cmake make automake libtool git libboost-all-dev libssl-dev g++ libcurl4-openssl-dev
make
make cli_wallet
cd ../
ls
cd array
ls
git clone git@github.com:arrayio/array-io-core.git
git clone https://github.com/arrayio/array-io-core.git
cd array-io-clone
cd array-io-core
ls
git submodule update --init --recursive
pbcopy < ~/.ssh/id_rsa.pub
ssh-keygen -o -t rsa -b 4096 -C jbtobar.io@gmail.com
pbcopy < ~/.ssh/id_rsa.pub
cat ~/.ssh/id_rsa.pub
git submodule update --init --recursive
cmake .
make cli_wallet
ls
cd ../
ls
cd array-io-fm
ls
make cli_wallet
git status
cd ../
cd array-io-core
make cli_wallet
ls
git status
make
cmake .
sudo apt-get install doxygen
cmake .
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo .
ls
git status
git remote -v
cmake -DBOOST_ROOT="$BOOST_ROOT" .
sudo apt-get upgrade
sudo apt-get install libboost-all-dev
wget -c 'http://sourceforge.net/projects/boost/files/boost/1.67.0/boost_1_67_0.tar.bz2/download' -O boost_1_67_0.tar.bz2
tar xjf boost_1_67_0.tar.bz2
[ $( sha256sum boost_1_57_0.tar.bz2 | cut -d ' ' -f 1 ) == "2684c972994ee57fc5632e03bf044746f6eb45d4920c343937a465fd67a5adba" ] || ( echo 'Corrupt download' ; exit 1 )
cd boost_1_g7_0/
cd boost_1_67_0/
./bootstrap.sh "--prefix=$BOOST_ROOT"
./b2 install
sudo ./b2 install
cd /array/array-io-core/boost_1_67_0$
cd array/array-io-core/boost_1_67_0
sudo ./b2 install
cd ../
cmake -DBOOST_ROOT="$BOOST_ROOT" .
cmake -DBOOST_ROOT="$BOOST_ROOT" -DCMAKE_BUILD_TYPE=RelWithDebInfo .
ls /usr/local/
ls /usr/local/include
nano ~./bash_profile
nano ~/.bash_profile
ls /usr/local
ls
ls ../
ls ../../
ls ../../../
ls ../../../../
ls ../../../../usr
ls ../../../../usr/lib
ls
ls boost_1_67_0
ls b2
ls boost_1_67_0/b2
ls boost_1_67_0/libs
cd boost_1_67_0
sudo ./bootstrap.sh --prefix=/usr/local
sudo ./b2 install
export PATH=$PATH:/usr/local/include/:/usr/local/lib/
source ~/.bash_profile
nano ~/.bashrc
nano ~/.profile
source ~/.profile
cd ../
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo .
cmake -DBOOST_ROOT="/usr/lib" .
make cli_wallet
cmake -DBOOST_ROOT="/usr/lib" -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
git status
ls
cmake -DBOOST_ROOT="/usr/lib" -DCMAKE_BUILD_TYPE=RelWithDebInfo .
make cli_wallet
git status
ls
rm CMakeCache.txt
rm Makefile
rm -rf CMakeFiles
cmake -DBOOST_ROOT="/usr/lib" -DCMAKE_BUILD_TYPE=RelWithDebInfo .
make
ls /usr/lib
ls /usr/local
ls /usr/local/include
ls /usr/local/lib
cd ../
ls
rm -rf array-io-core
sudo rm -rf array-io-core
ls
git clone git@github.com:arrayio/array-io-core.git
cd array-io-core
ls
gi status
git status
sudo git submodule update --init --recursive
pbcopy < ~/.ssh/id_rsa.pub
cat < ~/.ssh/id_rsa.pub
sudo git submodule update --init --recursive
git submodule update --init --recursive
ssh-add ~/.ssh/id_rsa
cd ../
mkdir blah &&  cd blah
git clone git@github.com:arrayio/array-io-fm.git
cd ../
rm -rf blah
cd array-io-core
cd ../
rm -rf array-io-core
sudo rm -rf array-io-core
git clone git@github.com:arrayio/array-io-core.git
cd array-io-core
git submodule update --init --recursive
mkdir build
cd build
cmake -DBOOST_ROOT="/usr/lib" -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
make cli_wallet
/usr/local/openssl/bin/openssl version
ls /usr/local/openssl
ls /usr/local/openssl/bin
ls /usr/local/openssl/bin/openssl
/usr/local/openssl/bin/openssl version
which openssl
/usr/bin/openssl version
/usr/local/openssl version
cd array/
ls
cd array-io-core/build
rm -rf *
ls
cmake -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl -DOPENSSL_LIBRARIES=/usr/local/opt/openssl/lib -DOPENSSL_INCLUDE_DIR=/usr/local/opt/openssl/include ..
make cli_wallet
ls /usr/local/opt/openssl/include
ls /usr/local/opt/
ls /usr/local/opt
ls /usr/local/src
rm -rf *
cmake -DOPENSSL_ROOT_DIR=/usr/local/src/openssl-1.1.0g -DOPENSSL_LIBRARIES=/usr/local/src/openssl-1.1.0g/lib -DOPENSSL_INCLUDE_DIR=/usr/local/src/openssl-1.1.0g/include ..
make cli_wallet
sudo shutdown -h now
cd array/array-io-core/build
ls
make cli_wallet
nano CMakeLists.txt
nano ../CMakeLists.txt
rm -rf *
ls
cmake -DOPENSSL_ROOT_DIR=/usr/local/src/openssl-1.1.0g -DOPENSSL_LIBRARIES=/usr/local/src/openssl-1.1.0g/lib -DOPENSSL_INCLUDE_DIR=/usr/local/src/openssl-1.1.0g/include -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
make cli_wallet
sudo reboot
nano /home/jbt/array/array-io-core/libraries/chain/IFMHostImpl.cpp:
nano /home/jbt/array/array-io-core/libraries/chain/IFMHostImpl.cpp
ls /usr/etc
ls
cd array
ls
free -m
cd /array/array-io-core/build
cd array/array-io-core/build
make cli_wallet
sudo shutdown -h now
```
