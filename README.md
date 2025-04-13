# Mebuya Romantic Word Puzzle Game

A romantic word puzzle game where players guess words to reveal romantic sentences.

## Overview

Mebuya is a single-page application (SPA) that presents a series of romantic sentences (referred to as "seasons"). Each sentence comprises multiple words (referred to as "episodes"). The player's objective is to guess each word in the sentence correctly. Upon correctly guessing all words in a sentence, the full sentence is revealed with a smooth animation.

The game features a soft, romantic ambiance with pastel color tones, making it visually appealing and engaging for players who enjoy word puzzles with a romantic theme.

## Features

- **Multiple Romantic Sentences**: The game includes various romantic sentences in Turkish to guess.
- **Word Guessing Mechanics**: Players guess words with real-time feedback on correct/incorrect guesses.
- **Limited Attempts System**: Each word has a limited number of incorrect guesses allowed (burnRight).
- **Visual Feedback**: Words with exhausted attempts are displayed in red.
- **Automatic Focus Transition**: When a word is correctly guessed, focus automatically moves to the next word.
- **Word Hints**: Each word comes with a hint to assist players in guessing.
- **Horizontal Word Arrangement**: Words are displayed horizontally to reflect the natural flow of a sentence.
- **Smooth Animations**: Enjoy smooth animations when revealing words and completed sentences.
- **Season Navigation**: Navigate between different romantic sentences.
- **Game State Persistence**: Your progress is automatically saved to localStorage.
- **Background Music**: Optional background music enhances the romantic atmosphere.
- **Music Position Memory**: The game remembers where you left off in the background music.
- **Game Reset Option**: Reset the game to start fresh with a single click.
- **Responsive Design**: The UI adapts to different screen sizes for optimal experience.
- **Monospaced Font**: Uses monospaced font for consistent letter width and alignment.

## Technologies Used

- **TypeScript**: For type-safe code
- **React 19**: For building the user interface
- **Vite**: As the build tool and development server
- **Tailwind CSS v4**: For styling with utility classes
- **ShadCN UI**: For consistent UI components
- **Framer Motion**: For smooth animations
- **React Router**: For navigation
- **localStorage API**: For persisting game state

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn or bun

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mebuya
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## How to Play

1. **Starting the Game**: When you first open the game, you'll be asked if you want to enable background music.

2. **Understanding the Interface**:
   - The top of the screen shows the current season number and total seasons.
   - The game menu in the top-right corner provides options to toggle music and reset the game.
   - The main card displays the current romantic sentence puzzle.

3. **Guessing Words**:
   - Each word in the sentence is represented by underscores (_) indicating the number of letters.
   - Type your guess in the input field below each word.
   - The game validates your input in real-time as you type.
   - Each word has a hint displayed below its input field to help you guess.

4. **Feedback System**:
   - Correct guesses: The word is revealed and focus moves to the next word.
   - Incorrect guesses: The "Attempts left" counter decreases and you get an error message.
   - Burned words: If you use all your attempts, the word turns red and is revealed.

5. **Completing a Season**:
   - Once all words are guessed (or burned), the full romantic sentence is revealed with an animation.
   - The sentence is displayed along with a thematic emoji.

6. **Navigation**:
   - Use the "Previous Season" and "Next Season" buttons to navigate between different sentences.
   - You can move to the next season even if you haven't completed the current one.

7. **Game Controls**:
   - Toggle background music on/off from the game menu.
   - Reset the game to start fresh from the game menu.

## Game State and Persistence

The game automatically saves your progress to your browser's localStorage, including:

- Current season
- Guessed words
- Current inputs
- Incorrect attempts
- Completed seasons
- Music playback position

This means you can close the browser and return later to continue where you left off.

## Technical Architecture

The game is built with a component-based architecture using React. Key components include:

- **HomePage**: The main game component that manages game state and logic.
- **WordPuzzleContainer**: Manages the display of words and input fields.
- **WordPuzzleItem**: Handles individual word display and input.
- **CompletedSeason**: Displays the completed sentence with animation.
- **SeasonNavigation**: Provides navigation between seasons.
- **Header**: Contains the game title and menu.

Game state is managed using React's useState and useEffect hooks, with persistence handled through the localStorage API.

## Building for Production

To build the application for production:

```
npm run build
# or
yarn build
# or
bun build
```

The built files will be in the `dist` directory, which can be deployed to any static hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
