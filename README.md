# FilHDWallet

**FilHDWallet**是用来管理FileCoin上账户信息, 转账, 及其交易列表的SDK. 



## 使用说明
项目分为两个部分, `wallet`是钱包, `filecoin.js`是wallet的依赖项目.  

分别在以上两个项目中执行`npm install`

完整的示例代码, 请参考[使用示例](./wallet/example/usage.ts);  

### 创建钱包
创建钱包有两种方式: 重新创建, 使用已知的助记词创建.  
```typescript
// 导入一组助记词
  const wallet = new FilHDWallet({url: CalibrationEndPoint/*, token: _YOUR_TOKEN_IF_ENDPOINT_NEEDS_ */}, mnemonic);

// 重新创建一组助记词及HDWallet
  const wallet1 = new FilHDWallet({url: CalibrationEndPoint/*, token: _YOUR_TOKEN_IF_ENDPOINT_NEEDS_ */});
```
### 转账
使用transfer方法进行token转移, 返回交易的cid.
```typescript
const receipt = await wallet.transfer(FaucetAccount, to, new BigNumber('10000000'));
  console.log("transfer tx send out: ", receipt);
```
返回值:
```json
{
  "/": "bafy2bzacea7yoer3jicugeoh2gcwhqdvbyppa6nertn264galxzufblklbtaa"
}
```

### 查询余额
查询指定账户的余额
```typescript
let balance = await wallet.balanceOf(defaultAddress);
console.log("balance is : ", balance);
```
### 查询交易列表
查询从指定块高开始的交易列表:
```typescript
  const blocknum = (await wallet.getHead()).Height;
  const txs = await wallet.listTransactions(FaucetAccount, blocknum - 1000);
  console.log("all messages: ", txs);
```
返回如下格式的值:
```json
[
    {
        "Version":0,
        "To":"t1vvgddutcmxhx2hmokm7yqqrq3cabmfqhwxp72mi",
        "From":"t1snqk3fn2xxcae4asvdgazjbpkv4u4beyhjx2saa",
        "Nonce":1,
        "Value":"1000000000",
        "GasLimit":603460,
        "GasFeeCap":"101672",
        "GasPremium":"100618",
        "Method":0,
        "Params":null,
        "CID":{
            "/":"bafy2bzacebzn2tj75vr7zyymtyzjz3hi6ugouvwurd7xevtzzqekrxfvxkegk"
        }
    }
]
```



