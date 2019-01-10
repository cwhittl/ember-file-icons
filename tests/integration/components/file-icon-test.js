import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import faker from 'faker';

module('Integration | Component | file-icon', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders with valid image url', async function (assert) {
    const url = `${faker.image.imageUrl()}/fred.png`;
    const size = 'medium';

    this.set('url', url);
    this.set('size', size);

    await render(hbs`{{file-icon url=url size=size}}`);
    assert.equal(this.element.outerHTML.includes(url), true, 'Has URL');
    assert.equal(this.element.outerHTML.includes(size), true, 'Has Size');
  });

  test('it renders without valid image url', async function (assert) {
    const url = 'https://google.com/';
    const size = 'medium';

    this.set('url', url);
    this.set('size', size);

    await render(hbs`{{file-icon url=url size=size}}`);
    assert.equal(!this.element.outerHTML.includes(url), true, 'Has URL');
    assert.equal(this.element.outerHTML.includes('com'), true, 'Has Domain');
    assert.equal(this.element.outerHTML.includes(size), true, 'Has Size');
  });

  test('it renders without a url', async function (assert) {
    const size = 'medium';

    this.set('size', size);

    await render(hbs`{{file-icon size=size}}`);
    assert.equal(this.element.outerHTML.includes('NA'), true, 'Has NA');
    assert.equal(this.element.outerHTML.includes(size), true, 'Has Size');
  });

  test('it renders without a size', async function (assert) {
    const url = 'https://google.com/';

    this.set('url', url);

    await render(hbs`{{file-icon url=url}}`);
    assert.equal(this.element.outerHTML.includes('com'), true, 'Has Domain');
    assert.equal(this.element.outerHTML.includes('small'), true, 'Has Default Size');
  });
});
