пример скрипта:
#script.sh
#!/bin/bash
echo "unlock dionysus"
echo call_contract "contract004" ""
sleep 3
#EOF

script.sh | cli_wallet
