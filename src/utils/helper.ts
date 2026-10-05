export function getYouTubeId(url: string): string | null {
  if (!url) return null;

  // youtu.be/VIDEO_ID
  let match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];

  // youtube.com/watch?v=VIDEO_ID
  match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];

  // youtube.com/embed/VIDEO_ID
  match = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];

  return null;
}

export function getYouTubeThumbnail(videoUrl: string, quality: 'maxresdefault' | 'hqdefault' | 'mqdefault' = 'hqdefault') {
  const id = getYouTubeId(videoUrl);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}