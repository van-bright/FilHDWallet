import BigNumber from "bignumber.js";
import { FilHDWallet } from "..";

const mnemonic = 'slight notable hurry swift remind jewel sick flip joke post story mammal';
const FaucetAccount = 't1snqk3fn2xxcae4asvdgazjbpkv4u4beyhjx2saa';
const FaucetAccountPrivateKey = '71f899c638051dd2b38f32b0225a0557bf39e35d6159ab1e642c39070a3a3e6c';

const to = 't1vvgddutcmxhx2hmokm7yqqrq3cabmfqhwxp72mi';
const CalibrationEndPoint = "https://calibration.node.glif.io";

(async () => {
  // 导入一组助记词
  // const wallet = new FilHDWallet({url: CalibrationEndPoint/*, token: _YOUR_TOKEN_IF_ENDPOINT_NEEDS_ */}, mnemonic);

  // 重新创建一组助记词及HDWallet
  const wallet = new FilHDWallet({url: CalibrationEndPoint/*, token: _YOUR_TOKEN_IF_ENDPOINT_NEEDS_ */});

  // 导出助记词
  const mns = wallet.exportMnemonic();
  console.log("mnemonics: ", mns);

  // defaultAddress is FaucetAccount, which has test token on CalibrationEndPoint
  const defaultAddress = await wallet.getDefaultAddress();

  // 创建新账号, 并导出私钥
  const newAddress = await wallet.newAddress();
  const newPrivateKey = await wallet.exportPrivateKey(newAddress);
  console.log("new address: ", newAddress, " pk: ", newPrivateKey);

  // 列出所有账号
  let allAddress = await wallet.getAddresses();
  console.log("all address in wallet: ", allAddress);

  // 查询账户是否存在
  const isexist = await wallet.hasAddress(newAddress);
  console.log("is account exist: ", isexist);

  // 删除账号
  await wallet.deleteAddress(newAddress);

  allAddress = await wallet.getAddresses();
  console.log("now all address in wallet: ", allAddress);

  // 查询余额
  let balance = await wallet.balanceOf(defaultAddress);
  console.log("balance is : ", balance);

  // 转账操作
  const receipt = await wallet.transfer(FaucetAccount, to, new BigNumber('10000000'), FaucetAccountPrivateKey);
  console.log("transfer tx send out: ", receipt);

  balance = await wallet.balanceOf(FaucetAccount);
  console.log("after transfer, balance is : ", balance);

  // 从指定块高开始查询交易信息
  const blocknum = (await wallet.getHead()).Height;
  const txs = await wallet.listTransactions(FaucetAccount, blocknum - 1000);
  console.log("all messages: ", txs);

})().then(() => {}).catch(e => { console.log(e)});