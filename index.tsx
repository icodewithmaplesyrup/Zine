import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ZineText } from '@/components/ZineText';
import { Colors, Spacing } from '@/constants/theme';

// Placeholder data — replace with Supabase fetch
const MY_ZINES = [
  {
    id: '1',
    title: 'Analog Drift',
    issue: 'Vol. 3 — Summer 2026',
    contributors: 14,
    newPosts: 3,
    tag: 'photography',
  },
  {
    id: '2',
    title: 'Y2K Forever',
    issue: 'Vol. 1 — Inaugural',
    contributors: 22,
    newPosts: 7,
    tag: 'nostalgia',
  },
  {
    id: '3',
    title: 'Circuit Breaker',
    issue: 'Vol. 5 — Fall 2025',
    contributors: 8,
    newPosts: 0,
    tag: 'tech',
  },
];

function ZineCard({
  title,
  issue,
  contributors,
  newPosts,
  tag,
}: (typeof MY_ZINES)[0]) {
  const hasNew = newPosts > 0;
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.75}>
      {/* Stamp-style tag */}
      <View style={styles.tagRow}>
        <ZineText variant="label" color={Colors.red}>
          #{tag}
        </ZineText>
        {hasNew && (
          <View style={styles.newBadge}>
            <ZineText variant="label" color={Colors.paper}>
              {newPosts} new
            </ZineText>
          </View>
        )}
      </View>

      <ZineText variant="heading" style={styles.cardTitle}>
        {title}
      </ZineText>
      <ZineText variant="caption">{issue}</ZineText>

      <View style={styles.cardFooter}>
        <ZineText variant="caption" color={Colors.inkFaded}>
          {contributors} contributors
        </ZineText>
        <ZineText variant="caption" color={Colors.inkFaded}>
          →
        </ZineText>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Masthead */}
        <View style={styles.masthead}>
          <View style={styles.mastheadRule} />
          <ZineText variant="display">my zines</ZineText>
          <ZineText variant="label" color={Colors.inkFaded}>
            — your subscriptions & contributions —
          </ZineText>
          <View style={styles.mastheadRule} />
        </View>

        {/* Zine Cards */}
        {MY_ZINES.map((z) => (
          <ZineCard key={z.id} {...z} />
        ))}

        {/* Empty state hint */}
        <ZineText variant="caption" style={styles.hint}>
          discover more zines on the explore tab ◎
        </ZineText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.paper,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  masthead: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  mastheadRule: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.ink,
    marginVertical: Spacing.xs,
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.ink,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.paperDark,
    // Slight rotation for hand-placed feel
    transform: [{ rotate: '-0.4deg' }],
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  newBadge: {
    backgroundColor: Colors.red,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  cardTitle: {
    marginBottom: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.paperDark,
    paddingTop: Spacing.xs,
  },
  hint: {
    textAlign: 'center',
    marginTop: Spacing.xl,
    color: Colors.inkFaded,
  },
});
