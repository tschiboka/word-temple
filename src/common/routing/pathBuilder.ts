import { PATHS } from "./Routing"

type Path = { path: string }
type Paths = {
    HOME: Path
    BUILDER: Path & { id?: number }
}

export const pathBuilder = <T extends keyof Paths>(
    routeName: T,
    params?: Partial<Omit<Paths[T], 'path'>>,
): string => {
    const basePath = PATHS[routeName]
    if (!params) return basePath

    const query = params
        ? new URLSearchParams(
              Object.entries(params).map(([k, v]) => [k, String(v)]),
          ).toString()
        : ''

    return query ? `${basePath}?${query}` : basePath
}
