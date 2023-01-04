package utils

import (
	"encoding/json"
	"fmt"
	"os"
	"reflect"
)

func OpenAndParseJSONFile(filename string, data interface{}) {
	val := reflect.ValueOf(data)
	if val.Kind() != reflect.Ptr {
		err := fmt.Errorf("Data parameter must be a pointer, got %T", data)
		HandleErrorVar(err)
	}
	file := HandleErrorDeconstruct(os.Open(filename))
	defer file.Close()
	HandleErrorVar(json.NewDecoder(file).Decode(data))
}
