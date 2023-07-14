import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const overrides = {
  styles:{
    global:()=>({
    
    }),
  },

  fonts: {
    heading: "Lato, sans-serif",
    body: "Lato, sans-serif",
  }
};

export default extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "brand" })
);
