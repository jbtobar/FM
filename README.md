# FM
FM-test-me-hard


```
git clone git@github.com:arrayio/array-io-core.git
cd array-io-core
git submodule update --init --recursive
cmake -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl -DOPENSSL_LIBRARIES=/usr/local/opt/openssl/lib -DBOOST_ROOT=/usr/local/opt/boost@1.67 -DOPENSSL_INCLUDE_DIR=/usr/local/opt/openssl/include .
make cli_wallet
```
```
./programs/cli_wallet/cli_wallet --wallet-file=wallet.json --chain-id b6b83a593686087531ce581540564d20b2f75ff9879e9dd2eccfa9a79744b949 -sws://hawking.array.io:8090/ws
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
