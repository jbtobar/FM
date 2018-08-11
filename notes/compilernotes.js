

function argsarr_to_hex (hashfunc, arr) {
  let hash = hashfunc;
  if (hash.length !== 8) {
    console.log('ERROR: hash == "' + hash + '" : hash.length == ', hash.length, ' !== 8');
    reutrn;
  }
  let hex_call = hash.match(/.{1,2}/g).reverse().join('');
  let varg = Array();
  for (let el of arr) {
    if (el.type.substr(0,4) != "uint" && el.type.substr(0,3) != "int") {
      alert('Unsupported type for call: "' + el.type + '"');
      return;
    }
    let bitsize = Number(el.type[0] == 'u' ? el.type.substr(4): el.type.substr(3));
    if (bitsize < 8 || bitsize > 256) {
      console.log('ERROR: type == "' + el.type + '" : bitsize == ', bitsize, ' (<8 || >256)');
      return;
    }
    let val = Number(el.value).toString(16);
    if (val.length%2) {
      val = ['0',val].join('');
    }
    val = val.match(/.{1,2}/g).reverse().join('');
    if (val.length > (bitsize>>2)) {
      console.log('ERROR: type == "' + el.type + '" : val.length == ' + val.length + ' : bitsize == ' + bitsize + ' : val.length > (bitsize>>2)');
      return;
    }
    for (let j = val.length; j < (bitsize>>2); j += 2) {
      val += '00';
    }
    varg.push(val);
    console.log(val);
  }
  hex_call += varg.reverse().join('');
  return hex_call;
}

function execute_contract_post (contr_accname, hash, arr) {
  let exfunc = argsarr_to_hex (hash, arr);
  console.log('exfunc == "' + exfunc + '"');

  fetch('/execute_contract', {
    method: 'post',
    body: 'contract_account_name=' + encodeURIComponent(contr_accname) + '&args=' + encodeURIComponent(exfunc),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-XSRF-TOKEN": "tUYx0nxN-MuAU7ZrzBRVO4EeLzws7kArRRNk"
    },
    credentials: 'include',
  })
  .then((response) => {
    if (response.status !== 200) {
      console.log('response.status == ' + response.status);
      return;
    }
    return response.text();
  })
  .then((text) => {
    console.log('text: ', text)
    let div = document.createElement('div');
    div.style.border='1px solid rgba(0,0,0,0.5)';
    div.style.fontSize='medium';
    div.style.fontFamily='monospace';
    div.style.wordWrap='break-word';
    div.innerHTML = text.replace(/\n/g, '<br>');
    document.getElementById('output').appendChild(div);
  })
  .catch((err) => {console.log('error: "' + err + '"')});
}

function contract_call_post (contr_accname, hash, arr) {
  let hex_call = argsarr_to_hex (hash, arr);
  console.log('hex_call == "' + hex_call + '"');

  fetch('/call_contract', {
    method: 'post',
    body: 'contract_account_name=' + encodeURIComponent(contr_accname) + '&hex_call=' + encodeURIComponent(hex_call),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-XSRF-TOKEN": "tUYx0nxN-MuAU7ZrzBRVO4EeLzws7kArRRNk"
    },
    credentials: 'include',
  })
  .then((response) => {
    if (response.status !== 200) {
      console.log('response.status == ' + response.status);
      return;
    }
    return response.text();
  })
  .then((text) => {
    console.log('text: ', text)
    let div = document.createElement('div');
    div.style.border='1px solid rgba(0,0,0,0.5)';
    div.style.fontSize='medium';
    div.style.fontFamily='monospace';
    div.style.wordWrap='break-word';
    div.innerHTML = text.replace(/\n/g, '<br>');
    document.getElementById('output').appendChild(div);
  })
  .catch((err) => {console.log('error: "' + err + '"')});
}

function deploy() {
  let accname = document.getElementById('deploy_accname').value.trim();
  if (accname.split(' ').length != 1) {
    alert("contract's account name should not contain free space");
    return;
  }
  console.log(accname);

  fetch('/create_contract', {
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-XSRF-TOKEN": "tUYx0nxN-MuAU7ZrzBRVO4EeLzws7kArRRNk"
    },
    credentials: 'include',
    body: 'contract_account_name=' + encodeURIComponent(accname) + '&opcode=' + encodeURIComponent(' : Temp::_  STG_KEY_PREFIX_GET ,o RAMP 7 -  1886217556 ,  1701738351 ,  114 ,  44 SWAP RAMP 1 + 8 ALLOT SHA3FIPS RAMP 7 - @o -19 ALLOT  ,o  0 0 0 0 0 0 0 0 RAMP 7 - !oSTG  RAMP 7 - @o 1 0 0 0 0 0 0 0 +o ,o 0 0 0 0 0 0 0 0 RAMP 7 - !oSTG -8 ALLOT  STG_KEY_PREFIX_GET ,o RAMP 7 -  1886217556 ,  12644 ,  40 SWAP RAMP 1 + 8 ALLOT SHA3FIPS RAMP 7 - @o -18 ALLOT  ,o  96 0 RAMP 7 - SET_STG_BYTE_BY_BYTE  STG_KEY_PREFIX_GET ,o RAMP 7 -  1886217556 ,  7500385 ,  40 SWAP RAMP 1 + 8 ALLOT SHA3FIPS RAMP 7 - @o -18 ALLOT  ,o 0 0 0 0 0 0 0 0 RAMP 7 - !oSTG  STG_KEY_PREFIX_GET ,o RAMP 7 -  1886217556 ,  1920098660 ,  40 SWAP RAMP 1 + 8 ALLOT SHA3FIPS RAMP 7 - @o -18 ALLOT  ,o 0 0 0 0 0 0 0 0 RAMP 7 - !oSTG  STG_KEY_PREFIX_GET ,o RAMP 7 -  1886217556 ,  7364973 ,  40 SWAP RAMP 1 + 8 ALLOT SHA3FIPS RAMP 7 - @o -18 ALLOT  ,o 0 0 0 0 0 0 0 0 RAMP 7 - !oSTG  0 0 0 0 0 0 0 0 ,o  ;  : func_25c93d9c  RAMP 1 + Temp::_ , TRANSFER_IN_GET_ADDR 45 RAMP @ MOVE_FROM_DS_TO_STG 255 0 0 0 0 0 0 0 RAMP @ 8 + @o !oSTG_BY_FULLKEY_IN_DS 8191 0 0 0 0 0 0 0 RAMP @ 8 + @o 1 0 0 0 0 0 0 0 +o !oSTG_BY_FULLKEY_IN_DS 12 0 0 0 0 0 0 0 RAMP @ 8 + @o 2 0 0 0 0 0 0 0 +o ,o RAMP 7 - @oSTG DROP DUPo 0 0 0 0 0 0 0 0 <>o JMPC+9 DROPo VIRTUAL_CALL STGALLOCATOR DUPo RAMP 7 - !oSTG -8 ALLOT !oSTG_BY_FULLKEY_IN_DS 0 , RAMP @ CONVERT_32U_256 12 0 0 0 0 0 0 0 <oU BOOLNOT JMPC+57 RAMP @ CONVERT_32U_256 RAMP @ CONVERT_32U_256 RAMP 1 - @ 8 + @o 2 0 0 0 0 0 0 0 +o @oSTG_BY_FULLKEY_IN_DS DROP DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE 1 0 0 0 0 0 0 0 +o +o !oSTG_BY_FULLKEY_IN_DS 1 RAMP +! JMP-69 10 0 0 0 0 0 0 0 RAMP 1 - @ 16 + DUP @o 0 0 0 0 0 0 0 0 <>o JMPC+7 DUP VIRTUAL_CALL STGALLOCATOR 9 ROLL !o !oSTG 0 0 0 0 0 0 0 0 CONVERT_256U_32 RAMP ! RAMP @ CONVERT_32U_256 10 0 0 0 0 0 0 0 <oU BOOLNOT JMPC+46 RAMP @ CONVERT_32U_256 RAMP @ CONVERT_32U_256 RAMP 1 - @ 16 + @o DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE 1 0 0 0 0 0 0 0 +o +o !oSTG_BY_FULLKEY_IN_DS 1 RAMP +! JMP-58 5 0 0 0 0 0 0 0 RAMP 1 - @ 24 + DUP @o 0 0 0 0 0 0 0 0 <>o JMPC+7 DUP VIRTUAL_CALL STGALLOCATOR 9 ROLL !o !oSTG 0 0 0 0 0 0 0 0 CONVERT_256U_32 RAMP ! RAMP @ CONVERT_32U_256 5 0 0 0 0 0 0 0 <oU BOOLNOT JMPC+213 10 0 0 0 0 0 0 0 RAMP @ CONVERT_32U_256 RAMP 1 - @ 24 + @o DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU 1 0 0 0 0 0 0 0 +o +o 2 0 0 0 0 0 0 0 +o ,o RAMP 7 - @oSTG DROP DUPo 0 0 0 0 0 0 0 0 <>o JMPC+9 DROPo VIRTUAL_CALL STGALLOCATOR DUPo RAMP 7 - !oSTG -8 ALLOT !oSTG_BY_FULLKEY_IN_DS 0 , RAMP @ CONVERT_32U_256 10 0 0 0 0 0 0 0 <oU BOOLNOT JMPC+99 RAMP @ CONVERT_32U_256 RAMP @ CONVERT_32U_256 RAMP 1 - @ CONVERT_32U_256 RAMP 2 - @ 24 + @o DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU 1 0 0 0 0 0 0 0 +o +o 2 0 0 0 0 0 0 0 +o @oSTG_BY_FULLKEY_IN_DS DROP DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE 1 0 0 0 0 0 0 0 +o +o !oSTG_BY_FULLKEY_IN_DS 1 RAMP +! JMP-111 -1 ALLOT 1 RAMP +! JMP-225 -1 ALLOT -1 ALLOT ;  : func_aacabc0b     RAMP  @ 8 +  @oSTG DROP   RAMP 8 -  !o   -1 ALLOT RET  -1 ALLOT ;  : func_290fcbba     RAMP  @ 8 +  @o 1 0 0 0 0 0 0 0 +o @oSTG_BY_FULLKEY_IN_DS DROP   RAMP 8 -  !o   -1 ALLOT RET  -1 ALLOT ;  : func_c064bb6e  RAMP @ @addressSTG DROP   TRANSFER_IN_GET_ADDR  =address  BOOLNOT JMPC+11   RAMP 8 - @o    RAMP  @ 8 +   @o  !oSTG_BY_FULLKEY_IN_DS  -9 ALLOT ;  : func_15f498d9  RAMP @ @addressSTG DROP   TRANSFER_IN_GET_ADDR  =address  BOOLNOT JMPC+20   RAMP 8 - @o    RAMP  @ 8 +   @o 1 0 0 0 0 0 0 0 +o  !oSTG_BY_FULLKEY_IN_DS  -9 ALLOT ;  : func_32a3d07f     RAMP  @ 8 +  @oSTG DROP   RAMP 16 -  !o      RAMP  @ 8 +  @o 1 0 0 0 0 0 0 0 +o @oSTG_BY_FULLKEY_IN_DS DROP   RAMP 8 -  !o   -1 ALLOT RET  -1 ALLOT ;  : func_33af98a0  RAMP @ @addressSTG DROP   TRANSFER_IN_GET_ADDR  =address  BOOLNOT JMPC+42   RAMP 16 - @o    RAMP 8 - @o   RAMP @ 16 + @o   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE  1 0 0 0 0 0 0 0 +o +o  !oSTG_BY_FULLKEY_IN_DS  -17 ALLOT ;  : func_862b4218     RAMP 8 - @o   RAMP @ 16 + @o   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE  1 0 0 0 0 0 0 0 +o +o  @oSTG_BY_FULLKEY_IN_DS CHECK_STATE   RAMP 16 -  !o   -9 ALLOT RET  -9 ALLOT ;  : func_13b5faac  RAMP @ @addressSTG DROP   TRANSFER_IN_GET_ADDR  =address  BOOLNOT JMPC+53   RAMP 16 - @o    RAMP 8 - @o    RAMP  @ 8 +  @o 2 0 0 0 0 0 0 0 +o @oSTG_BY_FULLKEY_IN_DS DROP   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE  1 0 0 0 0 0 0 0 +o +o  !oSTG_BY_FULLKEY_IN_DS  -17 ALLOT ;  : func_0ec9016d    RAMP 8 - @o    RAMP  @ 8 +  @o 2 0 0 0 0 0 0 0 +o @oSTG_BY_FULLKEY_IN_DS DROP   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE  1 0 0 0 0 0 0 0 +o +o  @oSTG_BY_FULLKEY_IN_DS CHECK_STATE   RAMP 16 -  !o  -9 ALLOT ;  : func_9da7c67a  RAMP @ @addressSTG DROP   TRANSFER_IN_GET_ADDR  =address  BOOLNOT JMPC+205   RAMP 16 - @o     RAMP 8 - @o   RAMP @ 24 + @o   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o   !oSTG_BY_FULLKEY_IN_DS   RAMP 24 - @o     RAMP 8 - @o   RAMP @ 24 + @o   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o  1 0 0 0 0 0 0 0 +o  !oSTG_BY_FULLKEY_IN_DS   RAMP 40 - @o    RAMP 32 - @o     RAMP 8 - @o   RAMP @ 24 + @o   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o 2 0 0 0 0 0 0 0 +o @oSTG_BY_FULLKEY_IN_DS DROP   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE  1 0 0 0 0 0 0 0 +o +o  !oSTG_BY_FULLKEY_IN_DS  -41 ALLOT ;  : func_5b803142      RAMP 8 - @o   RAMP @ 24 + @o   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o  @oSTG_BY_FULLKEY_IN_DS DROP   RAMP 40 -  !o       RAMP 8 - @o   RAMP @ 24 + @o   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o 1 0 0 0 0 0 0 0 +o @oSTG_BY_FULLKEY_IN_DS DROP   RAMP 32 -  !o      RAMP 16 - @o     RAMP 8 - @o   RAMP @ 24 + @o   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o 2 0 0 0 0 0 0 0 +o @oSTG_BY_FULLKEY_IN_DS DROP   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE  1 0 0 0 0 0 0 0 +o +o  @oSTG_BY_FULLKEY_IN_DS CHECK_STATE   RAMP 24 -  !o   -17 ALLOT RET  -17 ALLOT ;  : func_b739ba6a      RAMP 16 - @o     RAMP 8 - @o   RAMP @ 32 +  DUP , 8 + !o 64 RAMP @ RAMP 7 ALLOT SHA3FIPS RAMP 7 - @o -8 ALLOT   ,o 32 RAMP 7 - COPY_FROM_STG_TO_DS -8 ALLOT   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o  @oSTG_BY_FULLKEY_IN_DS DROP   RAMP 48 -  !o       RAMP 16 - @o     RAMP 8 - @o   RAMP @ 32 +  DUP , 8 + !o 64 RAMP @ RAMP 7 ALLOT SHA3FIPS RAMP 7 - @o -8 ALLOT   ,o 32 RAMP 7 - COPY_FROM_STG_TO_DS -8 ALLOT   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o 1 0 0 0 0 0 0 0 +o @oSTG_BY_FULLKEY_IN_DS DROP   RAMP 40 -  !o      RAMP 24 - @o     RAMP 16 - @o     RAMP 8 - @o   RAMP @ 32 +  DUP , 8 + !o 64 RAMP @ RAMP 7 ALLOT SHA3FIPS RAMP 7 - @o -8 ALLOT   ,o 32 RAMP 7 - COPY_FROM_STG_TO_DS -8 ALLOT   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o 2 0 0 0 0 0 0 0 +o @oSTG_BY_FULLKEY_IN_DS DROP   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE  1 0 0 0 0 0 0 0 +o +o  @oSTG_BY_FULLKEY_IN_DS CHECK_STATE   RAMP 32 -  !o   -25 ALLOT RET  -25 ALLOT ;  : func_5538ca44   RAMP 16 - @o      RAMP 8 - @o   RAMP @ 32 +  DUP , 8 + !o 64 RAMP @ RAMP 7 ALLOT SHA3FIPS RAMP 7 - @o -8 ALLOT   ,o RAMP 7 - @oSTG DROP DUPo 0 0 0 0 0 0 0 0 <>o JMPC+9 DROPo VIRTUAL_CALL STGALLOCATOR DUPo RAMP 7 - !oSTG -8 ALLOT  !oSTG_BY_FULLKEY_IN_DS  -17 ALLOT ;  : func_ce425a80   RAMP 24 - @o      RAMP 16 - @o     RAMP 8 - @o   RAMP @ 32 +  DUP , 8 + !o 64 RAMP @ RAMP 7 ALLOT SHA3FIPS RAMP 7 - @o -8 ALLOT   ,o 32 RAMP 7 - COPY_FROM_STG_TO_DS -8 ALLOT   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o  2 0 0 0 0 0 0 0 +o  ,o RAMP 7 - @oSTG DROP DUPo 0 0 0 0 0 0 0 0 <>o JMPC+9 DROPo VIRTUAL_CALL STGALLOCATOR DUPo RAMP 7 - !oSTG -8 ALLOT  !oSTG_BY_FULLKEY_IN_DS  -25 ALLOT ;  : func_8604fc8f   RAMP 24 - @o     RAMP 16 - @o     RAMP 8 - @o   RAMP @ 32 +  DUP , 8 + !o 64 RAMP @ RAMP 7 ALLOT SHA3FIPS RAMP 7 - @o -8 ALLOT   ,o 32 RAMP 7 - COPY_FROM_STG_TO_DS -8 ALLOT   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o   !oSTG_BY_FULLKEY_IN_DS   RAMP 32 - @o     RAMP 16 - @o     RAMP 8 - @o   RAMP @ 32 +  DUP , 8 + !o 64 RAMP @ RAMP 7 ALLOT SHA3FIPS RAMP 7 - @o -8 ALLOT   ,o 32 RAMP 7 - COPY_FROM_STG_TO_DS -8 ALLOT   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o  1 0 0 0 0 0 0 0 +o  !oSTG_BY_FULLKEY_IN_DS   RAMP 48 - @o    RAMP 40 - @o     RAMP 16 - @o     RAMP 8 - @o   RAMP @ 32 +  DUP , 8 + !o 64 RAMP @ RAMP 7 ALLOT SHA3FIPS RAMP 7 - @o -8 ALLOT   ,o 32 RAMP 7 - COPY_FROM_STG_TO_DS -8 ALLOT   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE SWAPo 3 0 0 0 0 0 0 0 *oU  1 0 0 0 0 0 0 0 +o +o 2 0 0 0 0 0 0 0 +o @oSTG_BY_FULLKEY_IN_DS DROP   DUPo 0 0 0 0 0 0 0 0 <>o CHECK_STATE OVERoo OVERoo @oSTG_BY_FULLKEY_IN_DS CHECK_STATE <oU CHECK_STATE  1 0 0 0 0 0 0 0 +o +o  !oSTG_BY_FULLKEY_IN_DS  -49 ALLOT ;  : RESPEXTCALL OVER @ROM 1 >=S CHECK_STATE OVER 1 + @ROM  DUP 0xaacabc0b <> JMPC+33  DROP OVER DUP @ROM 1 - 0 = CHECK_STATE  RAMP  0  0  0  0  0  0  0  0  ,o  RAMP SWAP DUP 1 + SETRETDATA_ADDR - SETRETDATA_SIZE  DROP DUP , func_aacabc0b JMP+530  DUP 0x290fcbba <> JMPC+33  DROP OVER DUP @ROM 1 - 0 = CHECK_STATE  RAMP  0  0  0  0  0  0  0  0  ,o  RAMP SWAP DUP 1 + SETRETDATA_ADDR - SETRETDATA_SIZE  DROP DUP , func_290fcbba JMP+494  DUP 0xc064bb6e <> JMPC+26  DROP OVER DUP @ROM 1 - 8 = CHECK_STATE  0 SETRETDATA_SIZE 8 SWAP 2 + RAMP 1 + 8 ALLOT COPYROM2RAM DUP , func_c064bb6e JMP+465  DUP 0x15f498d9 <> JMPC+26  DROP OVER DUP @ROM 1 - 8 = CHECK_STATE  0 SETRETDATA_SIZE 8 SWAP 2 + RAMP 1 + 8 ALLOT COPYROM2RAM DUP , func_15f498d9 JMP+436  DUP 0x32a3d07f <> JMPC+42  DROP OVER DUP @ROM 1 - 0 = CHECK_STATE  RAMP  0  0  0  0  0  0  0  0  ,o  0  0  0  0  0  0  0  0  ,o  RAMP SWAP DUP 1 + SETRETDATA_ADDR - SETRETDATA_SIZE  DROP DUP , func_32a3d07f JMP+391  DUP 0x33af98a0 <> JMPC+26  DROP OVER DUP @ROM 1 - 16 = CHECK_STATE  0 SETRETDATA_SIZE 16 SWAP 2 + RAMP 1 + 16 ALLOT COPYROM2RAM DUP , func_33af98a0 JMP+362  DUP 0x862b4218 <> JMPC+42  DROP OVER DUP @ROM 1 - 8 = CHECK_STATE  RAMP  0  0  0  0  0  0  0  0  ,o  RAMP SWAP DUP 1 + SETRETDATA_ADDR - SETRETDATA_SIZE 8 SWAP 2 + RAMP 1 + 8 ALLOT COPYROM2RAM DUP , func_862b4218 JMP+317  DUP 0x13b5faac <> JMPC+26  DROP OVER DUP @ROM 1 - 16 = CHECK_STATE  0 SETRETDATA_SIZE 16 SWAP 2 + RAMP 1 + 16 ALLOT COPYROM2RAM DUP , func_13b5faac JMP+288  DUP 0x0ec9016d <> JMPC+42  DROP OVER DUP @ROM 1 - 8 = CHECK_STATE  RAMP  0  0  0  0  0  0  0  0  ,o  RAMP SWAP DUP 1 + SETRETDATA_ADDR - SETRETDATA_SIZE 8 SWAP 2 + RAMP 1 + 8 ALLOT COPYROM2RAM DUP , func_0ec9016d JMP+243  DUP 0x9da7c67a <> JMPC+26  DROP OVER DUP @ROM 1 - 40 = CHECK_STATE  0 SETRETDATA_SIZE 40 SWAP 2 + RAMP 1 + 40 ALLOT COPYROM2RAM DUP , func_9da7c67a JMP+214  DUP 0x5b803142 <> JMPC+60  DROP OVER DUP @ROM 1 - 16 = CHECK_STATE  RAMP  0  0  0  0  0  0  0  0  ,o  0  0  0  0  0  0  0  0  ,o  0  0  0  0  0  0  0  0  ,o  RAMP SWAP DUP 1 + SETRETDATA_ADDR - SETRETDATA_SIZE 16 SWAP 2 + RAMP 1 + 16 ALLOT COPYROM2RAM DUP , func_5b803142 JMP+151  DUP 0xb739ba6a <> JMPC+60  DROP OVER DUP @ROM 1 - 24 = CHECK_STATE  RAMP  0  0  0  0  0  0  0  0  ,o  0  0  0  0  0  0  0  0  ,o  0  0  0  0  0  0  0  0  ,o  RAMP SWAP DUP 1 + SETRETDATA_ADDR - SETRETDATA_SIZE 24 SWAP 2 + RAMP 1 + 24 ALLOT COPYROM2RAM DUP , func_b739ba6a JMP+88  DUP 0x5538ca44 <> JMPC+26  DROP OVER DUP @ROM 1 - 16 = CHECK_STATE  0 SETRETDATA_SIZE 16 SWAP 2 + RAMP 1 + 16 ALLOT COPYROM2RAM DUP , func_5538ca44 JMP+59  DUP 0xce425a80 <> JMPC+26  DROP OVER DUP @ROM 1 - 24 = CHECK_STATE  0 SETRETDATA_SIZE 24 SWAP 2 + RAMP 1 + 24 ALLOT COPYROM2RAM DUP , func_ce425a80 JMP+30  DUP 0x8604fc8f <> JMPC+26  DROP OVER DUP @ROM 1 - 48 = CHECK_STATE  0 SETRETDATA_SIZE 48 SWAP 2 + RAMP 1 + 48 ALLOT COPYROM2RAM DUP , func_8604fc8f JMP+1  ;  : STGALLOCATOR 0 @oSTG DROP 1 0 0 0 0 0 0 0 +o ,o 0 RAMP 7 - STG_SET 8 @o ,o 8 ALLOT 64 RAMP 23 - RAMP 7 - SHA3FIPS RAMP 7 - @o -24 ALLOT ;  1 0 0 0 0 0 0 0  ,o  0x25c9  0x3d9c  0x1381  0x02ad  0x5fe3  0x7881  0x8f4b  0x537f  ,o  0 RAMP 1 + func_25c93d9c SUSPEND RESPEXTCALL ')
  })
  .then((response) => {
    if (response.status !== 200) {
      console.log('response.status == ', response.status);
      return;
    }
    return response.text();
  })
  .then((text) => {
    if (text === undefined) return;
    console.log(text);
    let div = document.createElement('div');
    div.style.border='1px solid rgba(0,0,0,0.5)';
    div.style.fontSize='medium';
    div.style.fontFamily='monospace';
    div.style.wordWrap='break-word';
    div.innerHTML = text.replace(/\n/g, '<br>');
    document.getElementById('output').appendChild(div);
  })
  .catch((err) => {console.log('error: "' + err + '"')});
}
