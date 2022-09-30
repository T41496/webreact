import React from "react"
import ContentLoader from "react-content-loader"

const ChangePasswordLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1340}
    height={400}
    viewBox="0 0 1200 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="540" y="17" rx="0" ry="0" width="195" height="10" /> 
    <rect x="8" y="38" rx="0" ry="0" width="1200" height="5" /> 
    <rect x="8" y="68" rx="0" ry="0" width="106" height="10" /> 
    <rect x="8" y="96" rx="0" ry="0" width="150" height="10" /> 
    <rect x="8" y="122" rx="0" ry="0" width="1200" height="5" /> 
    <rect x="8" y="142" rx="0" ry="0" width="106" height="10" /> 
    <rect x="8" y="170" rx="0" ry="0" width="150" height="10" /> 
    <rect x="8" y="196" rx="0" ry="0" width="1200" height="5" /> 
    <rect x="8" y="220" rx="0" ry="0" width="106" height="10" /> 
    <rect x="8" y="248" rx="0" ry="0" width="150" height="10" /> 
    <rect x="8" y="274" rx="0" ry="0" width="1200" height="5" /> 
    <rect x="540" y="314" rx="20" ry="20" width="243" height="48" />
  </ContentLoader>
)

export default ChangePasswordLoader;
