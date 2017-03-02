# Big Oh vs. Big Theta vs. Big Omega

After taking [Algorithms, Part I](https://www.coursera.org/learn/algorithms-part1) course I realized I do the common mistake like most others when analyzing algorithms performance. The mistake is using Big Oh as the holy grail without realizing what it really means. Let's have an overview how these three notations differ first and then look at the mistake and how to fix it.

## Big Oh

Develops upper bound for an algorithm. It is the expected running time when the "hardest" input is provided which would cause the algorithm run the longest.

## Big Omega

Develops lower bound for the "easiest" input.

## Big Theta

It is the expected cost for random input. Since the input is random, it is the most likely to represent real world conditions.

## The big mistake

The big mistake that most developers make when analyzing algorithms performance is always assuming the worst-case. It's the equivalent of the lighting striking and killing you, preventing you from finishing what you have planned. It is arguably much more realistic for most cases to assume random input which would give a closer approximation of how our algorithms is really going to perform.

Anyhow, in my limited opinion, Big Oh would still suffice for most analyses as it is used mainly as an indicator on how the algorithm is going to run. However, where performance is of critical performance and it is important to understand the program in its entirety, a more thorough analysis using Big Theta would definitely be necessary.
