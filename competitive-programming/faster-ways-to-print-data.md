# Faster Ways to Print Data

Today I was practicing a coding [challenge](https://www.hackerrank.com/challenges/countingsort4) on [HackerRank](https://www.hackerrank.com) and while my output was correct and efficient data structures were incorporated, some cases terminated due to timeout.

I have experienced this timeout issue several times before and learnt that in competitive the way you print output matters just as much as efficient algorithms.

For example, the solution above did not pass because I used `System.out.printf` within each loop iteration making printing take too long and causing time limit to be exceeded.

```java
for (int i = 0; i < 100; i++) {
  if (dataMap.containsKey(i)) {
    ArrayList<String> ar = dataMap.get(i);
    
    for (String s : ar) {
      System.out.printf("%s ", s);
    }
  }
}
```

However, using [`StringBuilder`](https://docs.oracle.com/javase/7/docs/api/java/lang/StringBuilder.html) solved the issue where a string is constructed first and then printed only once. This way the algorithm execution time went from 3s to 0.8s.

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100; i++) {
    if (idxDataMap.containsKey(i)) {
        ArrayList<String> ar = idxDataMap.get(i);
      
        for (String s : ar) {
            sb.append(s + " ");
        }
    }
}

System.out.print(sb.toString());
```

Similarly, I had the same problem in another challenge when printing characters. The simplistic way of printing Java characters by using `System.out` within each loop iteration caused the time limit to be exceeded. In this case, [`OutputStreamWriter`](https://docs.oracle.com/javase/7/docs/api/java/io/OutputStreamWriter.html) came to rescue. It is slightly more convoluted than `StringBuilder` but the idea is the same - build the thing to be printed first and then print it only once.

```java
OutputStreamWriter ow = new OutputStreamWriter(System.out);
for(int i=0;i<n;i++){
  String s = in.nextLine();
  char[] ar = s.toCharArray();
  char[] sortedAr = increaseLex(ar);
    
  for (char c : sortedAr) {
    try {
      ow.write(c);
    } catch (Exception e) {} 
  }
}

try {
    ow.close();
} catch (Exception e) {}
```