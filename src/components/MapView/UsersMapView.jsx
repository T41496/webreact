import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchNearByUserStart } from "../../store/actions/HomeAction";
import { withNamespaces } from "react-i18next";
import api from "../../Environment";
import GoogleMapReact from 'google-map-react';
import configuration from "react-global-configuration";

const UsersMapView = (props) => {

    const [center, setCenter] = useState({lat:0,lng:0});
    const [popupShow, setPopupShow] = useState(false);

    useEffect(() => {
        props.dispatch(fetchNearByUserStart());
    }, []);

    const InfoWindow = (props) => (
        <div key={props.index} className="pin"
        style={{ backgroundColor: "white", cursor: 'pointer',transform: 'translate(-50%, -50%)' }}>
            <div className="arrow-left"></div>
            <img src={window.location.origin + "/assets/images/icons/cut.svg"} className="close_img" onClick={() => {closeMapPopup()}} />
            <div id="content">
                <div id="bodyContent">
                    <Image 
                        src={props.user.picture ? (api.serviceUrl()+'/'+props.user.picture) : (api.serviceUrl()+'/images/mysecrets_avatar_square_image.png')} 
                        alt={props.user.name}
                    />
                    <br />
                    <p><b><Link to={`/${props.user.user_unique_id}`} className="">{props.user.name}</Link></b></p>
                </div>
            </div>
        </div>
    );

    const MarkerComponent = (props) => {

       

        return (
            <div>
                <img src={props.text} onClick={() => {onChildClick(props.index)}} style={{ transform: 'translate(-50%, -50%)',height: '50px', width: '50px' }} />
                {(props.showInfo===props.index)?
                    <InfoWindow show={props.showInfo} index={props.index} user={props.user}/>
                :
                    ''
                }
            </div>
        );
    };

    const onChildClick = (key) => {
        setPopupShow(key);
    }

    const closeMapPopup = () => {
        setPopupShow(false);
    }
    
    const { t } = props;

    return (
        <Col xl={12} md={12} className="suggest-col">
            <div style={{ height: '100vh', width: '100%' }}>
            {!props.nearBy.loading ?
                <GoogleMapReact
                bootstrapURLKeys={{ key: configuration.get("configData.map_key") }}
                defaultCenter={(props.nearBy.data.current)?props.nearBy.data.current:center}
                defaultZoom={11}
                >
                    {(props.nearBy.data.users.length>0) ? (
                        props.nearBy.data.users.map((user,key) => (
                            <MarkerComponent
                                key={key}
                                lat={user.latitude}
                                lng={user.longitude}
                                text={window.location.origin + "/assets/images/icons/user_marker.png"}
                                showInfo={popupShow}
                                index={key}
                                user={user}
                            />
                        ))
                    ) : ("")}
                </GoogleMapReact>
            :
                ""
            }
            </div>
        </Col>
    );
};

const mapStateToPros = (state) => ({
    nearBy: state.home.nearByUsers,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(UsersMapView));
