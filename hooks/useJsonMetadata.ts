import useSWRImmutable from 'swr/immutable'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const useJsonMetadata = (uri: string | undefined) => {
  const { data, error } = useSWRImmutable(() => uri, fetcher)

  const loadingJson = !data && !error

  return {
    error,
    loading: loadingJson,
    json: data
  }
}
