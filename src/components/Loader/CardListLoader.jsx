import React from "react"
import ContentLoader from "react-content-loader"

const CardListLoader = (props) => (
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
    <rect x="540" y="24" rx="0" ry="0" width="187" height="9" /> 
    <rect x="8" y="50" rx="0" ry="0" width="1200" height="5" /> 
    <rect x="8" y="202" rx="0" ry="0" width="390" height="104" /> 
    <rect x="408" y="202" rx="0" ry="0" width="390" height="104" /> 
    <rect x="810" y="200" rx="0" ry="0" width="390" height="104" /> 
    <rect x="8" y="81" rx="0" ry="0" width="390" height="104" /> 
    <rect x="8" y="324" rx="0" ry="0" width="390" height="104" /> 
    <rect x="408" y="324" rx="0" ry="0" width="390" height="104" /> 
    <rect x="810" y="322" rx="0" ry="0" width="390" height="104" />
  </ContentLoader>
)

export default CardListLoader;