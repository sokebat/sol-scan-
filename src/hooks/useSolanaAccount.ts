import { useState } from "react";
import { Alert } from "react-native";
import {
  SolanaService,
  TokenAccount,
  TransactionSignature,
} from "../services/solanaService";

export function useSolanaAccount() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [tokens, setTokens] = useState<TokenAccount[]>([]);
  const [txns, setTxns] = useState<TransactionSignature[]>([]);

  const search = async () => {
    const addr = address.trim();
    if (!addr) {
      Alert.alert("Wallet Required", "Please enter a valid Solana address");
      return;
    }

    if (addr.length < 32 || addr.length > 44) {
      Alert.alert(
        "Invalid Address",
        "That doesn't look like a Solana wallet address",
      );
      return;
    }

    setLoading(true);
    try {
      const [bal, tok, tx] = await Promise.all([
        SolanaService.getBalance(addr),
        SolanaService.getTokens(addr),
        SolanaService.getSignatures(addr),
      ]);
      setBalance(bal);
      setTokens(tok);
      setTxns(tx);
    } catch (e: any) {
      Alert.alert("Search Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setBalance(null);
    setTokens([]);
    setTxns([]);
  };

  return {
    address,
    setAddress,
    loading,
    balance,
    tokens,
    txns,
    search,
    clear,
  };
}
