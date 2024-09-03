import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const SvgNarbar = ({props, color}: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={98}
    height={61}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M12.99 12H13v13c0 19.33 15.67 35 35 35s35-15.67 35-35V13h.01c-.007-.166-.01-.332-.01-.5C83 5.764 88.328.272 95 .01V0H0v.01C.166.003.333 0 .5 0c6.736 0 12.228 5.328 12.49 12z"
    />
  </Svg>
)
