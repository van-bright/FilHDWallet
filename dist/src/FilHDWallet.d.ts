import { MnemonicWalletProvider } from "passion-filecoin.js";
import { KeyInfo } from "passion-filecoin.js/builds/dist/providers/Types";
import { BigNumber } from 'bignumber.js';
export declare class FilHDWallet extends MnemonicWalletProvider {
    private mnemonic;
    private con;
    static MainNetHDPath: string;
    static TestNetHDPath: string;
    constructor(options: any, path: string, mnemonic?: string);
    exportMnemonic(): string;
    newAddress(): Promise<string>;
    exportPrivateKey(account: string): Promise<KeyInfo>;
    balanceOf(account: string): Promise<any>;
    listTransactions(account: string, fromBlockHeight?: number): Promise<string>;
    transfer(from: string, to: string, value: BigNumber, privateKey?: string): Promise<import("passion-filecoin.js/builds/dist/providers/Types").Cid>;
}
