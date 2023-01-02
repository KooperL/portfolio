package controllers

import (
	"database/sql"
	"kooperlingohr/portfolio/utils"
	"reflect"

	_ "github.com/mattn/go-sqlite3"
)

type StructScanner interface {
	StructScan(interface{}) error
}

func GetRows(query string, args []interface{}, v interface{}) error {
	// Open a connection to the database
	dbFile := "../data/database.db"

	db := utils.HandleErrorDeconstruct(sql.Open("sqlite3", dbFile))
	defer db.Close()

	// Prepare the query
	stmt := utils.HandleErrorDeconstruct(db.Prepare(query))
	defer stmt.Close()

	// Execute the query
	rows := utils.HandleErrorDeconstruct(stmt.Query(args...))
	defer rows.Close()

	// Iterate over the rows
	sliceValue := reflect.ValueOf(v)
	elementType := sliceValue.Type().Elem()
	for rows.Next() {
		// Create a new element of the slice
		element := reflect.New(elementType).Elem()

		// Scan the row into the element
		utils.HandleErrorVar(rows.Scan(element.Addr().Interface()))

		// Append the element to the slice
		sliceValue.Set(reflect.Append(sliceValue, element))
	}

	return nil
}
