import React from "react"
import ContentLoader from "react-content-loader"

const BookmarkVideoLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1340}
    height={640}
    viewBox="0 0 1200 640"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="8" y="17" rx="0" ry="0" width="129" height="14" /> 
    <rect x="8" y="50" rx="0" ry="0" width="1200" height="5" /> 
    <rect x="1170" y="11" rx="0" ry="0" width="28" height="19" /> 
    <rect x="8" y="85" rx="0" ry="0" width="390" height="243" /> 
    <rect x="408" y="84" rx="0" ry="0" width="390" height="243" /> 
    <rect x="810" y="84" rx="0" ry="0" width="390" height="243" /> 
    <rect x="8" y="335" rx="0" ry="0" width="390" height="243" /> 
    <rect x="408" y="334" rx="0" ry="0" width="390" height="243" /> 
    <rect x="810" y="334" rx="0" ry="0" width="390" height="243" />
  </ContentLoader>
)

export default BookmarkVideoLoader;