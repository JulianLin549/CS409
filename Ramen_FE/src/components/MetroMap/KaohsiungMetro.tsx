import React from "react";
import {useState, useRef, useLayoutEffect, useEffect,} from "react";
import ImageMapper from 'react-img-mapper';
import MapAreas from './KaohsiungMetroMapAreas'
import metroMap from '../../static/KSMetro.jpeg';
import Loading from "../Loading/Loading";
import {makeStyles, Theme} from "@material-ui/core/styles";
import MetroSideDrawer from "./MetroSideDrawer";
import MetroMapPopper from "./MetroMapPopper";

const imageWidth = 1110;


function useWindowSize(targetRef: React.RefObject<any>, setMapAreas: React.Dispatch<any>) {
    const [size, setSize] = useState({width: 0, height: 0});
    useLayoutEffect(() => {

        function updateSize() {
            setSize({width: targetRef.current.offsetWidth, height: targetRef.current.offsetHeight});
            setMapAreas(resize(targetRef.current.offsetWidth));
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const resize = (currentWidth: number) => {
    const factor = currentWidth / imageWidth;
    const oldMapAreas = JSON.parse(JSON.stringify(MapAreas.areas));
    for (let i = 0; i < oldMapAreas.length; i++) {
        let coords = oldMapAreas[i].coords;
        coords = coords.map((c: number) => c * factor);
        oldMapAreas[i].coords = coords;
    }
    return {name: "my-map", areas: JSON.parse(JSON.stringify(oldMapAreas))};
}

const useStyles = makeStyles((theme: Theme) => ({
        presenter: {
            marginBottom: 100,
            maxWidth: "1110px",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        imageDiv: {
            height: "auto",
            maxWidth: "1110px",
            '& > div > map > area:hover': {
                cursor: "pointer",
            },
        },
        typography: {
            padding: theme.spacing(2),
        },
    }),
);

const KaohsiungMetro = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [clickedStationName, setClickedStationName] = useState("");
    const [stationCode, setStationCode] = useState<string>("");
    const [hoverStationName, setHoverStationName] = useState("");

    const [mapAreas, setMapAreas] = useState<any>(MapAreas);

    const [popoverPosition, setPopoverPosition] = useState({left: 800, top: 300})
    const [drawerOpen, setDrawerOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const targetRef = useRef<HTMLDivElement>(null)
    const {width} = useWindowSize(targetRef, setMapAreas);
    // const width2 = 1284;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        setIsLoading(false);
    }, [])

    const handleClick = (area: any) => {
        setClickedStationName(area.name);
        setStationCode(area.code);
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const toggleDrawerOpen = () => {
        setDrawerOpen(!drawerOpen)
    };
    const handleEnter = (area: any, targetRef: React.RefObject<any>) => {
        const centerCoords = {
            left: area.center[0] + targetRef.current.offsetLeft,
            top: area.center[1] + targetRef.current.offsetTop
        };
        setHoverStationName(`${area.name}`)
        setPopoverPosition(centerCoords);
        setOpen(true);
    };
    const handleLeave = () => {
        setHoverStationName("");
        setOpen(false);
    };

    return (
        <div className="grid" style={{border: "2px #FFAC55 solid"}}>
            {isLoading && <Loading/>}
            <div id="bird"
                 style={{position: 'absolute', left: popoverPosition.left, top: popoverPosition.top - 40, zIndex: 9999}}
                 ref={anchorRef}>
            </div>
            <div className={classes.presenter} ref={targetRef}>
                <div className={classes.imageDiv}>
                    <ImageMapper
                        src={metroMap}
                        map={mapAreas}
                        width={width}
                        imgWidth={width}
                        onClick={(area: any) => handleClick(area)}
                        onMouseEnter={(area, _) => handleEnter(area, targetRef)}
                        onMouseLeave={() => handleLeave()}
                        onImageClick={handleDrawerClose}
                        lineWidth={0.01}
                        fillColor={"rgba(0, 0, 0, 0.15)"}
                        strokeColor={"white"}
                    />
                </div>

                <MetroMapPopper open={open} anchorEl={anchorRef} hoverStationName={hoverStationName}/>


            </div>
            <MetroSideDrawer city={"kaohsiung"}
                             stationName={clickedStationName}
                             stationCode={stationCode}
                             isOpen={drawerOpen}
                             toggleDrawerOpen={toggleDrawerOpen}
            />
        </div>
    );

};

export default KaohsiungMetro;