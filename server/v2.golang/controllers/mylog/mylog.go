package mylog

import (
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"runtime"
	"time"
)

var globalLogger *Logger

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

func (l *Logger) Close() {
	l.File.Close()
}

// Factory function
func NewGlobalLogger(fileName string) error {
	var err error
	globalLogger, err = NewLogger(fileName)
	if err != nil {
		return err
	}
	return nil
}

func init() {
	err := NewGlobalLogger("app.log")
	if err != nil {
		log.Fatal(err)
	}
	defer globalLogger.Close()
}

// Println logs a message at the "info" level
func Println(level string, v ...interface{}) {
	_, file, line, _ := runtime.Caller(1)
	globalLogger.Logger.Printf("%s [%s] v2.golang (%s:%d) -  %s", time.Now().Format("2006-01-02 15:04:05"), level, filepath.Base(file), line, fmt.Sprintln(v...))
}

// Fatalln logs a message at the "fatal" level and exits the program
func Fatalln(level string, v ...interface{}) {
	_, file, line, _ := runtime.Caller(1)
	globalLogger.Logger.Fatalf("%s [%s] v2.golang (%s:%d) -  %s", time.Now().Format("2006-01-02 15:04:05"), level, filepath.Base(file), line, fmt.Sprintln(v...))
}

// Close closes the file output
func Close() {
	globalLogger.File.Close()
}
