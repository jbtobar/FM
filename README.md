# FM
FM-test-me-hard

## Running Notes
#### Building
```
git clone git@github.com:arrayio/array-io-core.git
cd array-io-core
git submodule update --init --recursive
cmake -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl -DOPENSSL_LIBRARIES=/usr/local/opt/openssl/lib -DBOOST_ROOT=/usr/local/opt/boost@1.67 -DOPENSSL_INCLUDE_DIR=/usr/local/opt/openssl/include .
make cli_wallet
```
#### Running
```
./programs/cli_wallet/cli_wallet --wallet-file=wallet.json --chain-id b6b83a593686087531ce581540564d20b2f75ff9879e9dd2eccfa9a79744b949 -sws://hawking.array.io:8090/ws
```
#### CLI
```
Please use the set_password method to initialize a new wallet before continuing
new >>> set_password dionysus
locked >>> unlock dionysus
unlocked >>> import_key "nathan" 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
1897064ms th_a       wallet.cpp:790                save_wallet_file     ] saving wallet to file wallet.json
1897074ms th_a       wallet.cpp:466                copy_wallet_file     ] backing up wallet wallet.json to after-import-key-9407629b.wallet
true
unlocked >>> list_my_accounts
[{
    "id": "1.2.27",
    "name": "nathan",
    "owner": {
      "weight_threshold": 1,
      "account_auths": [],
      "key_auths": [[
          "RAY6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
          1
        ]
      ],
      "address_auths": []
    },
    "active": {
      "weight_threshold": 1,
      "account_auths": [],
      "key_auths": [[
          "RAY6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
          1
        ]
      ],
      "address_auths": []
    },
    "options": {
      "memo_key": "RAY6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
      "voting_account": "1.2.5",
      "num_witness": 0,
      "num_committee": 0,
      "votes": [],
      "extensions": []
    },
    "statistics": "2.5.27",
    "whitelisting_accounts": [],
    "blacklisting_accounts": [],
    "whitelisted_accounts": [],
    "blacklisted_accounts": [],
    "owner_special_authority": [
      0,{}
    ],
    "active_special_authority": [
      0,{}
    ],
    "top_n_control_flags": 0
  }
]

unlocked >>> list_account_balances nathan
7999977801.57221 RAY
```


## Questions

- [ ] What commands take us from solidity file to `unlocked >>> create_contract "tempok" "nathan"` ?
- [ ] Do I have to `set_password` to initialize new account every time or can I unlock it via CL?


# solc
```
brew update
brew upgrade
brew tap ethereum/ethereum
brew install solidity
```

# compile
```
solc --ast-json ./contracts/Tempo.sol -o ./output
```

# from compiler.array.io
```
output:
/opt/solc/bin/solc --ast-json /tmp/gw_input -o ./

solc call has been done
/opt/solc_compiler/build/solc_parser --ast-json "gw_input_json.ast" --contractname "Temp"

```
# to get solc_parser
```
git clone array-io-fm
cd array-io-fm
cd solc_compiler
cmake .
make
```
below is wrong
```
$ git clone https://github.com/juj/emsdk.git
$ cd emsdk
$ ./emsdk install latest
$ ./emsdk activate latest
```




# create_contract
```
unlocked >>> gethelp create_contract

usage: create_contract ACCOUNT_NAME REGISTRAR CODE ARGS [[optname,optval],[optname,optval]] GASLIMIT BROADCAST

example: create_contract "newaccount" "1.3.11" "_bytecode_" "args" [[library,true],[includable,false],[asset,FTS]] 100000 true
example: create_contract "newaccount" "someaccount" %_filename_ "args" [] 100000 true

This method should be used if you would like the wallet to create new smart contract account and set its code
```




# Mac
```
ls /usr/local/Cellar/openssl@1.1


cmake -I/usr/local/opt/openssl@1.1/include -L/usr/local/opt/openssl@1.1/lib ..
-I/usr/local/opt/openssl@1.1/include -L/usr/local/opt/openssl@1.1/lib
cmake -DOPENSSL_ROOT_DIR=/usr/local/Cellar/openssl@1.1/1.1.0h -DOPENSSL_LIBRARIES=/usr/local/Cellar/openssl@1.1/1.1.0h/lib -DOPENSSL_INCLUDE_DIR=/usr/local/Cellar/openssl@1.1/1.1.0h/include ..

```

# ON UBUNTU

```
cd /usr/local/src/
wget https://www.openssl.org/source/openssl-1.1.0g.tar.gz
tar -xf openssl-1.1.0g.tar.gz
cd openssl-1.1.0g

./config --prefix=/usr/local/openssl --openssldir=/usr/local/openssl
make
sudo make install


cmake -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl -DOPENSSL_LIBRARIES=/usr/local/opt/openssl/lib -DOPENSSL_INCLUDE_DIR=/usr/local/opt/openssl/include .
```
# Crazy stuff
Error:
```
/home/jbt/array/array-io-core/libraries/chain/IFMHostImpl.cpp:238:59: error: expected ‘,’ before ‘)’ token
     static_assert(sizeof(taddr.addr._hash) == sizeof(addr));
                                                           ^
/home/jbt/array/array-io-core/libraries/chain/IFMHostImpl.cpp:238:59: error: expected string-literal before ‘)’ token
```
```
...
bool IFMHostImpl::env_map_address(const TAddr& addr, TAccountID& account, bool *create)
{
    address taddr;
    static_assert(sizeof(taddr.addr._hash) == sizeof(addr));
    memcpy(taddr.addr._hash, addr.data(), sizeof(taddr.addr._hash));
...
```
to
```
...
bool IFMHostImpl::env_map_address(const TAddr& addr, TAccountID& account, bool *create)
{
    address taddr;
    static_assert(sizeof(taddr.addr._hash) == sizeof(addr), "Not sure what this will do...");
    memcpy(taddr.addr._hash, addr.data(), sizeof(taddr.addr._hash));

    const auto& idx = m_d.get_index_type<account_index>();
    const auto& aidx = dynamic_cast<const primary_index<account_index>&>(idx);

...
```




 <!--
 ```
  ./cli_wallet --wallet-file=wallet.json --chain-id f01c1dd6d160afdb58150b9185325bde9cb79fa833a35f177d196dec0348785a -sws://hawking.array.io:8090/ws
  ```

  b6b83a593686087531ce581540564d20b2f75ff9879e9dd2eccfa9a79744b949

  ```
  ./cli_wallet --wallet-file=wallet.json --chain-id b6b83a593686087531ce581540564d20b2f75ff9879e9dd2eccfa9a79744b949 -sws://hawking.array.io:8090/ws
  ```


  hawking.array.io
  newton.array.io



 cmake -DBOOST_ROOT=/usr/local/opt/boost@1.60 -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl@1.1 -DCMAKE_BUILD_TYPE=RelWithDebInfo .

  cmake -DBOOST_ROOT=/usr/local/opt/boost -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl -DCMAKE_BUILD_TYPE=RelWithDebInfo .


 cmake -DBOOST_ROOT=/usr/local/opt/boost@1.1 -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl -DCMAKE_BUILD_TYPE=RelWithDebInfo .


 -- OPENSSL_LIBRARIES = /usr/local/lib/libssl.a;/usr/local/lib/libcrypto.a
-- OPENSSL_VERSION = 1.1.1

  1.1


cmake -DOPENSSL_LIBRARIES = /usr/local/lib/libssl.a;/usr/local/lib/libcrypto.a -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl@1.1

cmake -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl@1.1 -DOPENSSL_LIBRARIES=/usr/local/opt/openssl@1.1/lib  -DBOOST_ROOT=/usr/local/opt/boost@1.67 .


cmake -DBOOST_ROOT=/usr/local/opt/boost@1.60 -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl .





-DOPENSSL_ROOT_DIR=/usr/local/ssl -DOPENSSL_LIBRARIES=/usr/local/ssl/lib

 -->
