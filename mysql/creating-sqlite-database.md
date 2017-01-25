[SQLite](https://sqlite.org/) is perhaps the easiest way to set up a SQL database quick and with minimum amount of hassle. All you have to do is install SQLite on your machine and you are ready to roll. Since I have Anaconda installed (Python package for Data Scientists), the installation command is `conda install sqlite`.

It's worth mentioning that SQLite, in contrast to its competitors such as MySQL, is much lighter in features as well, primarily lacking concurrency control and network access. Nevertheless, it's my go-to solution for most small projects I want to get up and running quickly.

The first step in creating the database is creating the schema for it. The schema is defined as an SQL query and stored in an `*.sql` file. For example, the SQL command below is saved at `tables_creation.sql` and creates 3 tables once executed. 

```mysql
create table submissions_info (
	story_id integer not null primary key autoincrement,
	title varchar(100),
	url varchar(100),
	user varchar(50),
	version type integer not null,
	publish_date datetime not null
);

create table front_page_tracker (
	story_id integer,
	rank integer,
	points integer,
	comments integer,
	tracker_date datetime
);

create table new_page_tracker (
	story_id integer,
	rank integer,
	points integer,
	comments integer,
	tracker_date datetime
);
```

To use the above file for creating a new SQLite database, just copy the following command in your terminal:

```
cat creation.sql | sqlite3 database.db
```

Then type `sqlite3 database.db` and you are inside the database. It has no pretty GUI so learning commands like `.tables`, `.schema [tablename]` is a must. To inspect individual tables, just use the regular SQL commands like `select * from [tablename]`.
