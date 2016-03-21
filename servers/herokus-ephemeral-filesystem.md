# Heroku's ephemeral filesystem

Today's TIL is short but important. Today I learnt that [Heroku](http://heroku.com/) has no permanent file storage due to its ephemeral filesystem. A fresh copy of files is made with each copy of the most recently deployed code, as explained in [Dynos and the Dyno Manager](https://devcenter.heroku.com/articles/dynos#isolation-and-security). Thus, each time you deploy new code, all previous files get discarded.

On top of that, the files are only kept as long as the dyno is running. As soon as the dyno is stopped or restarted, any files written to the dyno will be discarded. Considering that dynos are replaced once a day on average due to normal dyno management, your files will be kept for one day at most, if lucky.

Such ephemeral filesystem is part of Heroku's attempt to achieve isolation between dynos and make them more secure.

I learnt about this today when deploying Ruby on Rails application to Heroku which relies on files upload. I could not understand why the uploaded files worked fine at first and then became unavailable later. The solution to file storage problem is to use external storage provider such as [Amazon Web Services S3](https://aws.amazon.com/s3/) which is fairly simple to implement on Ruby on Rails apps given availability of useful gems. It is also not expensive and may, in fact, make the app more secure by not storing the code and the files in the same basket.