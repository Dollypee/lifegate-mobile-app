import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet, FlatList,
  Share,
  Image,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Sermon } from '@/types';
import { VideoModal } from '@/components/VideoModal';
import { getYouTubeId, getYouTubeThumbnail } from '@/utils/helper';
import { useInfiniteSermons, useSermons } from '@/hooks/useSermons';
import { RefreshControl } from 'react-native-gesture-handler';

interface Props { navigation: any; }

export const SermonsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeSermon, setActiveSermon] = React.useState<Sermon | null>(null);
  const [playMode, setPlayMode] = React.useState<'video' | 'audio'>('video');
  
    React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleWatch = (sermon: Sermon) => {
    setPlayMode('video');
    setActiveSermon(sermon);
  };

  const handleListen = (sermon: Sermon) => {
    setPlayMode('audio');
    setActiveSermon(sermon);
  };

  const handleShare = async (sermon: Sermon) => {
    try {
      await Share.share({
        message: `${sermon.title} — ${sermon.preacher}\n\nWatch here: ${sermon.videoUrl}`,
        url: sermon.videoUrl,
        title: sermon.title,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };
   const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    refetch,
    isRefetching,
  } = useInfiniteSermons({ search: debouncedSearch || undefined });

  // Flatten pages into a single array for FlatList
  const sermons = data?.pages.flatMap(page => page.data) ?? [];
  
    const renderSermon = ({ item: sermon }: { item: Sermon }) => (
    <Card elevated onPress={() => handleWatch(sermon)} style={{ marginBottom: 12 }}>
      <View style={styles.sermonRow}>
        <View style={[styles.thumb, { backgroundColor: colors.primary + '22' }]}>
          {(() => {
            const thumbUrl = sermon.thumbnailUrl || getYouTubeThumbnail(sermon.videoUrl!);
            return thumbUrl ? (
              <Image source={{ uri: thumbUrl }} style={styles.thumbImage} resizeMode="cover" />
            ) : null;
          })()}
          <View style={styles.playOverlay}>
            <Ionicons name="play-circle" size={36} color="#fff" />
          </View>
          {sermon.isFeatured && (
            <View style={[styles.featBadge, { backgroundColor: colors.accent }]}>
              <Text style={styles.featText}>FEATURED</Text>
            </View>
          )}
        </View>
        <View style={styles.info}>
          {sermon.series && <Badge label={sermon.series} type="sermon" small />}
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {sermon.title}
          </Text>
          <Text style={[styles.preacher, { color: colors.primary }]}>
            {sermon.preacher}
          </Text>
          <View style={styles.meta}>
            <Ionicons name="calendar-outline" size={11} color={colors.textMuted} />
            <Text style={[styles.metaText, { color: colors.textMuted }]}>
              {new Date(sermon.publishedAt!).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric',
              })}
            </Text>
            {sermon.duration && (
              <>
                <Text style={[styles.metaText, { color: colors.textMuted }]}>  ·  </Text>
                <Ionicons name="time-outline" size={11} color={colors.textMuted} />
                <Text style={[styles.metaText, { color: colors.textMuted }]}>
                  {sermon.duration}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>

      <View style={[styles.actions, { borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleListen(sermon)}>
          <Ionicons name="headset" size={16} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>Listen</Text>
        </TouchableOpacity>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleShare(sermon)}>
          <Ionicons name="share-social" size={16} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>Share</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyState}>
        <Ionicons name="mic-off-outline" size={48} color={colors.textMuted} />
        <Text style={[styles.emptyText, { color: colors.textMuted }]}>
          {debouncedSearch ? `No sermons found for "${debouncedSearch}"` : 'No sermons available'}
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator style={{ padding: 16 }} color={colors.primary} />;
  };

  const renderHeader = () => (
    <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 4 }}>
      <View style={[styles.searchBar, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search sermons..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Header title="Sermons & Messages" subtitle="Watch · Listen · Be Inspired" />
        <ActivityIndicator style={{ flex: 1 }} color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Header title="Sermons & Messages" subtitle="Watch · Listen · Be Inspired" />
        <View style={styles.emptyState}>
          <Ionicons name="cloud-offline-outline" size={48} color={colors.textMuted} />
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>
            Failed to load sermons
          </Text>
          <TouchableOpacity onPress={() => refetch()} style={[styles.retryBtn, { borderColor: colors.primary }]}>
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Sermons & Messages" subtitle="Watch · Listen · Be Inspired" />

      <FlatList
        data={sermons}
        keyExtractor={item => item.id}
        renderItem={renderSermon}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      />

      <VideoModal
        visible={!!activeSermon}
        videoId={activeSermon ? getYouTubeId(activeSermon.videoUrl!) : null}
        title={activeSermon?.title}
        preacher={activeSermon?.preacher}
        thumbnailUrl={activeSermon?.thumbnailUrl}
        mode={playMode}
        onClose={() => setActiveSermon(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // searchBar: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, height: 44, gap: 8 },
  // searchInput: { flex: 1, fontSize: 15 },
  // filterChip: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  // filterText: { fontWeight: '600', fontSize: 13 },
  // sermonRow: { flexDirection: 'row', gap: 14, marginBottom: 12 },
  // thumb: { width: 90, height: 90, borderRadius: 12, justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' },
  // thumbImage: {
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  // },
  // playOverlay: {
  //   ...StyleSheet.absoluteFill,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.25)',
  // },
  // featBadge: { position: 'absolute', top: 4, right: -4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  // featText: { fontSize: 8, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  // info: { flex: 1, gap: 4 },
  // title: { fontSize: 15, fontWeight: '700', lineHeight: 20 },
  // preacher: { fontSize: 12, fontWeight: '600' },
  // meta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  // metaText: { fontSize: 11 },
  // // actions: { flexDirection: 'row', borderTopWidth: 1, paddingTop: 10, marginTop: 4 },
  // // actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 },
  // // actionText: { fontSize: 12, fontWeight: '600' },
  // // divider: { width: 1, height: 20 },
  // actions: { flexDirection: 'row', borderTopWidth: 1, paddingVertical: 4, },
  // actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12 },
  // actionText: { fontSize: 13, fontWeight: '600' },
  // divider: { width: 1, marginVertical: 10 },
  
  
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6,
  },
  searchInput: { flex: 1, fontSize: 14 },
  sermonRow: { flexDirection: 'row' },
  thumb: { width: 100, height: 100, overflow: 'hidden' },
  thumbImage: { position: 'absolute', width: '100%', height: '100%' },
  playOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  featBadge: {
    position: 'absolute', top: 6, left: 6,
    paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4,
  },
  featText: { color: '#fff', fontSize: 8, fontWeight: '800', letterSpacing: 0.5 },
  info: { flex: 1, padding: 12, gap: 4 },
  title: { fontSize: 14, fontWeight: '700', lineHeight: 20 },
  preacher: { fontSize: 12, fontWeight: '600' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 3, flexWrap: 'wrap' },
  metaText: { fontSize: 11 },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 4,
  },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6, paddingVertical: 12,
  },
  actionText: { fontSize: 13, fontWeight: '600' },
  divider: { width: 1, marginVertical: 10 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, paddingTop: 80 },
  emptyText: { fontSize: 14, textAlign: 'center', paddingHorizontal: 32 },
  retryBtn: { marginTop: 8, borderWidth: 1, borderRadius: 20, paddingHorizontal: 24, paddingVertical: 10 },
});
