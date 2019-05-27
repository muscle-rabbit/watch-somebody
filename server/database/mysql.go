package database

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

type DB struct {
	*sql.DB
}

type user struct {
	userID     int
	userTarget string
}

func (db *DB) SetTarget(target string) {
	ins, err := db.Prepare("INSERT INTO user_info (user_target) SELECT * FROM (SELECT ?) AS tmp WHERE NOT EXISTS ( SELECT user_target FROM user_info WHERE user_target = ? ) LIMIT 1")
	if err != nil {
		log.Fatal(err)
	}
	ins.Exec(target, target)
}

func (db *DB) GetUserID(target string) int {
	rows, err := db.Query("select user_id from user_info where user_target = ?", target)
	if err != nil {
		log.Fatal(err)
	}
	var userResult []user
	for rows.Next() {
		user := user{}
		if err := rows.Scan(&user.userID); err != nil {
			log.Fatal(err)
		}
		userResult = append(userResult, user)
	}
	for _, v := range userResult {
		return v.userID
	}
	return 0
}

func (db *DB) GetTarget(id string) string {
	rows, err := db.Query("select user_target from user_info where user_id = ?", id)
	if err != nil {
		log.Fatal(err)
	}
	var targetList []string
	for rows.Next() {
		if err := rows.Scan(&targetList); err != nil {
			log.Fatal(err)
		}
	}
	for _, v := range targetList {
		return v
	}
	return "nothing"
}
