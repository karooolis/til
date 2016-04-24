# Changing MySQL user's password in command line

Today I learnt how to set a new password for a MySQL user via command line. I needed to set up a new site and have forgotten the password for an existing user. However, if that happens, it's not a problem, just do this:

```mysql
mysql -u root -p // connect to the database
SET PASSWORD for 'wordpress'@'localhost' = PASSWORD("NEW PASSWORD");
```

`SET PASSWORD` sets a new function for a selected user selected with `for`. We need to run our new password through function `PASSWORD()` so as to create new password digest since MySQL does not store passwords in plain text, as it should.


## Resources

- [14.7.1.7 SET PASSWORD Syntax](http://dev.mysql.com/doc/refman/5.7/en/set-password.html)