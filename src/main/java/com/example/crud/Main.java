package com.example.crud;

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.util.ArrayList;

public class Main {


    static ArrayList<Todo> todos = new ArrayList<>(); // ArrayList for dynamic sizing
    //  since I already declared todos as ArrayList<Todo>, Java can infer the type of the ArrayList from that on the rightside by just using <>

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/todos", new TodoHandler());  // Handle GET and POST
        server.createContext("/todo", new SingleTodoHandler());  // Handle PUT and DELETE
        server.setExecutor(null); // creates a default executor
        server.start();
        System.out.println("Server started on port 8000");
    }
    

    public static Todo getTodo(int idx) {
        if (todos.size() >= idx) {
            throw new IndexOutOfBoundsException("Index out of range: " + idx);
        }
        return todos.get(idx);
    }
    public static  void addTodo(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Todo title cannot be empty.");
        }
        todos.add(new Todo(title));
    }
    public static  void deleteTodo(int idx) {
        if (todos.size() >= idx) {
            throw new IndexOutOfBoundsException("Index out of range: " + idx);
        }
        todos.remove(idx);
    }
    public static  void updateTodo(int idx, boolean status) {
        if (todos.size() >= idx) {
            throw new IndexOutOfBoundsException("Index out of range: " + idx);
        }
        todos.get(idx).UpdateTodoStatus(status);
    }
}
