package mylog

import (
	"io"
	"log"
	"os"
)

// Logger struct holds the logger instance and the file output
type Logger struct {
	Logger *log.Logger
	File   *os.File
}

// NewLogger creates a new logger instance and sets the output to a file
func NewLogger(fileName string) (*Logger, error) {
	// Create a file
	f, err := os.Create(fileName)
	if err != nil {
		return nil, err
	}

	// Create a multi-writer that writes to both the file and the console
	w := io.MultiWriter(f, os.Stdout)

	// Create a new logger instance
	logger := log.New(w, "", log.LstdFlags)

	return &Logger{
		Logger: logger,
		File:   f,
	}, nil
}

// Println logs a message at the "info" level
func (l *Logger) Println(v ...interface{}) {
	l.Logger.Println(v...)
}

// Fatalln logs a message at the "fatal" level and exits the program
func (l *Logger) Fatalln(v ...interface{}) {
	l.Logger.Fatalln(v...)
}

// Close closes the file output
func (l *Logger) Close() {
	l.File.Close()
}
