package com.example.crud;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;

class SingleTodoHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();
        
        // Extracting the `id` from the URL query (e.g., /todo?id=1)
        String query = exchange.getRequestURI().getQuery();
        int id = Integer.parseInt(query.split("=")[1]);
        System.out.println("ID: " + id);

        if (method.equalsIgnoreCase("PUT")) {
            String requestBody = new String(exchange.getRequestBody().readAllBytes());
            System.out.println("Request Body: " + requestBody);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(requestBody);
            boolean status = jsonNode.get("done").asBoolean();
            System.out.println("Parsed status: " + status);

            Main.updateTodo(id, status);
            sendResponse(exchange, "Todo updated", 200);
        } else if (method.equalsIgnoreCase("DELETE")) {
            Main.deleteTodo(id);
            sendResponse(exchange, "Todo deleted", 200);
        } else {
            sendResponse(exchange, "Unsupported method", 405);  // Method Not Allowed
        }
    }

    private void sendResponse(HttpExchange exchange, String response, int statusCode) throws IOException {
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }
}
