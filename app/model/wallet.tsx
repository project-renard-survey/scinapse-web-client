import { makeTypedFactory, TypedRecord } from "typed-immutable-record";

export interface IWallet {
  walletId: number | null;
  address: string | null;
}

export interface IWalletRecord extends TypedRecord<IWalletRecord>, IWallet {}

export const initialWallet: IWallet = {
  walletId: null,
  address: null,
};

export const WalletFactory = makeTypedFactory<IWallet, IWalletRecord>(initialWallet);
