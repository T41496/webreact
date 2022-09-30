import React from "react"
import ContentLoader from "react-content-loader"

const SignupLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1340}
    height={700}
    viewBox="0 0 1200 700"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="8" y="21" rx="5" ry="5" width="600" height="558" /> 
    <rect x="800" y="42" rx="0" ry="0" width="189" height="30" /> 
    <rect x="780" y="79" rx="0" ry="0" width="228" height="9" /> 
    <rect x="700" y="98" rx="25" ry="25" width="400" height="51" /> 
    <rect x="700" y="165" rx="25" ry="25" width="400" height="51" /> 
    <rect x="700" y="251" rx="0" ry="0" width="180" height="5" /> 
    <circle cx="900" cy="255" r="7" /> 
    <rect x="920" y="251" rx="0" ry="0" width="180" height="5" /> 
    <rect x="700" y="290" rx="0" ry="0" width="104" height="9" /> 
    <rect x="700" y="312" rx="0" ry="0" width="400" height="3" /> 
    <rect x="700" y="339" rx="0" ry="0" width="104" height="9" /> 
    <rect x="700" y="361" rx="0" ry="0" width="400" height="3" /> 
    <rect x="700" y="525" rx="25" ry="25" width="400" height="51" /> 
    <rect x="830" y="590" rx="0" ry="0" width="135" height="5" /> 
    <rect x="808" y="610" rx="0" ry="0" width="183" height="8" /> 
    <rect x="700" y="378" rx="0" ry="0" width="104" height="9" /> 
    <rect x="700" y="400" rx="0" ry="0" width="400" height="3" /> 
    <rect x="700" y="427" rx="0" ry="0" width="104" height="9" /> 
    <rect x="700" y="449" rx="0" ry="0" width="400" height="3" /> 
    <rect x="755" y="468" rx="0" ry="0" width="284" height="8" /> 
    <rect x="850" y="489" rx="0" ry="0" width="100" height="8" />
  </ContentLoader>
)

export default SignupLoader;
