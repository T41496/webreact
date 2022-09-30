import React from "react"
import ContentLoader from "react-content-loader"

const ForgotPasswordLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1340}
    height={500}
    viewBox="0 0 1200 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="8" y="21" rx="5" ry="5" width="600" height="412" /> 
    <rect x="800" y="42" rx="0" ry="0" width="189" height="30" /> 
    <rect x="780" y="79" rx="0" ry="0" width="228" height="9" /> 
    <rect x="700" y="98" rx="25" ry="25" width="400" height="51" /> 
    <rect x="700" y="165" rx="25" ry="25" width="400" height="51" /> 
    <rect x="700" y="251" rx="0" ry="0" width="180" height="5" /> 
    <circle cx="900" cy="255" r="7" /> 
    <rect x="920" y="251" rx="0" ry="0" width="180" height="5" /> 
    <rect x="700" y="290" rx="0" ry="0" width="104" height="9" /> 
    <rect x="700" y="312" rx="0" ry="0" width="400" height="3" /> 
    <rect x="700" y="350" rx="25" ry="25" width="400" height="51" /> 
    <rect x="830" y="415" rx="0" ry="0" width="135" height="5" /> 
    <rect x="808" y="435" rx="0" ry="0" width="183" height="8" />
  </ContentLoader>
)

export default ForgotPasswordLoader;