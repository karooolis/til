# Difference between tilde(~) and caret(^) in package.json

Today I finally learnt once and for all the difference between tilde(~) and caret(^) in package.json. Until now, I was never sure what the exact difference is. So here is the explanation.

The tilde(~) matches the most recent minor version. This means that for a version number such as `1.2.x`, the `2` will never be changed, and only the last digit `x` will be updated to the newest version of that NPM module.

The principle for caret(^) is the same except that it's slightly looser and will match any major version. So in a package with version numbe `1.y.x`, both `y` and `x` will be updated. But if the package comes with the version `2.0.0`, the caret(^) symbol will be of no help here and will not update to `2.0.0`.

Based on the article ["npm install --save" No Longer Using Tildes](http://fredkschott.com/post/2014/02/npm-no-longer-defaults-to-tildes/) by Fred K. Schott.