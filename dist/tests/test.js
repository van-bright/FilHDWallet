"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
// const InfuraProjectSetting = require("./.env.json");
const mnemonic = 'slight notable hurry swift remind jewel sick flip joke post story mammal';
const FaucetAccount = 't1snqk3fn2xxcae4asvdgazjbpkv4u4beyhjx2saa';
const to = 't1vvgddutcmxhx2hmokm7yqqrq3cabmfqhwxp72mi';
const MainNetEndPoint = "https://api.node.glif.io/rpc/v0";
const CalibrationEndPoint = "https://calibration.node.glif.io";
// const InfuraFil = `https://${InfuraProjectSetting.ProjectId}:${InfuraProjectSetting.ProjectSecret}@filecoin.infura.io`;
const filWallet = new __1.FilHDWallet({ url: MainNetEndPoint }, __1.FilHDWallet.MainNetHDPath, mnemonic);
// const filWallet = new FilHDWallet({ url: MainNetEndPoint}, FilHDWallet.TestNetHDPath, mnemonic);
filWallet.newAddress().then(addr => { console.log("new address : ", addr); }).catch(e => console.log(e));
// filWallet.balanceOf(FaucetAccount).then(balance => {console.log("balance : ", balance)}).catch(e => console.log(e));
// filWallet.getHead().then(balance => {console.log("blocknumber : ", balance.Height)}).catch(e => console.log(e));
// filWallet.transfer(FaucetAccount, to, new BigNumber('1000000000')).then(txs => {console.log("mined : ", txs)}).catch(e => console.log('error: ', e));
// filWallet.listTransactions(FaucetAccount).then(txs => {console.log("txs : ", txs)}).catch(e => console.log('error: ', e));
//# sourceMappingURL=test.js.map