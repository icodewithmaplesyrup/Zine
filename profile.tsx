import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ZineText } from '@/components/ZineText';
import { Colors, Spacing } from '@/constants/theme';

const USER = {
  handle: '@inkslinger',
  joinedDate: 'March 2026',
  role: 'Publisher & Contributor',
  publishedIn: 3,
  aiCreditsRemaining: 412,
  aiCreditsCap: 500,
};

function StatBox({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <View style={stat.box}>
      <ZineText variant="display" style={stat.value}>
        {value}
      </ZineText>
      <ZineText variant="label" color={Colors.inkFaded}>
        {label}
      </ZineText>
    </View>
  );
}

function SettingsRow({
  label,
  value,
  onPress,
  danger,
}: {
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity style={row.container} onPress={onPress}>
      <ZineText
        variant="body"
        color={danger ? Colors.red : Colors.ink}
      >
        {label}
      </ZineText>
      {value && (
        <ZineText variant="caption" color={Colors.inkFaded}>
          {value} →
        </ZineText>
      )}
      {!value && (
        <ZineText variant="caption" color={Colors.inkFaded}>
          →
        </ZineText>
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const creditPct = Math.round(
    (USER.aiCreditsRemaining / USER.aiCreditsCap) * 100
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.masthead}>
          <View style={styles.rule} />
          <ZineText variant="display">{USER.handle}</ZineText>
          <ZineText variant="label" color={Colors.inkFaded}>
            {USER.role.toUpperCase()} — SINCE {USER.joinedDate.toUpperCase()}
          </ZineText>
          <View style={styles.rule} />
        </View>

        {/* Stats */}
        <View style={styles.statRow}>
          <StatBox value={USER.publishedIn} label="published in" />
          <View style={styles.statDivider} />
          <StatBox value={`${creditPct}%`} label="ai credits left" />
          <View style={styles.statDivider} />
          <StatBox value="12" label="posts rated" />
        </View>

        {/* AI Credit Bar */}
        <View style={styles.creditSection}>
          <View style={styles.creditHeader}>
            <ZineText variant="label">ai editorial credits</ZineText>
            <ZineText variant="caption">
              {USER.aiCreditsRemaining} / {USER.aiCreditsCap}
            </ZineText>
          </View>
          <View style={styles.creditTrack}>
            <View
              style={[styles.creditFill, { width: `${creditPct}%` as any }]}
            />
          </View>
          <ZineText variant="caption" style={styles.creditHint}>
            resets monthly · top up anytime
          </ZineText>
        </View>

        {/* Account Settings */}
        <ZineText variant="label" style={styles.sectionLabel}>
          account
        </ZineText>
        <View style={styles.settingsGroup}>
          <SettingsRow label="edit profile" value="@inkslinger" />
          <SettingsRow label="notification preferences" />
          <SettingsRow label="connected stripe account" value="••••4242" />
        </View>

        {/* Publisher Settings */}
        <ZineText variant="label" style={styles.sectionLabel}>
          publisher
        </ZineText>
        <View style={styles.settingsGroup}>
          <SettingsRow label="manage api keys" />
          <SettingsRow label="payout history" />
          <SettingsRow label="advertiser contacts" />
        </View>

        {/* Danger zone */}
        <ZineText variant="label" style={styles.sectionLabel}>
          account
        </ZineText>
        <View style={styles.settingsGroup}>
          <SettingsRow label="sign out" danger />
          <SettingsRow label="delete account" danger />
        </View>

        <ZineText variant="caption" style={styles.footer}>
          zine v1.0.0 · made with ◈ · terms · privacy
        </ZineText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.paper },
  scroll: { flex: 1 },
  content: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },
  masthead: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rule: { width: '100%', height: 2, backgroundColor: Colors.ink, marginVertical: Spacing.xs },
  statRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.ink,
    marginBottom: Spacing.md,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.ink,
  },
  creditSection: {
    borderWidth: 1,
    borderColor: Colors.ink,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.xs,
  },
  creditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  creditTrack: {
    height: 8,
    backgroundColor: Colors.paperDark,
    borderWidth: 1,
    borderColor: Colors.inkFaded,
  },
  creditFill: {
    height: '100%',
    backgroundColor: Colors.ink,
  },
  creditHint: { textAlign: 'right', color: Colors.inkFaded },
  sectionLabel: { marginBottom: Spacing.xs, marginTop: Spacing.sm },
  settingsGroup: {
    borderWidth: 1,
    borderColor: Colors.ink,
    marginBottom: Spacing.md,
  },
  footer: {
    textAlign: 'center',
    marginTop: Spacing.xl,
    color: Colors.inkFaded,
  },
});

const stat = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.md,
    gap: 4,
  },
  value: {
    fontSize: 28,
  },
});

const row = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.paperDark,
  },
});
