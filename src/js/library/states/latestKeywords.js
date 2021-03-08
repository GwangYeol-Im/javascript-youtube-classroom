import { renderLatestKeywordList } from '../../viewControllers/searchModal.js';
import { MAX_LATEST_KEYWORD_COUNT } from '../constants/classroom.js';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.js';

const latestKeywords = {
  value: [],

  init() {
    this.set(getLocalStorage('latestKeywords') ?? []);
  },

  get() {
    return this.value;
  },

  set(newKeywords) {
    this.value = newKeywords;

    renderLatestKeywordList(this.value);
  },

  add(newKeyword) {
    const targetIdx = this.value.indexOf(newKeyword);

    if (targetIdx > -1) {
      this.value.splice(targetIdx, 1);
    } else if (this.value.length === MAX_LATEST_KEYWORD_COUNT) {
      this.value.shift();
    }
    this.value.push(newKeyword);
    setLocalStorage('latestKeywords', this.value ?? []);

    renderLatestKeywordList(this.value);
  },
};

export default latestKeywords;