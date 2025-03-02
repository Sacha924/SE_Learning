package main

import (
	"context"
	pb "example.com/m/API/GRPC/training"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
	"log"
	"net"
	"time"
)

var _ pb.TrainingServiceServer = (*Server)(nil)

type Server struct {
	pb.UnimplementedTrainingServiceServer
	trainings *pb.Trainings // act as a DB
}

func (s *Server) GetTraining(_ context.Context, trainingName *wrapperspb.StringValue) (*pb.Training, error) {
	var res *pb.Training
	for _, tr := range s.trainings.Trainings {
		if tr.Name == trainingName.Value {
			res = tr
			return res, nil
		}
	}
	return nil, status.Errorf(codes.NotFound, "training %s not found", trainingName)
}
func (s *Server) GetTrainings(_ context.Context, _ *emptypb.Empty) (*pb.Trainings, error) {
	return s.trainings, nil
}
func (s *Server) AddTraining(_ context.Context, training *pb.Training) (*emptypb.Empty, error) {
	// we don't check if the training already exist, we don't really care it's not a production ready code
	s.trainings.Trainings = append(s.trainings.Trainings, training)
	return &emptypb.Empty{}, nil
}

func newServer() *Server {
	// Create a default training with some exercises
	defaultTraining := &pb.Training{
		Name:         "Full Body Workout",
		CreationDate: timestamppb.New(time.Now()),
		Exercises: []*pb.Exercise{
			{
				Name:           "Push-Up",
				TargetedMuscle: "Chest",
			},
			{
				Name:           "Squat",
				TargetedMuscle: "Legs",
			},
		},
	}
	// Initialize the server with this default training
	s := &Server{
		trainings: &pb.Trainings{
			Trainings: []*pb.Training{defaultTraining},
		},
	}

	return s
}

func main() {
	lis, err := net.Listen("tcp", "localhost:8080")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	grpcServer := grpc.NewServer()
	pb.RegisterTrainingServiceServer(grpcServer, newServer())
	grpcServer.Serve(lis)
}
