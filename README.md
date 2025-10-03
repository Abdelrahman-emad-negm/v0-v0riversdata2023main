# Rivers Data - Water Conservation Platform

A comprehensive educational platform dedicated to raising awareness about the world's most important rivers and promoting water conservation practices.

## Overview

This Next.js application provides interactive educational content about major rivers including the Amazon, Nile, and Yangtze. It features specialized sections for different audiences including students, adults, and farmers, each with tailored water conservation strategies and interactive learning tools.

## Features

- **River Information**: Detailed pages about major rivers with environmental data and challenges
- **Interactive Learning**: Quizzes and games for students to learn about water conservation
- **Adult Water Calculator**: Track daily water usage and get personalized conservation tips
- **Farmer Resources**: Agricultural water management techniques and sustainable farming practices
- **Tree Planting Verification**: AI-powered image analysis to verify tree planting activities
- **Responsive Design**: Fully responsive interface with dark mode support

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Image Processing**: Python with OpenCV for tree detection
- **TypeScript**: Full type safety throughout the application

## Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3.8+ (for tree detection features)

### Installation

1. Clone the repository
\`\`\`bash
git clone <your-repo-url>
cd riversdata27main
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Python Setup (for tree detection)

\`\`\`bash
pip install opencv-python numpy pillow
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── adults/          # Adult water conservation section
│   ├── farmers/         # Farmer resources and practices
│   ├── students/        # Student quizzes and games
│   ├── rivers/          # Individual river pages
│   └── page.tsx         # Homepage
├── components/          # Reusable UI components
├── scripts/            # Python scripts for image processing
└── public/             # Static assets
\`\`\`

## Deployment

This project can be deployed on Vercel:

\`\`\`bash
npm run build
\`\`\`

Then push to your Git repository and connect it to Vercel for automatic deployments.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for educational purposes.

## Contact

For questions or feedback, please open an issue in the repository.
