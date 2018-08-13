```
jbt@stella:~/array$ ./array-io-core/build/programs/cli_wallet/cli_wallet --wallet-file=wallet.json --chain-id b6b83a593686087531ce581540564d20b2f75ff9879e9dd2eccfa9a79744b949 -sws://hawking.array.io:8090/ws
Logging RPC to file: logs/rpc/rpc.log
3379051ms th_a       main.cpp:120                  main                 ] key_to_wif( committee_private_key ): 5KCBDTcyDqzsqehcb52tW5nU6pXife6V2rX9Yf7c3saYSzbDZ5W
3379051ms th_a       main.cpp:124                  main                 ] nathan_pub_key: RAY6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
3379051ms th_a       main.cpp:125                  main                 ] key_to_wif( nathan_private_key ): 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
Starting a new wallet with chain ID b6b83a593686087531ce581540564d20b2f75ff9879e9dd2eccfa9a79744b949 (from CLI)
3379051ms th_a       main.cpp:172                  main                 ] wdata.ws_server: ws://hawking.array.io:8090/ws
3379995ms th_a       main.cpp:177                  main                 ] wdata.ws_user:  wdata.ws_password:
Please use the set_password method to initialize a new wallet before continuing
new >>> set_password dionysus
set_password dionysus
null
locked >>> unlock dionysus
unlock dionysus
null
unlocked >>> import_key "nathan" 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
import_key "nathan" 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
3426758ms th_a       wallet.cpp:790                save_wallet_file     ] saving wallet to file wallet.json
3426758ms th_a       wallet.cpp:466                copy_wallet_file     ] backing up wallet wallet.json to after-import-key-9407629b.wallet
true
unlocked >>> list_my_accounts
list_my_accounts
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
list_account_balances nathan
7999967386.82327 RAY

unlocked >>>
```
