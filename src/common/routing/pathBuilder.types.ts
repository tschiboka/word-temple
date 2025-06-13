export type Path = { path: string }

export type Paths = {
    HOME: Path
    BUILDER: Path & { id?: number }
}
