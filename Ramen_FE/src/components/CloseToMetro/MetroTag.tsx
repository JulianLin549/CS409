import {Box} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import TaipeiMetroIcon from "../../static/taipei_metro_logo.svg";
import TaichungMetroIcon from "../../static/taichung_metro_logo.svg";
import KaohsiungMetroIcon from "../../static/kaohsiung_metro_logo.svg";
import cx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
    tag: {
        backgroundColor: "#ffb400",
    },
    logoIcon: {
        marginLeft: 4,
        marginRight: 4,
        width: "1.5rem",
        height: "1.5rem",
    },
    line: {
        textAlign: "center",
        width: "20px",
        borderRadius: 5,
        padding: 2,
        margin: 1,
        fontSize: "10px",
    },
    textStation: {
        alignItems: "flex-end",
        fontSize: "0.9rem",
        color: theme.palette.text.secondary,
        margin: 5,
        width: 65
    },
    textDistance: {
        justifySelf: "flex-end",
        fontSize: "0.75rem",
        color: theme.palette.text.secondary,
        margin: 10,
        width: 80
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 4
    },
    bg: {
        borderRadius: 10,
        color: "black",
        background: "#f1f1f1"
    },
    BR: {
        background: "#a1662c",
        color: "white",
    },
    R: {
        background: "#d12a2f",
        color: "white",
    },
    G: {
        background: "#008659",
        color: "white",
    },
    O: {
        background: "#f8b61c",
        color: "black",
    },
    BL: {
        background: "#005cb9",
        color: "white",
    },
    Y: {
        background: "#FFDB00",
        color: "black",
    },
    C: {
        background: "#80bf3d",
        color: "black",
    },
    1: {
        background: "#8EC31C",
        color: "white",
    }

}))
type Props = {
    station: {
        city: string,
        lineCode: string[],
        name: string,
        distance: number
    }
}
const MetroTag = (props: Props) => {
    const classes = useStyles();
    const station = props.station;
    let metroIcon;
    switch (station.city) {
        case 'taipei':
            metroIcon = TaipeiMetroIcon
            break
        case 'taichung':
            metroIcon = TaichungMetroIcon
            break
        case 'kaohsiung':
            metroIcon = KaohsiungMetroIcon
            break
    }

    const distance = station.distance > 1 ? `${station.distance} 公里` : `${station.distance * 1000} 公尺`


    const Line = () => {
        return <>
            {station.lineCode.map(code =>
                <span className={cx([classes.line, classes[code]])}
                      key={code}>
                {code}
                </span>
            )}
        </>
    };


    return station && <Box mt={1} className={classes.bg}>
        <div className={classes.container}>

            <span className={classes.textStation}>{station.name}站</span>
            <div className={classes.container}>
                <img className={classes.logoIcon} src={metroIcon} alt="alt"/>
                <Line/>
            </div>
            <span className={classes.textDistance}>距離 {distance}</span>
        </div>
    </Box>


};

export default MetroTag;



