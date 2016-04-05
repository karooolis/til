# Birthday Paradox

Birthday Paradox is concerned with the problem of how many people you need in a room until the chance of two people sharing the same birthday becomes at least 50%. The answer is 23!

23 is not a lot of people. How come you only need that many?

The Birthday Paradox is so counter-intuitive because human brain is not very good at dealing with probabilities other than the ones concerning us. We may be able to make a somewhat better prediction of what is the probability that *I* will share the same birthday as someone else in the room. But we are terrible at dealing with exponential probabilies such as that *any two* people, not necessarily including you, share the same birthday.

To understand the birthday paradox we not only need to consider ourselves in the equation. We also need to consider if Person A shares birthday with Person B. And Person B with Person C. And Person A with Person C and so on. It's a lot of pairs to consider, as many as 253! See below for how we got 253 (courtesy of http://betterexplained.com/).

![Birthday permutations](https://github.com/ramkarolis/til/blob/master/images/birthday-permutations.png "Birthday permutations")

Moving on, let's consider the probability of the probability that two people have a *different* birthday. If one person has a birthday on day *n*, any other day of the year would satisfy the condition of two people having birthday at different day. That is 364 days out of 365 in a year. Thus,the probability becomes `364/365 = 1 - 1/365 ~= .997260`.

Now, let's consider the probability of three people all having different birthdays: '(1 - 1/365) * (1- 2/365) ~= 0.991795'.

We can keep on going like this `(1 - 1/365) * (1- 2/365) * (1- 3/365) * (1- 4/365) * (1- 5/365) .....` until the probability becomes lower than 50%. When the probability of any given amount of people sharing different birthday goes below 50%, that means that the probability of two people sharing the same birthday goes above 50%. 

The explanation above is not pretty and the calculation can be a bit cumbersome but for me it works and helps understand how Birthday Paradox works.

## Cybersecurity implications

You may be thinking by now, so what that you need 23 people in the room so that any two of them share the same birthday with 50% probability? Apparently, there are serious cybersecurity implications to it.

Imagine a scenario where a 6 bit binary digit is randomly generated for a new passcode. After how many times the numbers will start to repeat?

6 bit binary number has `2^6` combinations. For the numbers to start repeat with over 50% chance, we only need to generate numbers for `2^3` times. So, a 6 bit binary number such as `101010` will start to repeat with 50% probability only after 8 tries. Such likelihood of repeatance can be dangerous for randomly generated secret keys and so on, and must be taken in mind when dealing with security of applications.

## Resources

- [Birthday problem](https://en.wikipedia.org/wiki/Birthday_problem)
- [Understanding the Birthday Paradox](http://betterexplained.com/articles/understanding-the-birthday-paradox/)