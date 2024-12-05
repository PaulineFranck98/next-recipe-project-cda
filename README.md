<h1 align="center">Let's Cook🥗🍲</h1>

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

* __Next.js__: A React framework for server-side rendering and full-stack capabilities.
* __TypeScript__: A Javascript superset for static typing.
* __Prisma ORM__: For database management and interactions with MongoDB.
* __MongoDB__: A NoSQL database for storing recipes, articles, aso.
* __Clerk__: For user authentication and authorization management.
* __Swiper React__: For carousel showcasing recipes.
* __HeadlessUI__: For UI components.
* __TailwindCSS__:
* __jsPDF__: For PDF generation.

---

### Prerequisites

Before running this projets, ensure you have the following installed on your machine: 

* __Node.js__: `v16.0.0` or higher

* __npm__: `v7.10.0` or higher

* __Clerk__: A configured account

---

### Running locally in development mode


__Clone the projet:__
   
```
git clone https://github.com/PaulineFranck98/next-recipe-project-cda.git
```
<br/>

__Install dependencies:__

```
npm install
```
<br/>

__Configure environment variables:__

create a `.env` file in the root directory and add your MongoDB URL: 
```
DATABASE_URL="Your MongoDB URL"
```

create a `.env.local` file int the root directory and paste your Clerk API Credentials:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<Your Publishable Key>"
CLERK_SECRET_KEY="<Your Clerk Secret Key>"
```

