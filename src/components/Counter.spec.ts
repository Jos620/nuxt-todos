import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';

import Counter from './Counter.vue';

describe('Counter', () => {
  it('renders correctly', async () => {
    const wrapper = await mountSuspended(Counter);

    expect(wrapper.text()).toContain('0');
  });

  it('increments counter when button is clicked', async () => {
    const wrapper = await mountSuspended(Counter);

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.text()).toContain('1');
  });

  it('receives a initial count', async () => {
    const wrapper = await mountSuspended(Counter, {
      props: {
        initialCount: 10,
      },
    });

    expect(wrapper.text()).toContain('10');

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.text()).toContain('11');
  });
});
