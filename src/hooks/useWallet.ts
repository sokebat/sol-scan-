import { useState } from "react";
import { Alert } from "react-native";
import { SolanaService, TokenAccount, TransactionSignature } from "../services/solanaService";

export function useWallet() {
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState<number | null>(null);
    const [tokens, setTokens] = useState<TokenAccount[]>([]);
    const [txns, setTransactionSignatures] = useState<TransactionSignature[]>([]);

    const search = async () => {
        const addr = address.trim();
        if (!addr) {
            Alert.alert("Enter a wallet address");
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
            setTransactionSignatures(tx);
        } catch (e: any) {
            Alert.alert("Error", e.message);
        } finally {
            setLoading(false);
        }
    };

    const tryExample = () => {
        setAddress("86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY");
    };

    return {
        address,
        setAddress,
        loading,
        balance,
        tokens,
        txns,
        search,
        tryExample
    };
}
