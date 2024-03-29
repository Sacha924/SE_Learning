package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
)

type Todo struct{
	ID int `json:"id"`
	Title string `json:"title"`
	Done bool `json:"done"`
	Body string `json:"body"`
}


func main(){
	fmt.Print("HELLO WORD")

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins : "http://localhost:3000",
		AllowHeaders : "*",
	}))

	todos := []Todo{}
	
	app.Get("/healthcheck", func(c *fiber.Ctx) error{
		return c.SendString("OK")
	})

	app.Get("api/todos", func(c *fiber.Ctx) error{
		return c.JSON(todos)
	})

	app.Post("/api/todos", func(c *fiber.Ctx) error{
		todo := &Todo{}
		if err :=c.BodyParser(todo); err != nil{
			return err
		}
		todo.ID = len(todos)+1  //Assigning ID as  the number of elements in the slice + 1
		todos = append(todos, *todo)
		return c.JSON(todos)
	})

	app.Patch("api/todos/:id/done", func(c *fiber.Ctx) error{
		id, err := c.ParamsInt("id")
		if err != nil{
			return c.Status(401).SendString("Invalid id")
		}

		for i, todo := range todos{
			if todo.ID == id {
				todos[i].Done = true
				break
			}
		}
		return c.JSON(todos)

	})

	log.Fatal(app.Listen(":4000"))

}