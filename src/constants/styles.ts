// Common style constants and patterns used across components
// Following Fluent UI design tokens and Microsoft Teams patterns

export const STYLE_CONSTANTS = {
    // Card dimensions - used by WelcomeCard and InteractiveCounter
    CARD: {
        width: '400px',
        maxWidth: '90%',
    },

    // Common opacity values for secondary text
    OPACITY: {
        SECONDARY: 0.7,
        TERTIARY: 0.6,
    },

    // Spacing values following Fluent design tokens
    SPACING: {
        XS: '8px',
        SM: '12px',
        MD: '16px',
        LG: '24px',
        XL: '32px',
    },

    // Common layout patterns
    LAYOUT: {
        PAGE_PADDING: '24px 24px 20px 24px',
        CENTER_FLEX: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center' as const,
        },
        ICON_SIZE: {
            width: '24px',
            height: '24px',
        },
    },
} as const

// Common style combinations
export const COMMON_STYLES = {
    // Card with standard dimensions
    standardCard: {
        width: STYLE_CONSTANTS.CARD.width,
        maxWidth: STYLE_CONSTANTS.CARD.maxWidth,
    },

    // Secondary text styling
    secondaryText: {
        opacity: STYLE_CONSTANTS.OPACITY.SECONDARY,
    },

    // Tertiary text styling  
    tertiaryText: {
        opacity: STYLE_CONSTANTS.OPACITY.TERTIARY,
    },

    // Centered content layout
    centeredContent: {
        textAlign: 'center' as const,
        maxWidth: '600px',
    },

    // Page title styling
    pageTitle: {
        marginBottom: STYLE_CONSTANTS.SPACING.MD,
        marginTop: '0',
    },

    // Icon styling
    icon: STYLE_CONSTANTS.LAYOUT.ICON_SIZE,

    // Row layouts
    centeredRow: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 1,
        minWidth: 0,
    },

    rightAlignedRow: {
        display: 'flex',
        alignItems: 'center',
        gap: STYLE_CONSTANTS.SPACING.MD,
        flexShrink: 0,
        marginRight: '0',
    },
} as const
