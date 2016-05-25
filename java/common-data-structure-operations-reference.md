## Common data structure operations reference

Today's TIL is all about creating a reference for the future for most common operations on Java data structure elements such as `HashMap`, `Stack` and so on.

## HashMap

```java
HashMap<String, String> hp = new HashMap<>();

hp.put("KEY", "VALUE");
hp.put("KEY 2", "VALUE 2");

hp.containsKey("KEY"); // true

hp.remove("KEY 2");

hp.get("KEY"); // "VALUE"

hp.size(); // 1

hp.clear(); // Clear the entire HashMap

hp.isEmpty(); // true
```

## HashSet

```java
HashSet<String> set = new HashSet<>();

set.add("VALUE); // HashSet is essentially a HashMap but with key only

set.size(); // 1

set.contains("VALUE); // true

set.remove("VALUE);

set.clear();

set.isEmpty();
```

## Stack

```java
Stack<String> st = new Stack<>();

st.push("VALUE");

st.peek(); // "VALUE"

st.pop(); // "VALUE"

st.empty(); // true
```

## LinkedList (implementation of a queue)

```java

```



## Resources

- [HashMap](https://docs.oracle.com/javase/7/docs/api/java/util/HashMap.html) by Oracle (Java docs)
- [HashSet](https://docs.oracle.com/javase/7/docs/api/java/util/HashSet.html) by Oracle (Java docs)
- [Stack](https://docs.oracle.com/javase/7/docs/api/java/util/Stack.html) by Oracle (Java docs)
- []() by Oracle (Java docs)
- []() by Oracle (Java docs)