import type { Socket } from "socket.io";
import { getSocketIo } from "../../server.js";
import todoModel from "./todoModel.js";
import type { Model } from "mongoose";
import { Status, type ITodo } from "./todoTypes.js";


class Todo {
  private io = getSocketIo();
  constructor() {
    this.io.on('connection', (socket) => {
      console.log("new client connected");
      socket.on("addTodo", (data) => this.handleAddTodo(socket, data))
      socket.on("deleteTodo", (data) => this.handleDeleteTodo(socket, data))
      socket.on("updateTodoStatus", (data) => this.handleUpdateTodoStatus(socket, data))
    })
  }
  private async handleAddTodo(socket: Socket, data: ITodo) {
    const { task, deadline, status } = data;
    try {
      const todo = await todoModel.create({
        task,
        deadline,
        status
      })
      const todos = await todoModel.find({ status: Status.pending })
      socket.emit("todo_updated", {
        status: "success",
        data: todos
      })
    } catch (error) {
      socket.emit("todo_response", {
        status: "failed", error

      })
    }
  }
  private async handleDeleteTodo(socket: Socket, data: { id: string }) {

    try {
      const { id } = data;
      const deletedTodo = await todoModel.findByIdAndDelete(id);
      if (!deletedTodo) {
        socket.emit("todo_updated", {
          status: "failed",
          message: "Todo not found"
        })
        return;
      }
      const todos = await todoModel.find({ status: Status.pending })
      socket.emit("todo_response", {
        status: "success",
        data: todos
      })
    }
    catch (error) {
      socket.emit("todo_updated", {
        status: "failed",
        error
      })
    }
  }
  private async handleUpdateTodoStatus(socket: Socket, data: { id: string, status: Status }) {
    try {
      const { id, status } = data;
      const todo = await todoModel.findByIdAndUpdate(id, { status })
      if (!todo) {
        socket.emit("todo_updated", {
          status: "failed",
          message: "to do not found"
        })
        return;
      }
      const todos = await todoModel.find({ status: Status.pending })
      socket.emit("todo_", {
        status: "success",
        data: todos
      })
    } catch (error) {
      socket.emit("todo_response", {
        status: "failed", error
      })

    }
  }
}

export default new Todo();