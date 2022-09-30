import React from "react"
import ContentLoader from "react-content-loader"

const WalletLoader = (props) => (
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
    <rect x="6" y="20" rx="0" ry="0" width="1190" height="133" /> 
    <rect x="6" y="178" rx="0" ry="0" width="85" height="12" /> 
    <rect x="50" y="217" rx="0" ry="0" width="1100" height="51" /> 
    <rect x="50" y="281" rx="0" ry="0" width="1100" height="51" /> 
    <rect x="50" y="350" rx="0" ry="0" width="1100" height="51" /> 
    <rect x="50" y="417" rx="0" ry="0" width="1100" height="51" /> 
    <rect x="50" y="483" rx="0" ry="0" width="1100" height="51" /> 
    <rect x="50" y="549" rx="0" ry="0" width="1100" height="51" /> 
    <rect x="50" y="615" rx="0" ry="0" width="1100" height="51" />
  </ContentLoader>
)

export default WalletLoader;
