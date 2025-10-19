# Level Up - Open Source Learn-to-Earn Platform

A modern, open-source learning platform that rewards users with points, levels, and blockchain-ready NFT certificates for completing courses. Designed for community-driven curriculum development with GitHub integration.

## 🎯 Vision

Level Up democratizes online learning by:

- **Community-Driven Curriculum**: Anyone can contribute lessons via GitHub PRs
- **Learn-to-Earn Model**: Earn points and tokens for completing courses
- **Blockchain-Ready**: NFT certificates prepared for Web3 integration
- **Open Source**: MIT licensed, fully transparent and extensible
- **Peer Learning**: Built-in peer review and discussion systems

## ✨ Features

### User Experience

- 🔐 **Secure Authentication**: Email/password with Supabase Auth
- 📚 **Browse Courses**: Filter and sort curated courses
- 📖 **Interactive Lessons**: Markdown-based lessons with progress tracking
- 📊 **Personal Dashboard**: Stats, progress, and learning recommendations
- 👤 **User Profile**: Manage wallet, view certificates, claim tokens
- 🎖️ **Achievement System**: Level up every 500 points
- 🪙 **Token Rewards**: Claim tokens upon level-up (10→50→70→100→150→200)

### Learning Management

- ⏱️ **Progress Tracking**: Auto-save lesson completion with timestamps
- 📈 **Points System**:
  - 10 points per lesson completed
  - 15 points per assignment submitted
  - Auto-level calculation: Level = floor(total_points / 500) + 1
- 🎯 **Course Enrollment**: Track multiple courses simultaneously
- 🏆 **Completion Certificates**: NFT-ready certificate generation

### Content Management

- 🔗 **GitHub Integration**: Fetch courses and lessons from GitHub
- 📝 **Markdown Lessons**: Write lessons in Markdown, stored in Git
- 🔄 **Auto-Sync**: Edge Functions sync GitHub changes to Supabase
- 🛠️ **Easy Contributions**: Contributors add courses via PR, auto-available after merge

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier available)
- GitHub account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/levelupdevs1/levelup-curriculum.git
   cd levelup-curriculum
   npm install
   ```

2. **Set up Supabase**

   - Create free project at [supabase.com](https://supabase.com)
   - Run SQL schema (see [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md))
   - Deploy Edge Function: `supabase functions deploy sync-courses`

3. **Configure environment**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   # Open http://localhost:5173
   ```

### First Time Setup

1. **Signup**: Create account with email, username, and password
2. **Browse Courses**: Check out available courses on `/courses`
3. **Enroll**: Click "Enroll Now" on any course
4. **Learn**: Complete lessons to earn points
5. **Claim Tokens**: Navigate to profile when you level up
6. **View Progress**: Dashboard shows your stats and recommendations

## 📁 Project Structure

```
level-up/
├── src/
│   ├── components/          # Reusable React components
│   ├── contexts/            # Global state (UserContext, CourseContextSupabase)
│   ├── pages/               # Page components
│   │   ├── Dashboard/       # User overview and stats
│   │   ├── CourseCatalog/   # Browse and enroll
│   │   ├── LessonViewer/    # View lessons and complete
│   │   ├── Profile/         # User settings and token claiming
│   │   └── ...
│   ├── utils/
│   │   └── courseUtils.js   # 20+ functions for course/progress management
│   ├── config/
│   │   └── supabaseConfig.js # Supabase client setup
│   ├── router.jsx           # Route configuration
│   ├── App.jsx              # Root component with providers
│   └── main.jsx             # Entry point
├── supabase/
│   └── functions/
│       └── sync-courses/    # Edge Function for GitHub→Supabase sync
├── courses/                 # Course content (GitHub repo)
│   ├── web-development-basics/
│   ├── react-fundamentals/
│   └── javascript-advanced/
├── SUPABASE_INTEGRATION.md  # Database setup guide
├── TESTING_GUIDE.md         # Complete testing checklist
├── DEPLOYMENT_GUIDE.md      # Production deployment instructions
└── package.json
```

## 🗄️ Database Architecture

Level Up uses Supabase PostgreSQL with 7 core tables:

| Table          | Purpose                                         |
| -------------- | ----------------------------------------------- |
| `users`        | User profiles, points, levels, wallet addresses |
| `courses`      | Course metadata and structure                   |
| `enrollments`  | Track user course enrollments                   |
| `progress`     | Lesson completion records with timestamps       |
| `completions`  | Full course completions (NFT-ready)             |
| `token_claims` | Token claim history per level                   |
| `submissions`  | Assignment submissions (future)                 |

See [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md) for full schema.

## 🔑 Key Functions

### Course Management

```javascript
// Fetch all courses from Supabase
const courses = await fetchAllCourses();

// Get specific course
const course = await fetchCourseById(courseId);

// Fetch lesson content from GitHub
const markdown = await fetchLessonMarkdown(courseId, filePath);
```

### Progress Tracking

```javascript
// Record lesson completion (auto-updates points/level)
await recordLessonCompletion(userId, courseId, moduleId, lessonId, points);

// Get course progress percentage
const progress = await getCourseProgress(userId, courseId);
// Returns: { completedLessons: 5, totalLessons: 20, percentage: 25 }
```

### User Management

```javascript
// Award points (auto-calculates new level)
await addPoints(userId, 10);

// User details are in global context
const { user } = useUser();
// { id, full_name, username, total_points, current_level, wallet_address }
```

See [courseUtils.js](./src/utils/courseUtils.js) for all 20+ functions.

## 🎓 Contributing Content

### Add a New Course

1. **Fork the repository**
2. **Create course structure**

   ```
   courses/
   └── my-awesome-course/
       ├── course.json
       ├── module-1/
       │   └── lesson-1.md
       │   └── lesson-2.md
       └── module-2/
           └── lesson-1.md
   ```

3. **Write course.json**

   ```json
   {
     "id": "my-awesome-course",
     "title": "My Awesome Course",
     "description": "Learn awesome things",
     "level": "Beginner",
     "duration": "10 hours",
     "modules": [
       {
         "id": "module-1",
         "title": "Module 1",
         "lessons": [
           {
             "id": "lesson-1",
             "title": "Lesson 1",
             "type": "lesson",
             "filePath": "module-1/lesson-1.md",
             "points": 10
           }
         ]
       }
     ]
   }
   ```

4. **Write lessons in Markdown**

   ```markdown
   # Lesson Title

   ## Learning Objectives

   - Understand concept X
   - Build project Y

   ## Content

   Your lesson content here...

   ## Practice Exercise

   Try building something...
   ```

5. **Submit PR** and it will be auto-available after merge!

See [DEVELOPMENT_PROMPTS.md](./DEVELOPMENT_PROMPTS.md) for detailed contributor guidelines.

## 🧪 Testing

Before deploying, run the comprehensive test suite:

```bash
npm run dev
# Follow steps in TESTING_GUIDE.md
```

Test checklist includes:

- ✅ Authentication (signup, login)
- ✅ Course enrollment
- ✅ Lesson completion and progress tracking
- ✅ Points and level-up calculations
- ✅ Token claiming
- ✅ Profile management
- ✅ Error handling

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for complete checklist.

## 🚀 Deployment

### Development

```bash
npm run dev      # Start dev server on localhost:5173
npm run build    # Build for production
npm run preview  # Preview production build
```

### Production

Choose your deployment platform:

1. **Vercel (Recommended)** - Zero-config deployment

   ```bash
   npm install -g vercel
   vercel
   ```

2. **GitHub Pages** - Static hosting

   ```bash
   npm run build
   npm run deploy
   ```

3. **Self-Hosted** - Docker container
   ```bash
   docker build -t levelup .
   docker run -p 3000:3000 levelup
   ```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for full instructions.

## 🔧 Tech Stack

### Frontend

- **React** 18+ - UI library
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Supabase JS Client** - Backend integration
- **Lucide React** - Icons
- **CSS Modules** - Component styling

### Backend

- **Supabase** - PostgreSQL database + Auth + Edge Functions
- **PostgreSQL** - Relational database
- **Row Level Security** - User data isolation
- **TypeScript** - Edge Function type safety

### Infrastructure

- **GitHub** - Content management (lessons)
- **Supabase Edge Functions** - GitHub→DB sync
- **Vercel/Netlify** - Frontend hosting (optional)

## 📊 Architecture Diagram

```
User Browser
    ↓
Frontend (React + Vite)
    ↓
Supabase Client
    ├→ Supabase Auth (Signup/Login)
    ├→ PostgreSQL (Courses, Progress, Users)
    └→ Edge Functions (Course Sync)
    ↓
GitHub API
    ↓
Markdown Lessons (Raw URL)
```

## 🔐 Security

- ✅ All authentication via Supabase Auth
- ✅ Row Level Security (RLS) on all tables
- ✅ API keys in environment variables only
- ✅ HTTPS enforced in production
- ✅ User data isolated per-user via RLS

## 📈 Roadmap

### Phase 1 (Current MVP) ✅

- [x] User authentication and profiles
- [x] Browse and enroll in courses
- [x] Complete lessons and track progress
- [x] Earn points and level up
- [x] Claim tokens
- [x] GitHub-based content management

### Phase 2 (Coming Soon)

- [ ] Assignment submission system
- [ ] Peer review functionality
- [ ] Discussion forums
- [ ] Admin panel for course management
- [ ] AI-assisted code review

### Phase 3 (Blockchain Integration)

- [ ] MetaMask wallet connection
- [ ] NFT certificate minting
- [ ] Token smart contracts
- [ ] On-chain reputation system

### Phase 4 (Advanced Features)

- [ ] Bounty system
- [ ] Hackathon integration
- [ ] Streaming video lessons
- [ ] Interactive coding challenges
- [ ] Gamification leaderboards

## 🤝 Contributing

We welcome contributions! Whether you're adding courses, fixing bugs, or improving features:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

See [DEVELOPMENT_PROMPTS.md](./DEVELOPMENT_PROMPTS.md) for detailed guidelines.

## 📝 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 💬 Support & Community

- **Issues**: Report bugs on [GitHub Issues](https://github.com/levelupdevs1/levelup-curriculum/issues)
- **Discussions**: Join [GitHub Discussions](https://github.com/levelupdevs1/levelup-curriculum/discussions)
- **Twitter**: Follow [@LevelUpDevs](https://twitter.com/levelupdevs)
- **Discord**: Join our community (coming soon)

## 🙏 Acknowledgments

- Built with ❤️ by the Level Up community
- Inspired by platforms like freeCodeCamp and Educative
- Powered by Supabase, Vercel, and GitHub

## 📞 Contact

Have questions or want to collaborate?

- Email: [team@levelupdevs.com](mailto:team@levelupdevs.com)
- GitHub: [@levelupdevs1](https://github.com/levelupdevs1)

---

**Ready to level up?** Start learning at [your-app-url.com](https://your-app-url.com) 🚀
