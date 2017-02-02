# Connecting to and querying SQLite database

Connecting to and querying SQLite database is extermely easy with Python. All we need is an `SQLite3` module. The below examples shows how to connect to the database, perform a query, and use cursor to fetch the results. 

One thing that is weird to me is why we need a cursor at all. As this [StackOverflow answer](http://stackoverflow.com/questions/6318126/why-do-you-need-to-create-a-cursor-when-querying-a-sqlite-database) explains, the cursor is a type of abstraction used in databases that enables traversal over the records in a database, more about it here 

```python
import sqlite3

conn = sqlite3.connect("database.db")

cursor = conn.cursor()
query = "select * from <table>;"
cursor.execute(query)

first_result = cursor.fetchone()

next_five_results = cursor.fetchmany(5)

all_the_rest = cursor.fetchall()

conn.close()
```
