

export interface Student {
    username: string
    school: string
}

export interface Lottery extends Student {
    prize: string
    date: string
}
