import { HttpJsonRpcConnector, MnemonicWalletProvider, LotusClient } from "filecoin.js";
import { generateMnemonic } from 'bip39';
import { KeyInfo, Message } from "filecoin.js/builds/dist/providers/Types";
import { BigNumber } from 'bignumber.js';

export class FilHDWallet extends  MnemonicWalletProvider {
  private mnemonic: string;
  private con: LotusClient;

  constructor(options: any, mnemonic?: string) {
    const httpConnector = new HttpJsonRpcConnector(options);
    const con = new LotusClient(httpConnector);

    if (!mnemonic) {
      mnemonic = generateMnemonic(128);
    }

    super(con, mnemonic!, '');

    this.con = con;
    this.mnemonic = mnemonic!;
  }

  // to export the mnemonic of this wallet.
  exportMnemonic(): string {
    return this.mnemonic;
  }

  // to create a new address.
  async newAddress() {
    const newaddr = await super.newAddress();
    return newaddr;
  }

  // to export the private key of account.
  async exportPrivateKey(account: string): Promise<KeyInfo> {
    return await super.exportPrivateKey(account);
  }

  // to query the balance of account
  async balanceOf(account: string) {
    const b = await super.getBalance(account);
    return b;
  }

  // to list transactions from `fromBlockHeight`.
  // if `fromBlockHeight` is not defined, using `block.number - 100` as default.
  async listTransactions(account: string, fromBlockHeight?: number) {
    if (!fromBlockHeight) {
      fromBlockHeight = (await super.getHead()).Height - 100;
    }

    let fromMsgs = await super.listMessages({From: account}, [], fromBlockHeight);
    let toMsgs = await super.listMessages({To: account}, [], fromBlockHeight);

    let msgs = fromMsgs.concat(toMsgs);
    let txLists: Message[] = [];

    if (msgs.length > 0) {
      for (let msg of msgs) {
        const message = await super.getMessage(msg);
        txLists.push(message)
      }
    }

    return JSON.stringify(txLists);
  }

  // to transfer value from 'from' to 'to' with value.
  // if `privateKey` is provided, the message will be signed with it,
  // or the message is signed by `from` in this wallet.
  async transfer(from: string, to: string, value: BigNumber, privateKey?: string) {
    const message = await super.createMessage({
      From: from,
      To: to,
      Value: value,
      PrivateKey: privateKey
    });

    const signedMessage = await super.signMessage(message);
    const msgCid = await super.sendSignedMessage(signedMessage);

    await super.hasObj(msgCid);
    return msgCid;
  }
}
