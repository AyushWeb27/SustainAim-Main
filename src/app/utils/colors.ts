// Custom brand colors for SustainAIM
export const brandColors = {
  primary: '#004445',      // Dark teal - for dark text and primary elements
  secondary: '#2c7873',    // Medium teal - for accents and interactive elements  
  light: '#d8f3f3',        // Light teal - for backgrounds
  hover: '#003333',        // Darker teal - for hover states
  shadow: 'rgba(44, 120, 115, 0.2)', // Shadow color
  shadowLg: 'rgba(44, 120, 115, 0.15)', // Large shadow color
} as const;

// Helper function to get Tailwind arbitrary value classes
export const brand = {
  // Text colors
  text: 'text-[#2c7873]',
  textDark: 'text-[#004445]',
  textLight: 'text-[#d8f3f3]',
  
  // Background colors
  bg: 'bg-[#2c7873]',
  bgDark: 'bg-[#004445]',
  bgLight: 'bg-[#d8f3f3]',
  
  // Border colors
  border: 'border-[#2c7873]',
  borderLight: 'border-[#d8f3f3]',
  
  // Hover states
  hoverText: 'hover:text-[#2c7873]',
  hoverBg: 'hover:bg-[#003333]',
  hoverBorder: 'hover:border-[#2c7873]',
  
  // Focus states
  focusBorder: 'focus:border-[#2c7873]',
  focusRing: 'focus:ring-[#2c7873]/20',
} as const;
