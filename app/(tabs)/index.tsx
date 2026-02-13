import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from "react-native";

const short = (s: string, n = 4) => `${s.slice(0, n)}...${s.slice(-n)}`;

const timeAgo = (ts: number) => {
  const sec = Math.floor(Date.now() / 1000 - ts);
  if (sec < 60) return `${sec}s ago`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  return `${Math.floor(sec / 86400)}d ago`;
};

export default function WalletScreen() {
  const router = useRouter();

  const {
    address,
    setAddress,
    loading,
    balance,
    tokens,
    txns,
    search,
    tryExample,
  } = useWallet();

  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>SolScan</Text>
      <Text style={s.subtitle}>Explore any Solana wallet</Text>

      <View style={s.inputContainer}>
        <TextInput
          style={s.input}
          placeholder="Enter wallet address..."
          placeholderTextColor="#6B7280"
          value={address}
          onChangeText={setAddress}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={s.btnRow}>
        <TouchableOpacity
          style={[s.btn, loading && s.btnDisabled]}
          onPress={search}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0D0D12" />
          ) : (
            <Text style={s.btnText}>Search</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={s.btnGhost} onPress={tryExample}>
          <Text style={s.btnGhostText}>Demo</Text>
        </TouchableOpacity>
      </View>

      {balance !== null && (
        <View style={s.card}>
          <Text style={s.label}>SOL Balance</Text>
          <View style={s.balanceRow}>
            <Text style={s.balance}>{balance.toFixed(4)}</Text>
            <Text style={s.sol}>SOL</Text>
          </View>
          <Text style={s.addr}>{short(address.trim(), 6)}</Text>
        </View>
      )}

      {tokens.length > 0 && (
        <>
          <Text style={s.section}>Tokens ({tokens.length})</Text>
          <FlatList
            data={tokens}
            keyExtractor={(t) => t.mint}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={s.row}
                onPress={() => {
                  router.push(`/token/${item.mint}`);
                }}
              >
                <Text style={s.mint}>{short(item.mint, 6)}</Text>
                <Text style={s.amount}>{item.amount}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {txns.length > 0 && (
        <>
          <Text style={s.section}>Recent Transactions</Text>
          <FlatList
            data={txns}
            keyExtractor={(t) => t.sig}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={s.row}
                onPress={() =>
                  Linking.openURL(`https://solscan.io/tx/${item.sig}`)
                }
              >
                <View>
                  <Text style={s.mint}>{short(item.sig, 8)}</Text>
                  <Text style={s.time}>
                    {item.time ? timeAgo(item.time) : "pending"}
                  </Text>
                </View>
                <Text
                  style={{
                    color: item.ok ? "#14F195" : "#EF4444",
                    fontSize: 18,
                  }}
                >
                  {item.ok ? "+" : "-"}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

// ============================================
// Styles
// ============================================

const s = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 15,
    marginBottom: 28,
    fontWeight: "500",
  },
  inputContainer: {
    backgroundColor: "#16161D",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A2A35",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  input: {
    color: "#FFFFFF",
    fontSize: 15,
    paddingVertical: 14,
  },
  btnRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  btn: {
    flex: 1,
    backgroundColor: "#14F195",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: "#0D0D12",
    fontWeight: "700",
    fontSize: 16,
  },
  btnGhost: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "#16161D",
    borderWidth: 1,
    borderColor: "#2A2A35",
  },
  btnGhostText: {
    color: "#9CA3AF",
    fontSize: 15,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#16161D",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    marginTop: 28,
    borderWidth: 1,
    borderColor: "#2A2A35",
  },
  label: {
    color: "#6B7280",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "700",
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 8,
  },
  balance: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "800",
  },
  sol: {
    color: "#14F195",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
  },
  addr: {
    color: "#9945FF",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 16,
    backgroundColor: "#252530",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  section: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 32,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#16161D",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2A2A35",
  },
  mint: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  amount: {
    color: "#14F195",
    fontSize: 15,
    fontWeight: "700",
  },
  time: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 4,
  },
});
