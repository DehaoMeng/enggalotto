export interface Student {
    id: number | null
    username: string
    school: string
    grade: string|null
}

export interface Lottery extends Student {
    prize: string | null
    date: string | null
}
