# WellGenius: Your Personal AI Wellness Companion

WellGenius is a full-stack web application designed to make healthy living simple, personal, and accessible. Using the power of generative AI, WellGenius provides users with tailored diet plans, workout routines, and smart tools to support their wellness journey.

## The Problem

In today's fast-paced world, maintaining a healthy lifestyle is a common goal, but it's often overwhelming. People face challenges like:
- **Information Overload:** Conflicting advice on diets and workouts.
- **Lack of Personalization:** Generic plans that don't fit individual goals, preferences, or fitness levels.
- **Time Constraints:** The effort required to plan meals, create workout schedules, and make shopping lists.

WellGenius tackles these problems by providing an intelligent, all-in-one platform that acts as a personal wellness expert.

## Features

- **🤖 AI-Powered Diet Guide**: Tell the AI your wellness goals (e.g., muscle building, skin health), dietary restrictions, and cuisine preferences. It will generate a personalized list of meal suggestions and recipe ideas.
- **🏃‍♀️ AI Workout Generator**: Get a custom workout routine tailored to your fitness level, preferred activity (yoga, cardio, etc.), and desired duration. Each exercise comes with a description and a link to a demonstration video.
- **🛒 Smart Shopping Assistant**: Let the AI analyze your diet plan and automatically generate a categorized shopping list for supplements and groceries, making your weekly shop effortless.
- **👥 Community & Classes**: Discover and join communities that match your interests, from yoga clubs to running groups and healthy cooking workshops.
- **📈 Progress Tracking**: Visualize your consistency with weekly charts, review your workout distribution, and use the calendar to track your activities and stay motivated.
- **👤 User Profile & Goals**: Set your primary wellness goals and manage your profile to keep your experience personalized.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI/ML**: [Google's Gemini on Genkit](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Getting Started

To run the project locally, you'll need to have Node.js and npm installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/wellgenius.git
    cd wellgenius
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key:
    ```
    GOOGLE_API_KEY=your_google_api_key_here
    ```

4.  **Run the development server:**
    The app runs on two processes: one for the Next.js frontend and one for the Genkit AI flows.

    In one terminal, run the Next.js app:
    ```bash
    npm run dev
    ```
    This will start the frontend on `http://localhost:9002`.

    In a second terminal, run the Genkit development server:
    ```bash
    npm run genkit:watch
    ```

5.  **Open the app:**
    Navigate to `http://localhost:9002` in your browser.
