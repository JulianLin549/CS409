export interface IStore {
    address: string,
    city: string,
    createdAt: string,
    descriptionHTML: string,
    descriptionText: string,
    imageLarge?: string[],
    imageSmall?: string[],
    googleImages?: string[],
    location: { type: string, coordinates: number[], geoHash: string },
    name: string,
    rating: number
    region: string,
    tags: string[],
    updatedAt: string,
    __v: number,
    _id: string,
    storeRelations?:{
        author: string,
        comments: string[]
        followers: string[]
        owners: string[]
        reviews: string[]
    }
}