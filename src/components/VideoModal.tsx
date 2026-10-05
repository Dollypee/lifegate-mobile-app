import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = (width * 9) / 16;

interface Props {
  visible: boolean;
  videoId: string | null;
  title?: string;
  preacher?: string;
  thumbnailUrl?: string;
  mode?: 'video' | 'audio';
  onClose: () => void;
}

export const VideoModal: React.FC<Props> = ({
  visible, videoId, title, preacher, thumbnailUrl, mode = 'video', onClose,
}) => {
  const insets = useSafeAreaInsets();
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(() => {
    if (visible) setPlaying(true);
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { paddingTop: insets.top || 16 }]}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>{title || 'Sermon'}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={26} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* The actual YouTube player — always rendered so audio plays,
              but visually hidden (collapsed to ~0 height) in audio mode */}
          <View style={mode === 'audio' ? styles.hiddenPlayer : styles.playerWrap}>
            {videoId ? (
              <YoutubePlayer
                height={VIDEO_HEIGHT}
                width={width}
                play={playing}
                videoId={videoId}
                onChangeState={(state: string|null) => {
                  if (state === 'ended') setPlaying(false);
                }}
              />
            ) : (
              <View style={[styles.fallback, { height: VIDEO_HEIGHT }]}>
                <Ionicons name="alert-circle-outline" size={32} color="#fff" />
                <Text style={styles.fallbackText}>Unavailable</Text>
              </View>
            )}
          </View>

          {/* Audio-mode UI shown instead of the video frame */}
          {mode === 'audio' && (
            <View style={styles.audioUi}>
              {thumbnailUrl ? (
                <Image source={{ uri: thumbnailUrl }} style={styles.audioArt} />
              ) : (
                <View style={[styles.audioArt, styles.audioArtFallback]}>
                  <Ionicons name="headset" size={48} color="rgba(255,255,255,0.5)" />
                </View>
              )}
              <Text style={styles.audioTitle} numberOfLines={2}>{title}</Text>
              {preacher && <Text style={styles.audioPreacher}>{preacher}</Text>}

              <TouchableOpacity
                style={styles.playPauseBtn}
                onPress={() => setPlaying(p => !p)}
              >
                <Ionicons name={playing ? 'pause' : 'play'} size={32} color="#000" />
              </TouchableOpacity>
              <Text style={styles.audioHint}>Playing audio · keep app open</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center' },
  sheet: { backgroundColor: '#000' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingBottom: 12,
  },
  title: { color: '#fff', fontSize: 15, fontWeight: '600', flex: 1, marginRight: 12 },
  closeBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center',
  },
  playerWrap: { width: '100%' },
  hiddenPlayer: { height: 1, width: 1, overflow: 'hidden', opacity: 0 },
  fallback: {
    width: '100%', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#1a1a1a',
  },
  fallbackText: { color: '#999', fontSize: 13 },

  audioUi: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 36,
    gap: 6,
  },
  audioArt: {
    width: 220,
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
  },
  audioArtFallback: {
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  audioPreacher: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginBottom: 24,
  },
  playPauseBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  audioHint: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    marginTop: 16,
  },
});