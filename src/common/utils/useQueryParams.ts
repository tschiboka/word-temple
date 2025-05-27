import { useLocation } from 'react-router-dom';

export function useQueryParams(): Record<string, string> {
  const { search } = useLocation();
  return Object.fromEntries(new URLSearchParams(search).entries());
}