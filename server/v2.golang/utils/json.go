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
		HandleErrorVar(fmt.Errorf("Data parameter must be a pointer, got %T", data))
	}
	file := HandleErrorDeconstruct(os.Open(filename))
	defer file.Close()
	HandleErrorVar(json.NewDecoder(file).Decode(data))
}

func MapSliceToStruct(slice []interface{}, target interface{}) error {
	// Make sure the target is a pointer to a struct
	targetValue := reflect.ValueOf(target)
	if targetValue.Kind() != reflect.Ptr || targetValue.Elem().Kind() != reflect.Struct {
		HandleErrorVar(fmt.Errorf("target must be a pointer to a struct"))
	}

	// Get the type and value of the target struct
	// targetType := targetValue.Elem().Type()
	targetStruct := targetValue.Elem()

	// Iterate over the fields of the target struct
	for i := 0; i < targetStruct.NumField(); i++ {
		// Get the field value and type
		fieldValue := targetStruct.Field(i)
		// fieldType := targetType.Field(i)

		// Check if the field is exported
		if fieldValue.CanSet() {
			// Set the field value to the corresponding slice value
			fieldValue.Set(reflect.ValueOf(slice[i]))
		}
	}

	return nil
}
