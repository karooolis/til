# Resetting MySQL root password

Today I found myself locked out of MySQL because in the new server setup I managed to lose the password. Fortunately, there is a relatively straightforward way to reset it.

First, check the current version number of the MySQL being used.

```shell
apt-cache policy mysql-server
```

Then, type in the command below where `*.*` refers to version number.

```shell
sudo dpkg-reconfigure mysql-server-*.*
```

Voilà, now you can login with the new credentials!

```shell
mysql -u root -p
```