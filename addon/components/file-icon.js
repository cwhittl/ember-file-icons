import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { htmlSafe } from '@ember/string';

const VIEWABLE_IMAGE_TYPES = ['jpg', 'gif', 'png', 'jpeg'];
const ACCEPTABLE_IMAGE_SIZES = ['small', 'medium', 'large', 'responsive'];

export default Component.extend({
  attributeBindings: ['data-file', 'style'],
  classNameBindings: ['getClassNames'],
  init(...args) {
    this._super(...args);
    if (get(this, 'extension')) {
      set(this, 'iconOnly', true);
    }
  },
  url: null,
  size: null,
  iconOnly: false,
  extension: null,
  tagName: 'div',
  'data-file': computed('url', function () {
    const extension = this.getExtension(get(this, 'url'));
    if (!get(this, 'iconOnly') && VIEWABLE_IMAGE_TYPES.includes(extension)) {
      return null;
    }
    return extension;
  }),
  style: computed('dataFile', function () {
    if (!get(this, 'data-file')) {
      return htmlSafe(`background-image:url('${get(this, 'url')}')`);
    }
    return null;
  }),
  getClassNames: computed('size', function () {
    if (get(this, 'data-file')) {
      return `file-icon file-icon--${this.getSize(get(this, 'size'))}`;
    }
    return `image-icon image-icon--${this.getSize(get(this, 'size'))}`;
  }),
  getSize(size) {
    if (ACCEPTABLE_IMAGE_SIZES.includes(size)) {
      return size;
    }
    return ACCEPTABLE_IMAGE_SIZES[0];
  },
  getExtension(url) {
    const overrideExt = get(this, 'extension');
    if (overrideExt) {
      return overrideExt;
    }
    let ext = 'NA';
    try {
      ext = url.split(/#|\?/)[0].split('.').pop().trim().replace(/\//g, '');
    } catch (error) {
      // Do Nothing
    }
    if (ext.length === 0 || ext.length > 4) {
      ext = 'NA';
    }
    return ext;
  },
});
