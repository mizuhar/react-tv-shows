import { get } from "./api"

const endPoints = {
    shows:'/data/shows?sortBy=_createdOn%20desc'
}

export async function getShows(){
    return await get(endPoints.shows)
}