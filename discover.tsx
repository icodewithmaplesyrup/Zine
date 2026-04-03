import { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { ZineText } from '@/components/ZineText';
import { Colors, Spacing, Typography } from '@/constants/theme';

const CATEGORIES = ['all', 'art', 'music', 'nostalgia', 'tech', 'culture', 'local'];

const FEATURED_ZINES = [
  {
    id: '1',
    title: 'Static & Noise',
    description: 'Cassette culture, lo-fi, and bedroom artists',
    contributors: 34,
    tag: 'music',
    hot: true,
  },
  {
    id: '2',
    title: 'Slumberland',
    description: '90s dream pop aesthetics and sleepy visuals',
    contributors: 19,
    tag: 'nostalgia',
    hot: false,
  },
  {
    id: '3',
    title: 'Dead Pixel',
    description: 'Glitch art, net art, and broken screens',
    contributors: 41,
    tag: 'art',
    hot: true,
  },
  {
    id: '4',
    title: 'Zine Theory',
    description: 'Self-publishing, print culture & the DIY ethos',
    contributors: 11,
    tag: 'culture',
    hot: false,
  },
];

export default function DiscoverScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = FEATURED_ZINES.filter((z) => {
    const matchesCat = activeCategory === 'all' || z.tag === activeCategory;
    const matchesQuery =
      query.length === 0 ||
      z.title.toLowerCase().includes(query.toLowerCase()) ||
      z.description.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]} // sticks the search bar
      >
        {/* Masthead */}
        <View style={styles.masthead}>
          <View style={styles.rule} />
          <ZineText variant="display">newsstand</ZineText>
          <ZineText variant="label" color={Colors.inkFaded}>
            — discover & subscribe —
          </ZineText>
          <View style={styles.rule} />
        </View>

        {/* Sticky search */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="search zines..."
            placeholderTextColor={Colors.inkFaded}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Category pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.catScroll}
          contentContainerStyle={styles.catContent}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.catPill,
                activeCategory === cat && styles.catPillActive,
              ]}
              onPress={() => setActiveCategory(cat)}
            >
              <ZineText
                variant="label"
                color={activeCategory === cat ? Colors.paper : Colors.ink}
              >
                {cat}
              </ZineText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Zine grid — alternating layout for editorial feel */}
        {filtered.map((z, i) => (
          <TouchableOpacity
            key={z.id}
            style={[styles.card, i % 2 === 1 && styles.cardOffset]}
            activeOpacity={0.8}
          >
            {z.hot && (
              <View style={styles.hotStamp}>
                <ZineText variant="label" color={Colors.paper}>
                  HOT
                </ZineText>
              </View>
            )}
            <ZineText variant="label" color={Colors.red}>
              #{z.tag}
            </ZineText>
            <ZineText variant="heading" style={styles.cardTitle}>
              {z.title}
            </ZineText>
            <ZineText variant="body">{z.description}</ZineText>
            <View style={styles.cardFooter}>
              <ZineText variant="caption">
                {z.contributors} contributors
              </ZineText>
              <TouchableOpacity style={styles.joinBtn}>
                <ZineText variant="label" color={Colors.paper}>
                  join
                </ZineText>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {filtered.length === 0 && (
          <ZineText variant="caption" style={styles.empty}>
            no zines found. be the first.
          </ZineText>
        )}
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
  searchBar: {
    backgroundColor: Colors.paper,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: Colors.ink,
    marginBottom: Spacing.sm,
  },
  searchInput: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Colors.ink,
    borderWidth: 1,
    borderColor: Colors.ink,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.paperDark,
  },
  catScroll: { marginBottom: Spacing.md },
  catContent: { gap: Spacing.xs, paddingRight: Spacing.md },
  catPill: {
    borderWidth: 1,
    borderColor: Colors.ink,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  catPillActive: {
    backgroundColor: Colors.ink,
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.ink,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.paperDark,
    position: 'relative',
    transform: [{ rotate: '0.3deg' }],
  },
  cardOffset: {
    transform: [{ rotate: '-0.5deg' }],
    marginLeft: Spacing.md,
    marginRight: -Spacing.xs,
  },
  hotStamp: {
    position: 'absolute',
    top: -8,
    right: Spacing.md,
    backgroundColor: Colors.red,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    transform: [{ rotate: '2deg' }],
  },
  cardTitle: { marginVertical: Spacing.xs },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.paperDark,
    paddingTop: Spacing.xs,
  },
  joinBtn: {
    backgroundColor: Colors.ink,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  empty: {
    textAlign: 'center',
    marginTop: Spacing.xl,
    color: Colors.inkFaded,
  },
});
