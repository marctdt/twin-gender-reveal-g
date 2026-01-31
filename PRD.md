# Planning Guide

A delightful, interactive gender reveal game for twin babies that creates suspense and excitement while collecting player predictions.

**Experience Qualities**: 
1. **Playful** - Warm, joyful interactions that celebrate the upcoming arrival with lighthearted fun
2. **Suspenseful** - Build anticipation through countdown and reveal animations that make hearts race
3. **Personal** - Intimate feel with name collection and personalized messaging that makes each player feel special

**Complexity Level**: Light Application (multiple features with basic state)
This is a single-purpose interactive experience with form inputs, animation sequences, conditional logic for results, and data persistence - fitting squarely in the light application category.

## Essential Features

**Gender Selection for Twin A**
- Functionality: Toggle buttons to select boy or girl prediction
- Purpose: Capture user's guess for first baby
- Trigger: Click/tap on boy or girl option
- Progression: User sees two options → Selects one → Visual feedback shows selection → Selection stored
- Success criteria: Only one option selected at a time, clear visual distinction between selected/unselected

**Gender Selection for Twin B**
- Functionality: Toggle buttons to select boy or girl prediction  
- Purpose: Capture user's guess for second baby
- Trigger: Click/tap on boy or girl option
- Progression: User sees two options → Selects one → Visual feedback shows selection → Selection stored
- Success criteria: Only one option selected at a time, clear visual distinction between selected/unselected

**Name Input**
- Functionality: Text field for player name
- Purpose: Personalize the experience and track who made predictions
- Trigger: Focus on input field
- Progression: User clicks field → Types name → Name stored for submission
- Success criteria: Name is required before submission, persists in storage

**Submission & Countdown**
- Functionality: Submit button triggers 5-second countdown
- Purpose: Build suspense before the reveal
- Trigger: Click submit button after all fields complete
- Progression: Submit clicked → Validation checks → Countdown begins (5,4,3,2,1) → Boxes open
- Success criteria: Button disabled until all fields complete, countdown visible and accurate

**Cake Box Reveal**
- Functionality: Animated box opening revealing blue or pink cakes
- Purpose: Dramatic reveal of actual baby genders
- Trigger: Countdown reaches zero
- Progression: Countdown ends → Box lids animate open → Cakes revealed with color (blue/pink) → Result message displays
- Success criteria: Smooth animation, correct colors displayed, boxes remain open

**Results Messaging**
- Functionality: Conditional congratulations or encouragement message
- Purpose: Celebrate correct guesses and maintain joy for all players
- Trigger: Reveal animation completes
- Progression: Reveal finishes → System compares guesses to actuals → Displays personalized message with name → Shows July arrival message
- Success criteria: Correct message shown based on accuracy, personalized with player name, Toto reference for winners

## Edge Case Handling
- **Incomplete form**: Submit button remains disabled until name and both gender selections are made
- **Countdown interruption**: Countdown cannot be stopped once started, ensuring consistent experience
- **Rapid clicking**: Submit button disabled during countdown and after reveal to prevent duplicate submissions
- **Long names**: Text input handles overflow gracefully with ellipsis or scrolling
- **Mobile orientation**: Layout adapts to portrait and landscape orientations

## Design Direction
The design should evoke joy, celebration, and warm anticipation - like unwrapping a precious gift. Think baby shower pastels meets modern celebration with playful touches that feel special without being overly cutesy.

## Color Selection

- **Primary Color**: Soft lavender `oklch(0.85 0.08 295)` - Represents the joy and wonder of new life, gender-neutral and celebratory
- **Secondary Colors**: 
  - Baby Blue `oklch(0.75 0.12 240)` for boy cakes and accents
  - Baby Pink `oklch(0.80 0.14 350)` for girl cakes and accents
  - Warm Cream `oklch(0.96 0.02 85)` for boxes and backgrounds
- **Accent Color**: Cheerful Gold `oklch(0.75 0.15 85)` for buttons, highlights, and celebration moments
- **Foreground/Background Pairings**: 
  - Primary Background (Warm Cream `oklch(0.96 0.02 85)`): Deep Plum text `oklch(0.25 0.08 295)` - Ratio 12.1:1 ✓
  - Accent Gold (`oklch(0.75 0.15 85)`): Deep Plum text `oklch(0.25 0.08 295)` - Ratio 4.8:1 ✓
  - Blue Cake (`oklch(0.75 0.12 240)`): White text `oklch(1 0 0)` - Ratio 5.2:1 ✓
  - Pink Cake (`oklch(0.80 0.14 350)`): Deep Plum text `oklch(0.25 0.08 295)` - Ratio 7.8:1 ✓

## Font Selection
Typefaces should feel warm, friendly, and celebratory while maintaining excellent readability - like an invitation to a special event.

- **Primary Font**: Fredoka (rounded, friendly, modern sans-serif)
- **Typographic Hierarchy**: 
  - H1 (App Title): Fredoka SemiBold/32px/normal spacing
  - H2 (Labels/Questions): Fredoka Medium/20px/tight spacing
  - Body (Instructions): Fredoka Regular/16px/relaxed line-height
  - Countdown: Fredoka Bold/72px/tight spacing for drama
  - Button Text: Fredoka Medium/18px/wide letter spacing for emphasis

## Animations
Animations create moments of delight and build suspense at key interaction points - celebrate every action while making the reveal unforgettable.

- **Gender selection**: Gentle scale and color shift on click (150ms) with soft bounce
- **Submit button**: Lift effect on hover, press animation on click
- **Countdown**: Each number fades in with scale pulse (800ms), final second intensifies
- **Box opening**: Lids rotate open smoothly (1200ms ease-out) with slight overshoot for satisfaction
- **Cake reveal**: Cakes fade and scale in (500ms) after boxes open
- **Results message**: Gentle slide up with fade in (400ms)

## Component Selection
- **Components**: 
  - Card for main container and cake boxes (with custom border and shadow modifications)
  - Button for submit and gender selection toggles (Fredoka font, custom colors)
  - Input for name field (soft border-radius to match theme)
  - Badge for countdown display (oversized, centered, pulsing)
  - Alert or custom div for results messaging
- **Customizations**: 
  - Custom cake box component with lid and base using div elements
  - Cake illustration using CSS shapes or emoji (🎂) with color filters
  - Toggle button group for gender selection with distinct active states
- **States**: 
  - Buttons: Default (soft shadow), Hover (lift), Active (pressed), Disabled (muted opacity)
  - Gender toggles: Unselected (cream/border), Selected Boy (light blue fill), Selected Girl (light pink fill)
  - Input: Default (subtle border), Focus (gold ring glow), Filled (slight background tint)
  - Boxes: Closed (intact), Opening (animated rotation), Open (lid rotated 90deg+)
- **Icon Selection**: 
  - Baby icon or gift box icon for header decoration
  - Heart icons for congratulations message
  - Sparkles for celebration moments
- **Spacing**: 
  - Container padding: p-6 (24px)
  - Card gaps: gap-8 (32px) for major sections
  - Button padding: px-8 py-3
  - Mobile padding reduced: p-4 (16px)
- **Mobile**: 
  - Stack boxes vertically on screens <640px
  - Reduce countdown font size to 56px on mobile
  - Full-width buttons and inputs on mobile
  - Touch-friendly 44px minimum hit areas for all interactive elements
