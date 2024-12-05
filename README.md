<h1 align="center">Let's Cook🥗</h1>

<br/>

### 📃 Description

__Let's Cook__ is a recipe application built with __Next.js__ and __Typescript.__ It allow users to:

* Explore recipes and add them to favorites.
* Manage a culinary blog, with articles and associated themes.
* Create, edit and delete recipes and articles.
* Download recipes in PDF format.
* Authenticate with Google, email or GitHub via Clerk

---

### ⚙️ Technologies used

* __[Next.js](https://nextjs.org/)__: A React framework for server-side rendering and full-stack capabilities.
* __TypeScript__: A Javascript superset for static typing.
* __[Prisma ORM](https://www.prisma.io/)__: For database management and interactions with MongoDB.
* __[MongoDB](https://www.mongodb.com/fr-fr)__: A NoSQL database for storing recipes, articles, aso.
* __[Clerk](https://clerk.com/)__: For user authentication and authorization management.
* __[Swiper React](https://swiperjs.com/react)__: For carousel showcasing recipes.
* __[HeadlessUI](https://headlessui.com/)__: For UI components.
* __[TailwindCSS](https://tailwindcss.com/)__:
* __[jsPDF](https://artskydj.github.io/jsPDF/docs/jsPDF.html)__: For PDF generation.

---

### Prerequisites

Before running this projets, ensure you have the following installed on your machine: 

* __[Node.js](https://nodejs.org)__:  `v16.0.0` or higher

* __[Clerk](https://clerk.com/)__:  A configured account

---

### Running locally in development mode


#### 1. __Clone the projet:__
   
```
git clone https://github.com/PaulineFranck98/next-recipe-project-cda.git
```
<br/>

#### 2. __Install dependencies:__

```
npm install
```
<br/>

#### 3. __Configure environment variables:__

Create a `.env` file in the root directory and add your MongoDB URL: 
```
DATABASE_URL="Your MongoDB URL"
```
<br/>

Create a `.env.local` file in the root directory and paste your Clerk API Credentials:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<Your Publishable Key>"
CLERK_SECRET_KEY="<Your Clerk Secret Key>"
```
<br/>

#### 4. __Set up Prisma:__

Generate the Prisma client:
```
npx prisma generate
```

Apply Prisma migrations:
```
npx prisma db push
```

You can also access a visual editor for the data in your database by running:
```
npx prisma studio
```
<br/>

#### 5. __Start the application:__
```
npm run dev
```

The application should now be running at http://localhost:3000
