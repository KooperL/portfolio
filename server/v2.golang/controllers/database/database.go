package database

import (
	"database/sql"
	"kooperlingohr/portfolio/utils"

	_ "github.com/mattn/go-sqlite3"
)

// db is a global variable that stores the database connection
var db *sql.DB

// InitDB initializes the database connection
func InitDB() error {
	// Open a connection to the database
	var err error
	db, err = sql.Open("sqlite3", "../data/database.db")
	if err != nil {
		return err
	}

	// Return nil to indicate success
	return nil
}

// CloseDB closes the database connection
func CloseDB() {
	db.Close()
}

func SimpleQuery[T any](query string, args []interface{}) T {
	var res T
	utils.HandleErrorVar(db.QueryRow(query, args...).Scan(&res))
	return res
}

func ExecuteSQLiteQuery[T any](query string, args []interface{}) ([]T, error) {
	// Open the SQLite database file
	// db := utils.HandleErrorDeconstruct(sql.Open("sqlite3", "../data/database.db"))
	// defer db.Close()

	// Prepare the query
	stmt := utils.HandleErrorDeconstruct(db.Prepare(query))
	defer stmt.Close()

	// Execute the query
	rows := utils.HandleErrorDeconstruct(stmt.Query(args...))
	defer rows.Close()

	// Get the column names
	columns := utils.HandleErrorDeconstruct(rows.Columns())

	// Scan the results
	results := make([]T, 0)
	for rows.Next() {
		// Create a slice to hold the column values
		values := make([]interface{}, len(columns))
		valuePtrs := make([]interface{}, len(columns))
		for i := range values {
			valuePtrs[i] = &values[i]
		}

		// Scan the row into the slice
		utils.HandleErrorVar(rows.Scan(valuePtrs...))

		// Create a map to hold the column values
		// var row T
		var row T
		// for i, column := range columns {
		// 	row[column] = values[i]
		// }

		utils.HandleErrorVar(utils.MapSliceToStruct(values, &row))
		// Add the row to the results
		results = append(results, row)
	}

	// Return the results
	return results, nil
}

func Insert(query string, args []interface{}) {
	// db := utils.HandleErrorDeconstruct(sql.Open("sqlite3", "../data/database.db"))
	// defer db.Close()
	stmt := utils.HandleErrorDeconstruct(db.Prepare(query))
	defer stmt.Close()

	utils.HandleErrorDeconstruct(stmt.Exec(args...))
}
