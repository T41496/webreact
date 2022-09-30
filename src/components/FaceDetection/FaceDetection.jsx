import React, { useEffect,useState } from "react";
import { connect, useSelector } from "react-redux";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { withNamespaces } from 'react-i18next';
import {
   
    fetchYotiDetailsStart
  } from "../../store/actions/YotiAction";
  
const FaceDetection = (props) => {
  const [inputData, setInputData] = useState({});
  const [src, setSrc] = useState("");

  const [yotistate, setYotistate] = useState(true);

  const yotiSession = useSelector((state) => state.yoti.yotiSession);
  console.log(yotiSession)

  useEffect(() => {
    props.dispatch(fetchYotiDetailsStart());
  }, []);


  if(yotistate){

        if (Object.keys(yotiSession.data).length === 0) {
            
          
        }else{
            setYotistate(false);
                        localStorage.removeItem("yoti_session_id");

                        localStorage.setItem("yoti_session_id", yotiSession.data.session_id);


                        let main_url = "https://api.yoti.com/idverify/v1/web/index.html?sessionID="
                        let session_id = yotiSession.data.session_id
                        let session_token = '&sessionToken='+yotiSession.data.session_token
                        let fullurl = main_url+session_id+session_token
                        setSrc(fullurl);
                
            
        }
    }

    const { t } = props;

  return (
    <>
     <div>
     <iframe src={src}
     style={{height: "605px", width:"100%", border:"none"}} allow="camera"></iframe></div>
    </>
  );
};

const mapStateToPros = (state) => ({
    yotiSession: state.yoti.yotiSession,

}
);

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(FaceDetection));
