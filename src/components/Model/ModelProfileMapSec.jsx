import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Image, Media } from "react-bootstrap";

import NoDataFound from "../NoDataFound/NoDataFound";
import { translate, t } from "react-multi-lang";
import GoogleMapReact from 'google-map-react';
import configuration from "react-global-configuration";

const ModelProfileMapSec = (props) => {
    // console.log(props.userDetails.data.user,'user');
    const MarkerComponent = ({ text }) => <div><img src={text} style={{ transform: 'translate(-50%, -50%)',height: '50px', width: '50px' }} /></div>;
    const [center, setCenter] = useState({lat:props.userDetails.data.user.latitude,lng:props.userDetails.data.user.longitude});

    return (
        <div
        role="tabpanel"
        className={
            props.activeSec === "map"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="Section4"
        >
        {props.userDetails.loading ? (
            "Loading..."
        ) : 
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: configuration.get("configData.map_key") }}
                defaultCenter={center}
                defaultZoom={11}
                >
                <MarkerComponent
                    lat={center.lat}
                    lng={center.lng}
                    text={window.location.origin + "/assets/images/icons/user_marker.png"}
                />
                </GoogleMapReact>
            </div>
        }
        </div>
    );
};

export default ModelProfileMapSec;
