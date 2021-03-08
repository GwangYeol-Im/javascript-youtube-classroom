import { renderSavedVideoList } from '../../viewControllers/app.js';
import { renderSavedVideoCount } from '../../viewControllers/searchModal.js';
import { fetchLatestVideoInfos } from '../API.js';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js';

async function updateVideoInfos(videoInfos) {
  const videoIds = videoInfos.map(videoInfo => videoInfo.id.videoId);
  const { items } = await fetchLatestVideoInfos(videoIds);

  return items.map(({ id, snippet }) => ({
    id: { videoId: id },
    snippet: {
      title: snippet.title,
      channelId: snippet.channelId,
      channelTitle: snippet.channelTitle,
      publishTime: snippet.publishedAt,
    },
    isWatched: false, // TODO: 필터 할 때 localStorage에서 받아오기 - 2단계.
  }));
}

const videoInfos = {
  value: new Set(),

  async init() {
    const videoInfos = getLocalStorage('videoInfos') ?? [];
    const latestVideoInfos = await updateVideoInfos(videoInfos);

    this.set(latestVideoInfos);
  },

  add(newVideoInfo) {
    this.value.add(newVideoInfo);
    setLocalStorage('videoInfos', [...this.value]);

    renderSavedVideoCount(this.value.size);
    renderSavedVideoList(this.value);
  },

  set(newVideoInfos) {
    this.value = new Set(newVideoInfos);

    renderSavedVideoCount(this.value.size);
    renderSavedVideoList(this.value);
  },

  get() {
    return this.value;
  },

  get size() {
    return this.value.size;
  },
};

export default videoInfos;