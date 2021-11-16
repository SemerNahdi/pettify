const theme = {
    palette: {
        primary: "#81f1f7",
        info: "#00A699",
        secondary: "#9dffb0",
        success: "#5cb85c",
        danger: "#d93900",
        warning: "#FFF563",
        sidebar: "#484848",
        lightGray: "#BFBFBF",
        borderColor: "#F5F5F5",
        white: "#FFFFFA",
        black: "#555555",
        washedBlue: "#b6c5c6",
    },
    typography: {
        color: "#555555",
        bold: "SFProText-Bold",
        semibold: "SFProText-Semibold",
        normal: "SFProText-Medium",
        light: "SFProText-Light",
        header1: {
            fontSize: 48,
            lineHeight: 58,
            fontFamily: "SFProText-Heavy"
        },
        header2: {
            fontSize: 36,
            lineHeight: 43,
            fontFamily: "SFProText-Heavy"
        },
        header3: {
            fontSize: 24,
            lineHeight: 28,
            fontFamily: "SFProText-Heavy"
        },
        large: {
            fontSize: 14,
            lineHeight: 21,
            fontFamily: "SFProText-Heavy"
        },
        regular: {
            fontSize: 14,
            lineHeight: 21,
            fontFamily: "SFProText-Medium"
        },
        small: {
            fontSize: 14,
            lineHeight: 18,
            fontFamily: "SFProText-Regular"
        },
        micro: {
            fontSize: 8,
            lineHeight: 8,
            fontFamily: "SFProText-Bold"
        }
    },
    spacing: {
        tiny: 8,
        small: 16,
        base: 24,
        large: 48,
        xLarge: 64
    }
};

export { theme as Theme };