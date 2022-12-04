import { string } from "prop-types";
import React, { useContext } from "react";
import { Text } from "../../..";
import { AtomPlatformContext } from "../../provider/AtomPlatformProvider";

function Label({ children, size = "base", color, ...props }) {
  const { theme } = useContext(AtomPlatformContext);
  return (
    <Text
      style={{ marginBottom: 8 }}
      color={color ? color : theme.color.neutral[600]}
      size={size}
      aria-label={typeof children === 'string' ? children : props["aria-label"]}
      {...props}
    >
      {children}
    </Text>
  );
}

Label.propTypes = {
  "aria-label": string,
};

export default Label;
