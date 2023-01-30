package utils

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
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

func ParseReqBody(r *http.Request, data interface{}) {
	val := reflect.ValueOf(data)
	if val.Kind() != reflect.Ptr {
		HandleErrorVar(fmt.Errorf("Data parameter must be a pointer, got %T", data))
	}

	HandleErrorVar(json.NewDecoder(r.Body).Decode(data))
}

func ParseReqParams(query url.Values, target interface{}) {
	targetValue := reflect.ValueOf(target)
	if targetValue.Kind() != reflect.Ptr || targetValue.Elem().Kind() != reflect.Struct {
		HandleErrorVar(fmt.Errorf("target must be a pointer to a struct"))
	}

	m := make(map[string]interface{})
	for key, values := range query {
		m[key], _ = url.QueryUnescape(values[0])
	}
	// can add to slice here which would probably be something to look into if performance is an issue

	HandleErrorVar(MapToStruct(m, target))
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
		// fmt.Println(targetType.Field(i))

		// Check if the field is exported
		if fieldValue.CanSet() {
			// Set the field value to the corresponding slice value
			fieldValue.Set(reflect.ValueOf(slice[i]))
		}
	}

	return nil
}

func MapStructToSlice(obj interface{}) []interface{} {
	// Make sure the input is a struct
	v := reflect.ValueOf(obj)
	if v.Kind() != reflect.Struct {
		return nil
	}

	// Create a slice to hold the values
	values := make([]interface{}, v.NumField())

	// Iterate over the fields of the struct
	for i := 0; i < v.NumField(); i++ {
		// Get the field value
		fieldValue := v.Field(i)

		// Check if the field is exported
		if fieldValue.CanInterface() {
			// Add the field value to the slice
			values[i] = fieldValue.Interface()
		}
	}

	// Return the slice of values
	return values
}

func MapToStruct(m map[string]interface{}, target interface{}) error {
	// Make sure the target is a pointer to a struct
	targetValue := reflect.ValueOf(target)
	if targetValue.Kind() != reflect.Ptr || targetValue.Elem().Kind() != reflect.Struct {
		HandleErrorVar(fmt.Errorf("target must be a pointer to a struct"))
	}
	// Get the type and value of the target struct
	targetType := targetValue.Elem().Type()
	targetStruct := targetValue.Elem()

	// Iterate over the fields of the target struct
	for i := 0; i < targetStruct.NumField(); i++ {
		// Get the field value and type
		fieldValue := targetStruct.Field(i)
		fieldType := targetType.Field(i)
		// Check if the field is exported
		if fieldValue.CanSet() {
			jsonTag := fieldType.Tag.Get("json")
			fieldValue.Set(reflect.ValueOf(m[jsonTag]))
		}
	}

	return nil
}
