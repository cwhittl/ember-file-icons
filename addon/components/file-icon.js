import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { htmlSafe } from '@ember/string';

const VIEWABLE_IMAGE_TYPES = ['jpg', 'gif', 'png', 'jpeg'];
const ACCEPTABLE_IMAGE_SIZES = ['small', 'medium', 'large', 'responsive'];

export default Component.extend({
  attributeBindings: ['data-file', 'style'],
  classNameBindings: ['getClassNames'],
  url: null,
  size: null,
  iconOnly: false,
  extension: null,
  badExtension: 'NA',
  maxExtensionSize: 4,
  tagName: 'div',
  init(...args) {
    this._super(...args);
    if (get(this, 'extension')) {
      set(this, 'iconOnly', true);
    } else {
      set(this, 'extension', this.getExtensionFromURL(get(this, 'url'), get(this, 'badExtension')));
    }
  },
  'data-file': computed('url', function () {
    const extension = get(this, 'extension');
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
  getExtensionFromURL(url, extOnError = null) {
    let extension = extOnError;
    try {
      const parcedExtension = url.split(/#|\?/)[0].split('.').pop().trim().replace(/\//g, '');
      if (parcedExtension.length > 0 && parcedExtension.length <= get(this, 'maxExtensionSize')) {
        extension = parcedExtension;
      }
    } catch (error) {
      // Do Nothing
    }
    return extension;
  },
});
