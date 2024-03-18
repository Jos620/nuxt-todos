import { toRaw } from 'vue';

import { asArray } from './array';

type APIFetchRoute<T> = Parameters<typeof $fetch<T>>[0];
type APIFetchOptions<T> = Parameters<typeof $fetch<T>>[1] & {
  optimisticUpdate?: () => void;
  originalData?: Ref<T>;
  revalidateKey?: string | string[];
};

export class API {
  static async fetch<T, R = T>(
    route: APIFetchRoute<T>,
    options: APIFetchOptions<T>,
  ): Promise<R> {
    let backup: T | undefined;

    const { optimisticUpdate, originalData, revalidateKey, ...fetchOptions } =
      options;

    return await $fetch(route, {
      ...fetchOptions,
      onRequest(context) {
        const rawOriginalData = toRaw(unref(originalData));
        backup = structuredClone(rawOriginalData);

        optimisticUpdate?.();

        fetchOptions.onRequest?.(context);
      },
      onResponseError(context) {
        if (originalData && backup) {
          originalData.value = backup;
        }

        fetchOptions.onResponseError?.(context);
      },
      async onResponse(context) {
        if (revalidateKey) {
          const app = useNuxtApp();
          const keys = asArray(revalidateKey);

          for (const key of keys) {
            app.payload.data[key] = undefined;
            await refreshNuxtData(key);
          }
        }

        fetchOptions.onResponse?.(context);
      },
    });
  }

  static async post<T, R = T>(
    route: APIFetchRoute<T>,
    options: APIFetchOptions<T>,
  ): Promise<R> {
    return await this.fetch(route, {
      ...options,
      method: 'POST',
    });
  }

  static async put<T, R = T>(
    route: APIFetchRoute<T>,
    options: APIFetchOptions<T>,
  ): Promise<R> {
    return await this.fetch(route, {
      ...options,
      method: 'PUT',
    });
  }

  static async patch<T, R = T>(
    route: APIFetchRoute<T>,
    options: APIFetchOptions<T>,
  ): Promise<R> {
    return await this.fetch(route, {
      ...options,
      method: 'PATCH',
    });
  }

  static async delete<T, R = T>(
    route: APIFetchRoute<T>,
    options: APIFetchOptions<T>,
  ): Promise<R> {
    return await this.fetch(route, {
      ...options,
      method: 'DELETE',
    });
  }
}
