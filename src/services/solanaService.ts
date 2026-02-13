const RPC_URL = "https://api.mainnet-beta.solana.com";

export interface TokenAccount {
    mint: string;
    amount: number;
}

export interface TransactionSignature {
    sig: string;
    time: number | null;
    ok: boolean;
}

const rpc = async (method: string, params: any[]) => {
    try {
        const res = await fetch(RPC_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
        });
        const json = await res.json();
        if (json.error) throw new Error(json.error.message);
        return json.result;
    } catch (e: any) {
        throw new Error(e.message || "RPC Error");
    }
};

export const SolanaService = {
    getBalance: async (addr: string): Promise<number> => {
        const result = await rpc("getBalance", [addr]);
        return result.value / 1_000_000_000;
    },

    getTokens: async (addr: string): Promise<TokenAccount[]> => {
        const result = await rpc("getTokenAccountsByOwner", [
            addr,
            { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
            { encoding: "jsonParsed" },
        ]);
        return (result.value || [])
            .map((a: any) => ({
                mint: a.account.data.parsed.info.mint,
                amount: a.account.data.parsed.info.tokenAmount.uiAmount,
            }))
            .filter((t: any) => t.amount > 0);
    },

    getSignatures: async (addr: string): Promise<TransactionSignature[]> => {
        const sigs = await rpc("getSignaturesForAddress", [addr, { limit: 10 }]);
        return sigs.map((s: any) => ({
            sig: s.signature,
            time: s.blockTime,
            ok: !s.err,
        }));
    },
};
