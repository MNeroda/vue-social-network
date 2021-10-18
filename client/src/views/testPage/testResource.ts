export interface testUser {
    id: number,
    name: string,
    phone: string,
    username: string
}

export function testGetUser(): Promise<testUser[]> {
    return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
}



interface testPost {
    userId: number,
    id: number,
    title: string,
    body: string
}

interface testTodos {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export class ClassResource {
    getPosts() {
        return fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
    }
    getTodos() {
        return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
    }
}
