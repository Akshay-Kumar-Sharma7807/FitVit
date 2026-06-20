## Project Name
FitVit

## Elevator Pitch
FitVit is your personal AI wellness companion, designed to make healthy living simple and accessible. Get personalized diet plans, AI-generated workout routines, and mindful support, all tailored to your unique goals.

## The Inspiration (What problem does it solve?)
In today's fast-paced world, maintaining a healthy lifestyle can be overwhelming. Juggling diet, exercise, and mental well-being often involves confusing information and expensive services. FitVit was born from the desire to simplify wellness. We wanted to create a single, intuitive platform that provides personalized, AI-driven guidance, making it easier for anyone, especially busy students, to achieve their health goals without the guesswork.

## How we built it (What it does & How it was built)
FitVit is a full-stack web application built with the Next.js App Router for a fast, modern user experience. The frontend is crafted with React, TypeScript, and styled with Tailwind CSS and ShadCN UI components for a clean, responsive interface.

The core AI functionality is powered by Google's Gemini models through Genkit. We've implemented several AI flows:
*   **Personalized Diet Guide:** Takes user goals (like muscle building or skin health) and generates custom meal and recipe suggestions.
*   **AI Workout Generator:** Creates tailored workout plans with video links, based on the user's fitness level, preferred activity, and desired duration.
*   **Smart Shopping Assistant:** Analyzes the generated diet plan to create automated grocery and supplement shopping lists.

This architecture allows our AI agents to provide intelligent, context-aware support for the user's entire wellness journey.

## Challenges we ran into
One of the main challenges was designing effective prompts for the AI agents. Ensuring the generated diet and workout plans were not only relevant but also safe, practical, and well-structured required significant iteration. Structuring the output with Zod schemas in Genkit was crucial for reliability, but tuning the prompts to consistently produce valid JSON took time and experimentation. Another challenge was integrating the separate AI flows into a cohesive user experience, like passing the output from the diet generator to the smart shopping assistant.

## Accomplishments that we're proud of
We are particularly proud of the agentic AI capabilities. The way the diet generator seamlessly feeds into the shopping list assistant creates a truly helpful and automated workflow for the user. We are also proud of the clean, user-friendly interface. Using ShadCN and Tailwind CSS allowed for the rapid development of a professional-looking and responsive design that feels great to use.

## What we learned
This project was a deep dive into building practical AI-powered applications. We learned a ton about prompt engineering, structured data output with LLMs, and how to use a framework like Genkit to organize and manage AI flows. We also gained more experience with the Next.js App Router and server components, which was key to building a performant application.

## What's next for FitVit
The future for FitVit is exciting! We plan to expand the community features, allowing users to share progress and form groups. We also want to integrate with fitness trackers to automatically log workouts and with online grocery services to make the Smart Shopping feature even more seamless. Another goal is to add more complex AI agents that can track progress over time and proactively adjust user plans based on their performance and feedback.

## Built With
* next.js
* react
* typescript
* tailwindcss
* shadcn-ui
* genkit
* google-gemini

## Try it out
- **Live App URL:** [Link to your live demo]
- **GitHub Repo:** [Link to your GitHub repository]
- **Video Demo:** [Link to your YouTube/Vimeo demo]
