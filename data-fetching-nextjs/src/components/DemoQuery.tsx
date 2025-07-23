"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TodoCard, { Todo } from "./TodoCard";
// import { demoTodos } from "@/demo";



export type TodoInput = Omit<Todo, "completed">;

const initialInputTodo: TodoInput = {
  title: "",
  todo: "",
  para: "",
};

function DemoQuery() {
  // const query = useQuery({
  //   queryFn: () => fetchTodos(),
  //   queryKey: ["todos"]
  // });
  const queryClient = useQueryClient();

  const [search, setSearch] = useState<string>("");
  const [inputTodo, setInputTodo] = useState<TodoInput>(initialInputTodo);

  const {
    data: todos,
    isLoading, // only for first execution
    error,
    isError,
    isFetching, // for everytime query executes to fetch
  } = useQuery<Todo[]>({
    queryFn: () => fetchTodos(search),
    queryKey: ["todos", { search }],
    staleTime: Infinity,
    // gcTime: 0, // cache validation time limit
    select: (data) => data || [], // if data -> undefined or null -> return empty array
  });

  // mutation
  // const {mutate, mutateAsync} = useMutation({
  //   mutationFn: addTodo,
  // });
  const { mutateAsync: addTodoMutation, isPending } = useMutation({
    mutationFn: addTodo,

    // it runs before the mutation happens
    onMutate: () => {
      // can be used to pass context to other methods in useMututaion, cancel queries, storing prev data for rollback, etc
      // optimistic updates
    },

    onSuccess: (newTodo: Todo) => {
      // cache invalidation on success -> use useQueryClient
      // queryClient.invalidateQueries(["todos"]);

      // overwrite cached data and add the new data into it
      // pass the complete key array to set -> do leave options keys or such as {search} -> else this will create another cache with different key
      queryClient.setQueryData(["todos", { search: "" }], (prevTodos: Todo[]) =>
        prevTodos ? [...prevTodos, newTodo] : [newTodo]
      );
      // This assumes you're always viewing the unfiltered todos (empty search).


      
    },

    onError: (error) => {
      console.error("Mutation error: ", error);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTodo = async () => {
    try {
      await addTodoMutation(inputTodo);
      setInputTodo(initialInputTodo);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error while adding todo:: ${error.message}`);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("data: ", todos);

  return (
    <div>
      <div className="input-container max-w-lg flex flex-col gap-4 mb-8">
        <input
          type="text"
          name="title"
          value={inputTodo.title}
          placeholder="title"
          className="px-3 py-2 rounded bg-gray-900 outline-0 ring-1 ring-gray-200/50"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="todo"
          value={inputTodo.todo}
          placeholder="todo"
          className="px-3 py-2 rounded bg-gray-900 outline-0 ring-1 ring-gray-200/50"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="para"
          value={inputTodo.para}
          placeholder="para"
          className="px-3 py-2 rounded bg-gray-900 outline-0 ring-1 ring-gray-200/50"
          onChange={handleInputChange}
        />

        <button onClick={handleAddTodo} disabled={isPending}>
          Add Todo
        </button>
      </div>
      <ul className="space-y-4">
        {Array.isArray(todos) &&
          todos.map((todo, idx) => (
            <li key={`todo-${idx}`}>
              <TodoCard todo={todo} />
            </li>
          ))}
      </ul>
      {isError ? <p>{error.message}</p> : null}
    </div>
  );
}

export default DemoQuery;
