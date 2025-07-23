import { Todo } from "@/components/TodoCard";
import { todos } from "@/services/todos";
import { useCallback, useEffect, useState } from "react";

export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export type StatusState = (typeof STATUS)[keyof typeof STATUS];

export const logErrorMessage = (error: unknown): string => {
  let message;

  if (error instanceof Error) {
    message = error.message;
    console.error(`Failed to fetch todos: `, message);
  } else {
    message = `Something went wrong.`;
    console.error(`Failed to fetch todos: `, message);
  }

  return message;
};

export const useTodos = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [status, setStatus] = useState<StatusState>(STATUS.IDLE);
  const [error, setError] = useState<string | null>(null);

  const isLoading = status === STATUS.LOADING;
  const isError = status === STATUS.ERROR;
  const isSuccess = status === STATUS.SUCCESS;

  const performFetchTodos = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setError(null);
    try {
      const response = await todos.fetchTodos();
      setData(response);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      const message = logErrorMessage(error);

      setData([]);
      setError(message);
      setStatus(STATUS.ERROR);
    }
  }, []);

  useEffect(() => {
    performFetchTodos();
  }, [performFetchTodos]);

  return {
    data,
    status,
    error,
    performFetchTodos,
    isLoading,
    isSuccess,
    isError,
  };
};
