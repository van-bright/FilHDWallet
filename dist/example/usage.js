"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const __1 = require("..");
const mnemonic = 'slight notable hurry swift remind jewel sick flip joke post story mammal';
const FaucetAccount = 't1snqk3fn2xxcae4asvdgazjbpkv4u4beyhjx2saa';
const FaucetAccountPrivateKey = '71f899c638051dd2b38f32b0225a0557bf39e35d6159ab1e642c39070a3a3e6c';
const to = 't1vvgddutcmxhx2hmokm7yqqrq3cabmfqhwxp72mi';
const CalibrationEndPoint = "https://calibration.node.glif.io";
(() => __awaiter(void 0, void 0, void 0, function* () {
    // 导入一组助记词
    // const wallet = new FilHDWallet({url: CalibrationEndPoint/*, token: _YOUR_TOKEN_IF_ENDPOINT_NEEDS_ */}, mnemonic);
    // 重新创建一组助记词及HDWallet
    const wallet = new __1.FilHDWallet({ url: CalibrationEndPoint /*, token: _YOUR_TOKEN_IF_ENDPOINT_NEEDS_ */ });
    // 导出助记词
    const mns = wallet.exportMnemonic();
    console.log("mnemonics: ", mns);
    // defaultAddress is FaucetAccount, which has test token on CalibrationEndPoint
    const defaultAddress = yield wallet.getDefaultAddress();
    // 创建新账号, 并导出私钥
    const newAddress = yield wallet.newAddress();
    const newPrivateKey = yield wallet.exportPrivateKey(newAddress);
    console.log("new address: ", newAddress, " pk: ", newPrivateKey);
    // 列出所有账号
    let allAddress = yield wallet.getAddresses();
    console.log("all address in wallet: ", allAddress);
    // 查询账户是否存在
    const isexist = yield wallet.hasAddress(newAddress);
    console.log("is account exist: ", isexist);
    // 删除账号
    yield wallet.deleteAddress(newAddress);
    allAddress = yield wallet.getAddresses();
    console.log("now all address in wallet: ", allAddress);
    // 查询余额
    let balance = yield wallet.balanceOf(defaultAddress);
    console.log("balance is : ", balance);
    // 转账操作
    const receipt = yield wallet.transfer(FaucetAccount, to, new bignumber_js_1.default('10000000'), FaucetAccountPrivateKey);
    console.log("transfer tx send out: ", receipt);
    balance = yield wallet.balanceOf(FaucetAccount);
    console.log("after transfer, balance is : ", balance);
    // 从指定块高开始查询交易信息
    const blocknum = (yield wallet.getHead()).Height;
    const txs = yield wallet.listTransactions(FaucetAccount, blocknum - 1000);
    console.log("all messages: ", txs);
}))().then(() => { }).catch(e => { console.log(e); });
//# sourceMappingURL=usage.js.map