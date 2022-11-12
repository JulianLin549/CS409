import {IStore} from "./IStore";

export interface IReview {
    author: {
        avatar: string,
        _id: string,
        username: string,
        email: string
    },
    _id: string,
    rating: number,
    text: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    store: string | IStore
}

