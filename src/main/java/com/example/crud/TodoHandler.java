package com.example.crud;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.OutputStream;

class TodoHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        if (method.equalsIgnoreCase("GET")) {
            // Handle GET: return the list of todos
            StringBuilder response = new StringBuilder();
            for (int i = 0; i < Main.todos.size(); i++) {
                Todo todo = Main.todos.get(i);
                response.append(i).append(": ").append(todo.title).append(" - ")
                        .append(todo.done ? "done" : "not done").append("\n");
            }
            sendResponse(exchange, response.toString(), 200);
        } else if (method.equalsIgnoreCase("POST")) {
            // Handle POST: Add a new todo
            String requestBody = new String(exchange.getRequestBody().readAllBytes());
            Main.addTodo(requestBody);
            sendResponse(exchange, "Todo added", 201);
        } else {
            sendResponse(exchange, "Unsupported method", 405);
        }
    }

    private void sendResponse(HttpExchange exchange, String response, int statusCode) throws IOException {
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }
}
