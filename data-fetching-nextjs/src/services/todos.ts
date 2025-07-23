import { TodoInput } from "@/components/DemoQuery";
import { Todo } from "@/components/TodoCard";

export const todos = {
  fetchTodos: async (query = ""): Promise<Todo[]> => {
    console.log("query in fetchtodo: ", query);

    return await fetch("/api/todos", {
      // cache: "no-cache", // -> to disable the caching or make the route dynamic
      next: { // Next.js specific option in fetch API -> only two fields inside it as of next.js 15.3.4
        revalidate: 3600, // to invalidate the cache after the specficied time (in seconds)
        // revalidate: false, // to retain cache for indefinite || infinity time 
        tags: ["posts", "all-content"], // tags -> can be used to revalidate cache on-demand
        // The max length for a custom tag is 256 characters and the max tag items is 128.
      },

    }).then((data) => data.json());
  },

  addTodo: async (todo: TodoInput): Promise<Todo> => {
    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
    }).then((data) => data.json());

    const addedTodo: Todo = {
      title: response.title,
      para: response.para,
      completed: response.completed,
      todo: response.todo,
    };

    return addedTodo;
  },
};
