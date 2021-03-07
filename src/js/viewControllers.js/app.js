import { $ } from '../library/DOMelements.js';
import { createSavedVideoListTemplate } from '../library/templates/videoList.js';

const $searchModal = $('#video-search-modal');
const $videoList = $('#video-list');

function openModal() {
  $searchModal.classList.add('open');
}

function closeModal() {
  $searchModal.classList.remove('open');
}

function renderSavedVideoList(videoInfos) {
  $videoList.innerHTML = createSavedVideoListTemplate(videoInfos);
}

export { openModal, closeModal, renderSavedVideoList };