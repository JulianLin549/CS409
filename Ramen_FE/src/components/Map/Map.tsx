import ReactMapGL, {GeolocateControl, NavigationControl, FlyToInterpolator} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {makeStyles} from "@material-ui/core/styles";
import {useState} from "react";
import MapContent from "./MapContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    map: {
        position: "relative",
        borderRadius: "10px",
        height: "100%",
    },
    mapOuter: {
        position: "relative",
        width: "100%",
        height: "80vh",
        margin: "0 auto"
    },
    navControlStyle: {
        right: 30,
        bottom: 30,
    },
    reSearchBtn: {
        backgroundColor: "white",
        color: "#4e8fff",
        position: "absolute",
        top: "40px",
        width: "200px",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex:600,
        "&:hover":{
            backgroundColor:"#f8f8f8",
        }
    },
}));

type MapBound = {
    N: number, S: number,
    E: number, W: number,
}

const Map = () => {
    const classes = useStyles();
    const [map, setMap] = useState<any>();
    const [mapBound, setMapBound] = useState<MapBound | null>(null);
    const [maxSeenBound, setMaxSeenBound] = useState<MapBound>({N: -90, S: 90, E: -180, W: 180});
    const [searchBtnShow, setSearchBtnShow] = useState<boolean>(false);
    const defaultViewport = {latitude: 25.046, longitude: 121.5178, zoom: 14};
    const [viewport, setViewport] = useState<any>(defaultViewport);
    const [flag, setFlag] = useState<boolean>(true);
    const geolocateControlStyle = {
        right: 10,
        top: 10
    };

    const getCurrentMapBound = () => {
        return {
            N: map?.getBounds()._ne.lat, S: map?.getBounds()._sw.lat,
            E: map?.getBounds()._ne.lng, W: map?.getBounds()._sw.lng,
        }
    }

    const handleInteract = () => {
        resetMaxSeenBound(maxSeenBound, getCurrentMapBound());
    }

    const handleViewportChange = (viewport: any) => {
        setViewport(viewport);
        handleInteract();
        flag && setMapBound(maxSeenBound);
        setFlag(false);
    }

    const resetMaxSeenBound = (previousMax: MapBound, current: MapBound) => {
        if (current.N > previousMax.N || current.E > previousMax.E || current.S < previousMax.S || current.W < previousMax.W) {
            let result: MapBound = {N: -90, S: 90, E: -180, W: 180};
            result.N = current.N > previousMax.N ? current.N : previousMax.N;
            result.E = current.E > previousMax.E ? current.E : previousMax.E;
            result.S = current.S < previousMax.S ? current.S : previousMax.S;
            result.W = current.W < previousMax.W ? current.W : previousMax.W;
            setMaxSeenBound(result);
            if (!(JSON.stringify(viewport) === JSON.stringify(defaultViewport))) {
                setSearchBtnShow(true);
            }
        }
    }
    const handleSearchBtnClick = () => {
        setSearchBtnShow(false);
        setMapBound(maxSeenBound);
    }

    const flyTo = (lng: number, lat: number) => {
        setViewport({
            ...viewport,
            longitude: lng,
            latitude: lat,
            zoom: 14,
            transitionDuration: 1000,
            transitionInterpolator: new FlyToInterpolator(),
        });
    }

    return (
        <div className={classes.mapOuter}>
            <ReactMapGL
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={handleViewportChange}
                onInteractionStateChange={handleInteract}
                mapStyle="mapbox://styles/mapbox/streets-v10"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                doubleClickZoom={false}
                className={classes.map}
                ref={ref => setMap(ref?.getMap)}
            >
                <GeolocateControl
                    style={geolocateControlStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                    auto
                />
                <NavigationControl className={classes.navControlStyle}/>
                {searchBtnShow && <Button variant="contained" className={classes.reSearchBtn}
                                          onClick={handleSearchBtnClick}> 搜尋這個區域
                </Button>}
                <MapContent mapBound={mapBound!} flyTo={flyTo}/>

            </ReactMapGL>
        </div>

    );

};

export default Map;
