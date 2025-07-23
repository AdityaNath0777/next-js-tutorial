## Install TanStack Query

```bash
npm i @tanstack/react-query
```

### ES Lint plugin for tanstack query

```bash
npm i -D @tanstack/eslint-plugin-query
```

## Setup Query Provider

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    // this allows query hooks through context API
    <QueryClientProvider client={queryClient}></QueryClientProvider>
  );
};
```
