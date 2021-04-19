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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilHDWallet = void 0;
const filecoin_js_1 = require("filecoin.js");
const bip39_1 = require("bip39");
class FilHDWallet extends filecoin_js_1.MnemonicWalletProvider {
    constructor(options, mnemonic) {
        const httpConnector = new filecoin_js_1.HttpJsonRpcConnector(options);
        const con = new filecoin_js_1.LotusClient(httpConnector);
        if (!mnemonic) {
            mnemonic = bip39_1.generateMnemonic(128);
        }
        super(con, mnemonic, '');
        this.con = con;
        this.mnemonic = mnemonic;
    }
    // to export the mnemonic of this wallet.
    exportMnemonic() {
        return this.mnemonic;
    }
    // to create a new address.
    newAddress() {
        const _super = Object.create(null, {
            newAddress: { get: () => super.newAddress }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const newaddr = yield _super.newAddress.call(this);
            return newaddr;
        });
    }
    // to export the private key of account.
    exportPrivateKey(account) {
        const _super = Object.create(null, {
            exportPrivateKey: { get: () => super.exportPrivateKey }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.exportPrivateKey.call(this, account);
        });
    }
    // to query the balance of account
    balanceOf(account) {
        const _super = Object.create(null, {
            getBalance: { get: () => super.getBalance }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const b = yield _super.getBalance.call(this, account);
            return b;
        });
    }
    // to list transactions from `fromBlockHeight`.
    // if `fromBlockHeight` is not defined, using `block.number - 100` as default.
    listTransactions(account, fromBlockHeight) {
        const _super = Object.create(null, {
            getHead: { get: () => super.getHead },
            listMessages: { get: () => super.listMessages },
            getMessage: { get: () => super.getMessage }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!fromBlockHeight) {
                fromBlockHeight = (yield _super.getHead.call(this)).Height - 100;
            }
            let fromMsgs = yield _super.listMessages.call(this, { From: account }, [], fromBlockHeight);
            let toMsgs = yield _super.listMessages.call(this, { To: account }, [], fromBlockHeight);
            let msgs = fromMsgs.concat(toMsgs);
            let txLists = [];
            if (msgs.length > 0) {
                for (let msg of msgs) {
                    const message = yield _super.getMessage.call(this, msg);
                    txLists.push(message);
                }
            }
            return JSON.stringify(txLists);
        });
    }
    // to transfer value from 'from' to 'to' with value.
    // if `privateKey` is provided, the message will be signed with it,
    // or the message is signed by `from` in this wallet.
    transfer(from, to, value, privateKey) {
        const _super = Object.create(null, {
            createMessage: { get: () => super.createMessage },
            signMessage: { get: () => super.signMessage },
            sendSignedMessage: { get: () => super.sendSignedMessage },
            hasObj: { get: () => super.hasObj }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield _super.createMessage.call(this, {
                From: from,
                To: to,
                Value: value,
                PrivateKey: privateKey
            });
            const signedMessage = yield _super.signMessage.call(this, message);
            const msgCid = yield _super.sendSignedMessage.call(this, signedMessage);
            yield _super.hasObj.call(this, msgCid);
            return msgCid;
        });
    }
}
exports.FilHDWallet = FilHDWallet;
//# sourceMappingURL=FilHDWallet.js.map