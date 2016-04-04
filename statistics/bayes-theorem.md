# Bayes' Theorem

In today's TIL I am exploring Bayes' Theorem. Partly because I need it for the upcoming final exams. But even more so because statistics is often unintuitive, and thus, fun! Same with Bayes' Theorem.

Bayes' Theorem helps us understand the probability of one event happening based on probability of some other, related events. For example, consider these stats:

- 1/20 of people have stiff neck;
- 1/10000 people have meningitis;
- 1/2 of people with meningitis have stiff neck.

Given that you have stiff neck, what is the probability of you having meningitis? That's the type of questions that Bayes' Theorem helps to answer. Another popular example is, given you just got tested positive for cancer, what is the probability you actually have cancer? To answer this, we need to know the probability of having cancer, and the true positive and false positive rates of the cancer test.

But let's stick with the meningitis example for now by declaring a general formula for Bayes' Theorem as follows `P(B|A) = P(A|B) * P(B) / P(A)`. 

That's the formula. Applying it to our stiff neck example, it would look as such `P(M|S) = P(S|M) * P(M) / P(S)`. Let's quickly explain what each of the terms in the formula mean:

- `P(M|S)` - probability of having meningitis given stiff neck.
- `P(S|M)` - probability of having stiff neck given meningitis.
- `P(S)` - probability of having stiff neck.
- `P(M)` - probability of having meningitis.

So basically, to find out if we actually have meningitis given stiff neck, we need to calculate the probability of actually having stiff neck due to meningitis divided by the probability of having stiff neck anyway.

The `P(M|S)` becomes:

`P(M|S) = 1/2 * 1/50000 / 1/20 = 0.5 * 1/50000 * 20 = 0.0002`

Given that you get stiff neck 50% of the time if you have meningitis, you would think that probability of having meningitis given stiff neck would be high. Counterintuitively, the probability is extremely low, only 0.0002!

So why do we get these unexpected numbers? The explanation that helps me understand this is that the actual event itself (having meningitis) is not the same as having stiff neck. The sheer number of people who get stiff neck without meningitis i.e. 1 in 20, skew the results, making it extremely imporable that you actually have meningitis with a stiff neck.

In cancer scenario, given as most common example, the probbility that you actually have cancer given initial test positive results is only about 8%. How so low? Because the probability of having cancer is low. And even though the tests have 90% of true positive and 10% false positive rates, which is fairly good, that does not change that the event of actually having cancer is separate from the event of testing positive. We need to understand the difference between the test outcome, and the actual event of having cancer.

Without a doubt, Bayes' Theorem goes against our intuition and for this reason can be difficult to grasp. Apparently, even practitioners or people like me who understand this theorem tend to forget it, probably because of its counter-intuitiviness. Anyhow, I believe it is useful, and certainly interesting bit of statistics to understand. 	

## Resources

- [An Intuitive (and Short) Explanation of Bayes’ Theorem](http://betterexplained.com/articles/an-intuitive-and-short-explanation-of-bayes-theorem/)