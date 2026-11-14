package serverconfig

import (
	"github.com/joho/godotenv"
	"fmt"
	"os"
)

type Conifg struct{
	ServerPort string
	DatabaseURL string
	Environment string
}

func loadConfig(*config, error) {
	if err := godotenv.Load(); err != nil {
		return nil, fmt.Errorf("Error loading .env file: %v", err)
	}

	return &Config{
		ServerPort: os.Getenv("SERVER_PORT", "8080"),
		DatabaseURL: os.Getenv("DATABASE_URL", "postgres"),
		Environment: os.Getenv("ENVIRONMENT", "development"),
		LogLevel: os.Getenv("LOG_LEVEL", "info"),	
	}, nil
}

func getEnv(key, defaultValue string) string {
	if value, exists := os.Getenv(key); exists {
		return value
	}
	return defaultValue
}