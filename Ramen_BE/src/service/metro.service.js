const storeService = require('./store.service'),
    metroRepository = require('../repository/metro.repository'),
    log = require('../modules/logger');
const metroService = {}

metroService.getStoresNearMetro = async (city, stationCode, maxDistance) => {
    try {
        const key = `metro:storesNearMetro:${city}-${stationCode}`
        
        let metro = await metroRepository.findOne(city, stationCode)

        if (!metro) {
            throw new Error(`Cannot find station ${stationCode}`);
        }

        const metroCoords = metro.location.coordinates;
        const foundStore = await storeService.getStoresByDistance(metroCoords, maxDistance)

        return foundStore

    } catch (err) {
        log.error(err)
        throw new Error();
    }
}


metroService.getMetroCloseToStore = async (storeId, maxDistance) => {
    try {
        const key = `metro:metroNearStore:${storeId}`

        const foundStore = await storeService.getStoreById(storeId);

        if (!foundStore) {
            throw new Error(`Cannot find store ${storeId}`)
        }

        const storeCoords = foundStore.location.coordinates;

        let foundStations = await metroRepository.getMetrosByDistance(storeCoords, maxDistance)

        const resultStations = foundStations.map(station => {
            return {
                city: station.city,
                name: station.name,
                lineCode: station.lineCode,
                distance: station.distance.toFixed(2)
            }
        })
        return resultStations;

    } catch (err) {
        log.error(err)
        throw new Error();
    }
}

module.exports = metroService