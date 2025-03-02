package com.example.crud;

public class Todo {
    public String title;
    public Boolean done;

    // ctor
    public Todo(String title){
        this.title = title;
        this.done = false;
    }

    // methods
    public void UpdateTodoStatus(Boolean done){
        this.done = done;
    }

    public void Display(){
        String statusMessage = this.done ? "is done" : "is not done yet";
        System.out.printf("your task called '%s' %s\n", this.title, statusMessage);
    }
}

