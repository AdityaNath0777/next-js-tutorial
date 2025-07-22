import { demoTodos } from "@/demo";
// import { NextApiRequest } from "next";

export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("req body: ", request.body);

  return Response.json(demoTodos);
}

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("req.body: ", request.body);

  const { title, para, todo } = await request.json();

  const newTodo = { title, para, todo, completed: false };
  demoTodos.push(newTodo);

  return Response.json(newTodo);
}
