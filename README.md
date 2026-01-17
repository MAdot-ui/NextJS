# 06 Client side rendering

Let's works with Nextjs using client side rendering.

We will start from `05-server-side-rendering`.

# Steps to build it

`npm install` to install previous sample packages:

```bash
npm install
```

# Client Side Rendering

If we don't need to pre-render the data and frequently updating data.

- Enable you to add client-side interactivity.
- Need to use `'use client'` directive.
- You cannot use Server Components inside a client-side component but you can use Server Components as children of a client-side component.
- [More info about Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

Let's look up the api method to book a house:

_./src/pods/house/api/house.api.ts_

```typescript
import { ENV } from '#core/constants';
import { House } from './house.api-model';

const url = `${ENV.BASE_API_URL}/houses`;

export const bookHouse = async (house: House): Promise<boolean> => {
  await fetch(`${url}/${house.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(house),
  });
  return true;
};
```

And how are we using it:

_./src/pods/house/house.component.tsx_

```typescript
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { routeConstants } from '#core/constants';
import * as api from './api';
import { mapHouseFromVmToApi } from './house.mappers';

const handleBook = async () => {
  try {
    const apiHouse = mapHouseFromVmToApi({
      ...house,
      isBooked: !house.isBooked,
    });
    await api.bookHouse(apiHouse);
    router.push(routeConstants.houseList);
  } catch (error) {
    console.error({ error });
  }
};
```

Run:

```bash
npm run start:api-server
npm run build
npm run start:prod
```

> Check 404 on request `http://localhost:8080/houses/undefined/houses/1`
>
> The `image url` is working because we are using the `mapper` in a Server Component.

Why it doesn't work? Because we are using `use client` directive and the environment variable is only available on server side:

_./.env.local_

```diff
- BASE_API_URL=http://localhost:3001/api
+ NEXT_PUBLIC_BASE_API_URL=http://localhost:3001/api
BASE_PICTURES_URL=http://localhost:3001
IMAGES_DOMAIN=localhost

```

_./src/core/constants/env.constants.ts_

```diff
export const ENV = {
- BASE_API_URL: process.env.BASE_API_URL,
+ BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
  BASE_PICTURES_URL: process.env.BASE_PICTURES_URL,
};

```

Run again:

```bash
npm run start:api-server
npm run build
npm run start:prod
```

On the other hand, we cannot use client-side interactivity in a Server Component but how can we implement a global `React context`?:

_./src/app/layout.tsx_

```diff
import 'normalize.css';
import './material-icons.css';
import React from 'react';
import { Inter } from 'next/font/google';

+ const ThemeContext = React.createContext(null);

+ const ThemeProvider = ({ children }) => {
+   const darkTheme = {
+     primary: '#001e3c',
+     contrastText: '#ffffff',
+   };
+   const lightTheme = {
+     primary: '#ffffff',
+     contrastText: '#000000',
+   };
+   const [theme, setTheme] = React.useState(lightTheme);

+   const onToggleThemeMode = () => {
+     const newTheme =
+       theme.primary === lightTheme.primary ? darkTheme : lightTheme;
+     setTheme(newTheme);
+   };
+
+   return (
+     <ThemeContext.Provider value={{ theme, onToggleThemeMode }}>
+       {children}
+     </ThemeContext.Provider>
+   );
+ };

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

interface Props {
  children: React.ReactNode;
}

const RootLayout = (props: Props) => {
  const { children } = props;
  return (
    <html lang="en" className={inter.className}>
      <body>
+       <ThemeProvider>
          <main>{children}</main>
+       </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

```

It throws the error: `TypeError: createContext only works in Client Components. Add the "use client" directive`. But we can use like:

_./src/core/theme.context.tsx_

```tsx
'use client';
import React from 'react';

interface Context {
  theme: {
    primary: string;
    contrastText: string;
  };
  onToggleThemeMode: () => void;
}

export const ThemeContext = React.createContext<Context>(null);

export const ThemeProvider = ({ children }) => {
  const darkTheme = {
    primary: '#001e3c',
    contrastText: '#ffffff',
  };
  const lightTheme = {
    primary: '#ffffff',
    contrastText: '#000000',
  };
  const [theme, setTheme] = React.useState(lightTheme);

  const onToggleThemeMode = () => {
    const newTheme =
      theme.primary === lightTheme.primary ? darkTheme : lightTheme;
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, onToggleThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

You cannot use a ServerComponent inside Client Component but you can pass a Server Component as prop:

_./src/app/layout.tsx_

```diff
import 'normalize.css';
import './material-icons.css';
import React from 'react';
import { Inter } from 'next/font/google';
+ import { ThemeProvider } from '#core/theme.context';

- const ThemeContext = React.createContext({});

- const ThemeProvider = ({ children }) => {
-   const darkTheme = {
-     primary: '#001e3c',
-     contrastText: '#ffffff',
-   };
-   const lightTheme = {
-     primary: '#ffffff',
-     contrastText: '#000000',
-   };
-   const [theme, setTheme] = React.useState(lightTheme);

-   const onToggleThemeMode = () => {
-     const newTheme =
-       theme.primary === lightTheme.primary ? darkTheme : lightTheme;
-     setTheme(newTheme);
-   };
-
-   return (
-     <ThemeContext.Provider value={{ theme, onToggleThemeMode }}>
-       {children}
-     </ThemeContext.Provider>
-   );
- };

...
```

Run again:

```bash
npm run start:api-server
npm run build
npm run start:prod
```

Using theme:

_./src/pods/houses-list/components/nav.component.tsx_

```tsx
'use client';
import { ThemeContext } from '#core/theme.context';
import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Nav: React.FC<Props> = (props) => {
  const { children, className } = props;
  const { theme, onToggleThemeMode } = React.useContext(ThemeContext);
  return (
    <nav
      className={className}
      style={{ backgroundColor: theme.primary, color: theme.contrastText }}
    >
      {children}
      <button style={{ marginLeft: 'auto' }} onClick={onToggleThemeMode}>
        Toggle theme
      </button>
    </nav>
  );
};
```

_./src/pods/houses-list/components/index.ts_

```typescript
export * from './house-item.component';
export * from './nav.component';
```

_./src/app/houses/layout.tsx_

```typescript
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Nav } from '#pods/houses-list';
import classes from './layout.module.css';

interface Props {
  children: React.ReactNode;
}

const HousesLayout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Nav className={classes.nav}>
        <Link href="/" className={classes.link}>
          <Image src="/home-logo.png" alt="logo" width="32" height="23" />
        </Link>
        <h1 className={classes.title}>Rent a house</h1>
      </Nav>
      <div className={classes.content}>{children}</div>
    </>
  );
};

export default HousesLayout;
```

## Project Structure

This project demonstrates client-side rendering in Next.js with a house rental application:

- **API Server**: Mock API server running on port 3001 (`api-server/`)
- **Frontend**: Next.js application with:
  - House list page (`/houses`)
  - House detail page (`/houses/[houseId]`)
  - Theme context for dark/light mode toggle
  - Client-side interactivity for booking houses

### Key Features

- Client-side rendering with `'use client'` directive
- Environment variables for API configuration (`NEXT_PUBLIC_BASE_API_URL`)
- React Context for theme management
- Data mapping between API models and view models
- Server and Client Component separation

### Routes

- `/` - Home page
- `/houses` - House list (Server Component)
- `/houses/[houseId]` - House details (Server Component with Client Component for interactivity)

### Data Models

The application uses two data models:

**API Model** (`house.api-model.ts`):

- Uses `image` (string) for image URLs
- Uses `amenities` (string[]) for features
- Includes additional fields like `description`, `address`, `bedrooms`, `price`, `reviews`, etc.

**View Model** (`house.vm.ts`):

- Uses `imageUrl` (string) with full URL (includes BASE_PICTURES_URL)
- Uses `features` (string[]) mapped from amenities
- Includes `isBooked` (boolean) for booking state

The mappers (`house.mappers.ts` and `house-list.mappers.ts`) handle the transformation between these models.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
