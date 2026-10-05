import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Dimensions, Image, Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';
import { VideoModal } from '../../components/VideoModal';
import { getYouTubeId, getYouTubeThumbnail } from '@/utils/helper';
import { useInfiniteClips } from '@/hooks/useClips';
import { ActivityIndicator } from 'react-native';
import { LifeClip } from '@/types';

const { width, height } = Dimensions.get('window');
const CLIP_HEIGHT = height * 0.65;


interface Props { navigation: any; }

export const LifeClipScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [activeClip, setActiveClip] = React.useState<LifeClip | null>(null);
  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteClips();
  console.log(error, data)

  const clips = data?.pages.flatMap(page => page.data) ?? [];

  const handleShare = async (clip: LifeClip) => {
    try {
      await Share.share({
        message: `${clip?.title}\n\nWatch: ${clip?.videoUrl}\n\nLifegate Outreach Center`,
        title: clip?.title,
      });
    } catch (e) { }
  };

  const renderClip = ({ item: clip }: { item: LifeClip }) => {
    const thumbUrl = getYouTubeThumbnail(clip?.videoUrl);
    const videoId = getYouTubeId(clip?.videoUrl);

    return (
      <View style={[styles.clipContainer, { width, height: CLIP_HEIGHT }]}>
        {/* Thumbnail */}
        <TouchableOpacity
          style={styles.thumbTouchable}
          onPress={() => setActiveClip(clip)}
          activeOpacity={0.9}
        >
          {thumbUrl ? (
            <Image source={{ uri: thumbUrl }} style={styles.thumbnail} resizeMode="cover" />
          ) : (
            <View style={[styles.thumbnail, { backgroundColor: colors.card }]} />
          )}

          {/* Dark overlay */}
          <View style={styles.overlay} />

          {/* Play button */}
          <View style={styles.playBtn}>
            <Ionicons name="play-circle" size={64} color="rgba(255,255,255,0.9)" />
          </View>

          {/* Duration badge */}
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{clip?.duration}</Text>
          </View>
        </TouchableOpacity>

        {/* Info panel */}
        <View style={styles.infoPanel}>
          <View style={{ flex: 1 }}>
            <Text style={styles.clipTitle} numberOfLines={2}>{clip.title}</Text>
            {/* {clip.preacher && (
              <Text style={styles.clipPreacher}>{clip.preacher}</Text>
            )} */}
            <View style={styles.clipMeta}>
              {/* {clip.views && (
                <>
                  <Ionicons name="eye-outline" size={12} color="rgba(255,255,255,0.6)" />
                  <Text style={styles.clipMetaText}>{clip.views} views</Text>
                  <Text style={styles.clipMetaText}>·</Text>
                </>
              )} */}
              <Text style={styles.clipMetaText}>
                {new Date(clip?.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </Text>
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => setActiveClip(clip)}>
              <Ionicons name="play" size={22} color="#fff" />
              <Text style={styles.actionText}>Watch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => handleShare(clip)}>
              <Ionicons name="share-social-outline" size={22} color="#fff" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };


  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Header title="LifeClip" subtitle="Short clips from our services" />
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Header title="LifeClip" subtitle="Short clips from our services" />

      <FlatList
        data={clips}
        keyExtractor={c => c?.id}
        renderItem={renderClip}
        showsVerticalScrollIndicator={false}
        snapToInterval={CLIP_HEIGHT}
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{ gap: 12, paddingBottom: 100 }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          isFetchingNextPage
            ? <ActivityIndicator color="#fff" style={{ padding: 16 }} />
            : null
        }
      />

      <VideoModal
        visible={!!activeClip}
        videoId={activeClip ? getYouTubeId(activeClip.videoUrl) : null}
        title={activeClip?.title}
        preacher={""}
        mode="video"
        onClose={() => setActiveClip(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  clipContainer: { position: 'relative', backgroundColor: '#000' },
  thumbTouchable: { width: '100%', height: '100%', position: 'absolute' },
  thumbnail: { width: '100%', height: '100%' },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  playBtn: {
    position: 'absolute', top: '50%', left: '50%',
    transform: [{ translateX: -32 }, { translateY: -32 }],
  },
  durationBadge: {
    position: 'absolute', bottom: 100, right: 14,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
  },
  durationText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  infoPanel: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'flex-end',
    padding: 16, gap: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  clipTitle: { color: '#fff', fontSize: 15, fontWeight: '700', lineHeight: 20 },
  clipPreacher: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
  clipMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  clipMetaText: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  actions: { gap: 16, alignItems: 'center' },
  actionBtn: { alignItems: 'center', gap: 4 },
  actionText: { color: '#fff', fontSize: 11, fontWeight: '600' },
});