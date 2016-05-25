# HackerRank references

## Read standard input

```java
// Read integer
Scanner sc = new Scanner(System.in);
int a=sc.nextInt();
int b=sc.nextInt();
int c=sc.nextInt();

// Example of reading long numbers until any are available
while (sc.hasNextLong()) {
  long aLong = sc.nextLong();
}

// Read string. Remember that after reading types such as int a newline character is still left there
// as unpressed 'Enter' key. Since there is no 'flush()' buffer such as in C, we need to skip one
// line to get the 'actual' line.
sc.nextLine();
String s = sc.nextLine();
```

