import http from '@/utils/httpInstance';

export function getPosition(pageNum, pageSize) {
  return http.get(`/position/${pageNum}/${pageSize}`)
}