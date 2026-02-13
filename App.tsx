import React, { useMemo } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Theme and Components
import { Colors } from "./src/theme/colors";
import { BalanceCard } from "./src/components/BalanceCard";
import { TokenItem } from "./src/components/TokenItem";
import { TransactionItem } from "./src/components/TransactionItem";
import { SearchInput } from "./src/components/SearchInput";

// Logic
import { useSolanaAccount } from "./src/hooks/useSolanaAccount";

export default function App() {
  const {
    address,
    setAddress,
    loading,
    balance,
    tokens,
    txns,
    search,
  } = useSolanaAccount();

  const headerElement = useMemo(() => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>SolScan</Text>
      <Text style={styles.subtitle}>Explore the Solana Blockchain</Text>

      <SearchInput
        value={address}
        onChangeText={setAddress}
        onSearch={search}
        loading={loading}
      />

      {balance !== null && (
        <BalanceCard balance={balance} address={address} />
      )}
    </View>
  ), [address, loading, balance, search, setAddress]);

  const emptyElement = useMemo(() => {
    if (loading) return null;
    if (balance === null) return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Enter a wallet address to view details</Text>
      </View>
    );
    return null;
  }, [loading, balance]);

  const combinedData = [
    ...(tokens.length > 0 ? [{ type: 'section', title: 'Token Accounts' }] : []),
    ...tokens.map(t => ({ ...t, type: 'token' })),
    ...(txns.length > 0 ? [{ type: 'section', title: 'Recent Transactions' }] : []),
    ...txns.map(tx => ({ ...tx, type: 'txn' })),
  ];

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safe} edges={['top']}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <FlatList
              data={combinedData}
              keyExtractor={(item, index) => {
                if ('mint' in item) return item.mint;
                if ('sig' in item) return item.sig;
                return index.toString();
              }}
              ListHeaderComponent={headerElement}
              ListEmptyComponent={emptyElement}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }: { item: any }) => {
                if (item.type === 'section') {
                  return <Text style={styles.sectionHeader}>{item.title}</Text>;
                }
                if (item.type === 'token') {
                  return <TokenItem mint={item.mint} amount={item.amount} />;
                }
                if (item.type === 'txn') {
                  return <TransactionItem sig={item.sig} time={item.time} ok={item.ok} />;
                }
                return null;
              }}
              contentContainerStyle={styles.listContent}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: Colors.primary,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "800",
    color: Colors.text,
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyState: {
    marginTop: 60,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    color: Colors.textDim,
    textAlign: "center",
    fontSize: 16,
  },
});
