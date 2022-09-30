import React from "react"
import ContentLoader from "react-content-loader"

const ListsLoader = (props) => (
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
    <rect x="8" y="17" rx="0" ry="0" width="129" height="14" /> 
    <rect x="8" y="50" rx="0" ry="0" width="1200" height="5" /> 
    <rect x="8" y="68" rx="0" ry="0" width="143" height="13" /> 
    <rect x="8" y="103" rx="0" ry="0" width="100" height="14" /> 
    <rect x="8" y="125" rx="0" ry="0" width="150" height="8" /> 
    <rect x="8" y="144" rx="0" ry="0" width="1200" height="5" /> 
    <rect x="8" y="163" rx="0" ry="0" width="100" height="14" /> 
    <rect x="8" y="185" rx="0" ry="0" width="150" height="8" /> 
    <rect x="8" y="204" rx="0" ry="0" width="1200" height="5" /> 
    <rect x="8" y="222" rx="0" ry="0" width="100" height="14" /> 
    <rect x="8" y="244" rx="0" ry="0" width="150" height="8" /> 
    <rect x="8" y="263" rx="0" ry="0" width="1200" height="5" /> 
    <rect x="8" y="282" rx="0" ry="0" width="100" height="14" /> 
    <rect x="8" y="304" rx="0" ry="0" width="150" height="8" /> 
    <rect x="8" y="323" rx="0" ry="0" width="1200" height="5" />
  </ContentLoader>
)

export default ListsLoader;