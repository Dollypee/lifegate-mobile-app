import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient, API } from '../config/api';
import { LifeClip, PaginatedResponse } from '../types';

const fetchClips = (page: number): Promise<PaginatedResponse<LifeClip>> =>
  apiClient.get(API.clips, { params: { page, pageSize: 10 } });

export function useInfiniteClips() {
  return useInfiniteQuery<PaginatedResponse<LifeClip>, Error>({
    queryKey: ['clips'],
    queryFn: ({ pageParam }) => fetchClips(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (last) => last.hasNextPage ? last.page + 1 : undefined,
    staleTime: 1000 * 60 * 30,
  });
}