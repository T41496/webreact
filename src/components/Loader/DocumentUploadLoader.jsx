import React from "react"
import ContentLoader from "react-content-loader"

const DocumentUploadLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1340}
    height={750}
    viewBox="0 0 1200 750"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="540" y="11" rx="0" ry="0" width="205" height="14" /> 
    <rect x="8" y="40" rx="0" ry="0" width="1200" height="5" /> 
    <rect x="8" y="74" rx="0" ry="0" width="150" height="13" /> 
    <rect x="8" y="96" rx="0" ry="0" width="348" height="11" /> 
    <rect x="8" y="122" rx="10" ry="10" width="580" height="205" /> 
    <rect x="620" y="122" rx="10" ry="10" width="580" height="205" /> 
    <rect x="8" y="390" rx="0" ry="0" width="150" height="13" /> 
    <rect x="8" y="412" rx="0" ry="0" width="348" height="11" /> 
    <rect x="8" y="438" rx="10" ry="10" width="580" height="205" /> 
    <rect x="620" y="438" rx="10" ry="10" width="580" height="205" /> 
    <rect x="8" y="341" rx="15" ry="15" width="160" height="35" /> 
    <rect x="8" y="661" rx="15" ry="15" width="160" height="35" />
  </ContentLoader>
)

export default DocumentUploadLoader;