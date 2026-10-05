import { API, apiClient } from '@/config/api';
import { PaginatedResponse, Sermon, SermonQueryParams } from '@/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';


const fetchSermons = (params: SermonQueryParams): Promise<PaginatedResponse<Sermon>> =>
  apiClient.get(API.sermons, { params });
  

export function useSermons(params: SermonQueryParams = {}) {
  return useQuery<PaginatedResponse<Sermon>, Error>({
    queryKey: ['sermons', params],  // re-fetches when params change (page, search etc.)
    queryFn: () => fetchSermons(params),
    staleTime: 1000 * 60 * 30,
    placeholderData: (prev) => prev, // keeps previous page data visible while next loads
  });
}

// ---- Infinite scroll query (for "load more" style, recommended for mobile) ----
export function useInfiniteSermons(params: Omit<SermonQueryParams, 'page'> = {}) {
  return useInfiniteQuery<PaginatedResponse<Sermon>, Error>({
    queryKey: ['sermons-infinite', params],
    queryFn: ({ pageParam }) =>
      fetchSermons({ ...params, page: pageParam as number, pageSize: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 30,
  });
}

export function useFeaturedSermons(count: 2 | 3 = 3) {
  return useQuery<PaginatedResponse<Sermon>, Error>({
    queryKey: ['sermons-featured', count],
    queryFn: () => apiClient.get(API.sermons, {
      params: { page: 1, pageSize: count }
    }),
    staleTime: 1000 * 60 * 30,
  });
}