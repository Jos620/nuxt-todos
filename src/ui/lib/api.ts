import { toRaw } from 'vue';

import { asArray } from './array';

type APIFetchOptions<T> = Parameters<typeof $fetch<T>>[1] & {
  optimisticUpdate?: () => void;
  originalData?: Ref<T>;
  revalidateKey?: string | string[];
};

export class API {
  static async fetch<T, R = T>(
    route: Parameters<typeof $fetch<T>>[0],
    opts: APIFetchOptions<T>,
  ): Promise<R> {
    let backup: T | undefined;

    const { optimisticUpdate, originalData, revalidateKey, ...fetchOpts } =
      opts;

    return await $fetch(route, {
      ...fetchOpts,
      onRequest(context) {
        fetchOpts.onRequest?.(context);

        const rawOriginalData = toRaw(unref(originalData));
        backup = structuredClone(rawOriginalData);

        optimisticUpdate?.();
      },
      onRequestError(context) {
        fetchOpts.onRequestError?.(context);

        if (!originalData || !backup) return;
        originalData.value = backup;
      },
      async onResponse(context) {
        fetchOpts.onResponse?.(context);

        if (!revalidateKey) return;

        const app = useNuxtApp();
        const keys = asArray(revalidateKey);

        for (const key of keys) {
          app.payload.data[key] = undefined;
          await refreshNuxtData(key);
        }
      },
    });
  }
}
