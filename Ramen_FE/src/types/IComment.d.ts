export interface IComment {
    _id: string,
    createdAt: string,
    updatedAt: string,
    rating: number,
    text: string,
    author: {
        email: string,
        avatar: string,
        _id: string,
        username: string
    }
}
