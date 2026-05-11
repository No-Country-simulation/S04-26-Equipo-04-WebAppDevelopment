---
name: Mature Talent Design System
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf1'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fa'
  on-surface: '#111c2c'
  on-surface-variant: '#44474e'
  inverse-surface: '#263142'
  inverse-on-surface: '#ebf1ff'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4e5e81'
  primary: '#031635'
  on-primary: '#ffffff'
  primary-container: '#1a2b4b'
  on-primary-container: '#8293b8'
  inverse-primary: '#b6c6ef'
  secondary: '#156967'
  on-secondary: '#ffffff'
  secondary-container: '#a3edea'
  on-secondary-container: '#1c6d6b'
  tertiary: '#141817'
  on-tertiary: '#ffffff'
  tertiary-container: '#282c2c'
  on-tertiary-container: '#8f9393'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#b6c6ef'
  on-primary-fixed: '#081b3a'
  on-primary-fixed-variant: '#364768'
  secondary-fixed: '#a6f0ed'
  secondary-fixed-dim: '#8ad3d0'
  on-secondary-fixed: '#00201f'
  on-secondary-fixed-variant: '#00504e'
  tertiary-fixed: '#e0e3e2'
  tertiary-fixed-dim: '#c4c7c6'
  on-tertiary-fixed: '#181c1c'
  on-tertiary-fixed-variant: '#434847'
  background: '#f9f9ff'
  on-background: '#111c2c'
  surface-variant: '#d8e3fa'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  margin-mobile: 16px
  margin-desktop: 32px
  gutter: 24px
---

## Brand & Style

The brand identity centers on the "Experienced Professional"—individuals aged 45+ who possess deep expertise but seek a modern, inclusive path to new opportunities. The design system bridges the gap between traditional corporate reliability and the forward-thinking agility of the modern workforce. 

The visual style is **Corporate / Modern** with a humanistic touch. It avoids the cold, clinical feel of standard SaaS platforms by utilizing warmer secondary tones and generous whitespace. The interface must feel intentional and respectful, valuing the user's time and experience through high legibility and an intuitive, non-friction layout. The emotional goal is to evoke a sense of "valued authority" and "renewed growth."

## Colors

This color palette is anchored in **Deep Navy (#1A2B4B)** to establish immediate institutional trust and professional rigor. To contrast this strength, a **Warm Teal (#2D7A78)** serves as the growth accent, representing inclusion, vitality, and the "human" side of the recruitment process.

The background ecosystem utilizes **Soft Greys and Off-Whites** to reduce eye strain and provide a clean canvas that highlights content hierarchy. Success states should lean toward the teal spectrum rather than a harsh neon green, maintaining the sophisticated, mature aesthetic.

## Typography

The typography strategy prioritizes high readability and executive presence. **Manrope** is used for headlines to provide a refined, modern geometric feel that remains balanced and trustworthy. For body text and data-heavy interfaces, **Work Sans** is utilized due to its exceptional clarity at various sizes and its grounded, professional character.

A slightly larger base font size (16px-18px) is standard to ensure accessibility for the target demographic. Paragraphs utilize a generous line height to prevent "text crowding," fostering a calm reading experience.

## Layout & Spacing

This design system employs a **Fixed Grid** model for primary content containers to maintain a sense of stability and structure, while allowing background elements to bleed edge-to-edge. A 12-column grid is used for desktop layouts, providing the flexibility needed for complex dashboards and job listings.

The spacing rhythm is based on an **8px linear scale**. Ample whitespace (white-space) is a functional requirement, not just an aesthetic choice, as it helps focus the user's attention on critical actions and reduces cognitive load during the application process.

## Elevation & Depth

Visual hierarchy is achieved through **Ambient Shadows** and **Tonal Layers**. Surfaces do not "float" aggressively; instead, they sit slightly above the background to indicate interactivity. Shadows are extra-diffused, using a low-opacity navy tint (`rgba(26, 43, 75, 0.08)`) rather than pure black to keep the UI feeling warm and integrated.

Interactive elements like cards use a subtle "lift" on hover. Secondary information is often housed in "surface-container" tiers—sections with very light grey or teal-tinted backgrounds—to create depth without the need for heavy borders.

## Shapes

The shape language is defined by **Rounded (0.5rem)** corners. This radius is large enough to feel approachable and "human," yet conservative enough to maintain a professional, established tone. Buttons and input fields share this consistent rounding to create a cohesive, modern aesthetic. Larger components, such as profile cards or modal containers, utilize `rounded-lg` (1rem) to emphasize their role as distinct content vessels.

## Components

### Buttons & Calls to Action
Primary buttons use the Deep Navy background with white text for maximum contrast and authority. Secondary actions use the Warm Teal to signal growth and progression. All buttons feature a 48px minimum height to ensure ease of interaction.

### Input Fields
Inputs use a light grey border that transitions to the Warm Teal on focus. Labels are always persistent (not just placeholders) to ensure users never lose context of what information is being requested.

### Cards
Used for job postings and candidate profiles. Cards utilize a subtle 1px border in a light neutral shade combined with an ambient shadow. This dual-treatment ensures clarity even on lower-quality displays.

### Chips & Tags
Used for skills and industry sectors. These should have a "pill" shape (rounded-full) and use a soft teal background with dark teal text, reinforcing the theme of growth and inclusion without the intensity of a primary button.

### Lists
Lists of career history or certifications should feature vertical "connectors" or generous spacing between items to clearly delineate timelines, a critical feature for +45 talent with extensive experience.

### Professional Endorsement Badges
A specialized component featuring subtle metallic gradients (Silver/Gold) or Navy/Teal accents to highlight high-level certifications and decades of expertise.