# Fintrixx - A Finance Web App

A modern web application for tracking personal finances, built with Next.js and Clerk authentication.

## Features

- User authentication with Clerk
- Budget management
- Expense tracking
- Income tracking
- Visual analytics with charts
- Responsive design

## Tech Stack

- Next.js 14
- React
- Tailwind CSS
- Clerk Authentication
- Drizzle ORM
- Neon Database
- Recharts for data visualization

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_neon_database_url
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
finance-tracker/
├── app/
│   ├── (routes)/
│   │   └── dashboard/
│   │       ├── budgets/
│   │       ├── expenses/
│   │       └── income/
│   ├── api/
│   └── layout.jsx
├── components/
│   └── ui/
├── utils/
└── public/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
