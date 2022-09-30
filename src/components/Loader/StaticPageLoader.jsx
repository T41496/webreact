import React from "react"
import ContentLoader from "react-content-loader"

const StaticPageLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1340}
    height={650}
    viewBox="0 0 1200 650"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="540" y="16" rx="0" ry="0" width="225" height="9" /> 
    <rect x="8" y="44" rx="0" ry="0" width="1190" height="5" /> 
    <rect x="8" y="71" rx="10" ry="10" width="1190" height="534" />
  </ContentLoader>
)

export default StaticPageLoader;