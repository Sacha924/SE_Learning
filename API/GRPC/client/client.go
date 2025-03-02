package main

import (
	"context"
	pb "example.com/m/API/GRPC/training"
	"fmt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
	"log"
	"time"
)

func printTrainings(client pb.TrainingServiceClient) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	trainings, err := client.GetTrainings(ctx, &emptypb.Empty{})
	if err != nil {
		log.Fatalf("could not get trainings: %v", err)
	}
	for _, training := range trainings.Trainings {
		fmt.Printf("%v", training)
	}
	fmt.Printf("\n\n heree , %d\n\n", len(trainings.Trainings))
}

func printTraining(client pb.TrainingServiceClient, trainingName *wrapperspb.StringValue) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	training, err := client.GetTraining(ctx, trainingName)
	if err != nil {
		log.Fatalf("could not get trainings: %v", err)
	}
	fmt.Printf("%v", training)
}

func addTraining(client pb.TrainingServiceClient, training *pb.Training) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := client.AddTraining(ctx, training)
	if err != nil {
		log.Fatalf("could not add training: %v", err)
	} else {
		fmt.Printf("training added")
	}
}

func main() {
	conn, err := grpc.NewClient("localhost:8080", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("could not connect: %v", err)
	}
	defer conn.Close()
	client := pb.NewTrainingServiceClient(conn)
	fmt.Println("Getting all trainings...")
	printTrainings(client)

	// Add a new training.
	log.Println("Adding a new training...")
	newTraining := &pb.Training{
		Name:         "Upper Body Workout",
		CreationDate: timestamppb.New(time.Now()),
		Exercises: []*pb.Exercise{
			{
				Name:           "Pull-Up",
				TargetedMuscle: "Back",
			},
			{
				Name:           "Bicep Curl",
				TargetedMuscle: "Biceps",
			},
		},
	}
	addTraining(client, newTraining)
	fmt.Println("Printing New training...")
	printTraining(client, &wrapperspb.StringValue{Value: "Upper Body Workout"})
}
