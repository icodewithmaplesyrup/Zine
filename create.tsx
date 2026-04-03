import { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  PanResponder,
  Animated,
} from 'react-native';
import { ZineText } from '@/components/ZineText';
import { Colors, Spacing } from '@/constants/theme';

// Monetization slider — the core UX differentiator
function MonetizationSlider({
  value,
  onChange,
}: {
  value: number; // 0 = all ads, 1 = all billing
  onChange: (v: number) => void;
}) {
  const TRACK_WIDTH = 280;

  const pan = useState(new Animated.ValueXY())[0];
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const raw = gestureState.moveX - 40; // offset for padding
      const clamped = Math.min(Math.max(raw / TRACK_WIDTH, 0), 1);
      onChange(clamped);
    },
  });

  const adsPercent = Math.round((1 - value) * 100);
  const billPercent = Math.round(value * 100);

  return (
    <View style={slider.container}>
      <View style={slider.labelRow}>
        <ZineText variant="label" color={Colors.blue}>
          ADS {adsPercent}%
        </ZineText>
        <ZineText variant="label" color={Colors.red}>
          {billPercent}% BILLING
        </ZineText>
      </View>

      <View style={slider.track} {...panResponder.panHandlers}>
        {/* Fill */}
        <View style={[slider.fill, { width: `${billPercent}%` }]} />
        {/* Thumb */}
        <View style={[slider.thumb, { left: `${billPercent}%` as any }]}>
          <ZineText variant="label" color={Colors.paper}>
            ◈
          </ZineText>
        </View>
      </View>

      <ZineText variant="caption" style={slider.hint}>
        slide to balance reader ads vs. subscription billing
      </ZineText>
    </View>
  );
}

const MY_ZINES = [
  { id: '1', title: 'Analog Drift', issue: 3, submissions: 12 },
];

export default function CreateScreen() {
  const [monetizationValue, setMonetizationValue] = useState(0.5);

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
          <ZineText variant="display">publish</ZineText>
          <ZineText variant="label" color={Colors.inkFaded}>
            — your editorial desk —
          </ZineText>
          <View style={styles.rule} />
        </View>

        {/* Create New */}
        <TouchableOpacity style={styles.newButton} activeOpacity={0.8}>
          <ZineText variant="heading" color={Colors.paper}>
            + new zine
          </ZineText>
          <ZineText variant="caption" color={Colors.paperDark}>
            start a publication
          </ZineText>
        </TouchableOpacity>

        {/* Publisher's Zines */}
        {MY_ZINES.length > 0 && (
          <>
            <ZineText variant="label" style={styles.sectionLabel}>
              your publications
            </ZineText>

            {MY_ZINES.map((z) => (
              <View key={z.id} style={styles.publishCard}>
                <View style={styles.publishCardHeader}>
                  <ZineText variant="heading">{z.title}</ZineText>
                  <View style={styles.issueTag}>
                    <ZineText variant="label" color={Colors.paper}>
                      Vol. {z.issue}
                    </ZineText>
                  </View>
                </View>

                <ZineText variant="body" style={styles.subCount}>
                  {z.submissions} pending submissions
                </ZineText>

                {/* Monetization Slider */}
                <View style={styles.sliderSection}>
                  <ZineText variant="label" style={styles.sliderLabel}>
                    revenue model
                  </ZineText>
                  <MonetizationSlider
                    value={monetizationValue}
                    onChange={setMonetizationValue}
                  />
                </View>

                {/* Actions */}
                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <ZineText variant="label">review</ZineText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.actionBtnPrimary]}
                  >
                    <ZineText variant="label" color={Colors.paper}>
                      publish issue
                    </ZineText>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}

        {/* API Key section */}
        <View style={styles.apiSection}>
          <ZineText variant="label" style={styles.sectionLabel}>
            web publishing
          </ZineText>
          <View style={styles.apiCard}>
            <ZineText variant="body">
              Embed your zine on the open web using your publisher API key.
            </ZineText>
            <TouchableOpacity style={styles.apiKeyButton}>
              <ZineText variant="label" color={Colors.blue}>
                view api key →
              </ZineText>
            </TouchableOpacity>
          </View>
        </View>
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
  newButton: {
    backgroundColor: Colors.ink,
    padding: Spacing.md,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: 4,
  },
  sectionLabel: { marginBottom: Spacing.sm },
  publishCard: {
    borderWidth: 1,
    borderColor: Colors.ink,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  publishCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  issueTag: {
    backgroundColor: Colors.blue,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  subCount: { marginBottom: Spacing.md },
  sliderSection: { marginBottom: Spacing.md },
  sliderLabel: { marginBottom: Spacing.sm },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.paperDark,
    paddingTop: Spacing.sm,
  },
  actionBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.ink,
    padding: Spacing.sm,
    alignItems: 'center',
  },
  actionBtnPrimary: {
    backgroundColor: Colors.ink,
    borderColor: Colors.ink,
  },
  apiSection: { marginTop: Spacing.md },
  apiCard: {
    borderWidth: 1,
    borderColor: Colors.blue,
    borderStyle: 'dashed',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  apiKeyButton: {
    borderTopWidth: 1,
    borderTopColor: Colors.blue,
    paddingTop: Spacing.sm,
  },
});

const slider = StyleSheet.create({
  container: { gap: Spacing.xs },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  track: {
    height: 28,
    backgroundColor: Colors.paperDark,
    borderWidth: 1,
    borderColor: Colors.ink,
    justifyContent: 'center',
    position: 'relative',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.ink,
  },
  thumb: {
    position: 'absolute',
    width: 28,
    height: 28,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -14,
    top: 0,
  },
  hint: { textAlign: 'center', marginTop: 4 },
});
