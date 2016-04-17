# reCAPTCHA for spam detection

reCaptcha is an open source project authored by Google that protects website's against spam and abuse.

Integrating it into a site is really straightforward. All you need to do is go to reCAPTCHA main site and register a new site using the admin panel. Once that's done, you will get provided with site and secret keys.

To set up reCAPTCHA on client side, put the following snippet before the closing `</head>` tag:

```javascript
<script src='https://www.google.com/recaptcha/api.js'></script>
```

It's worth mentioning that the snippet does not necessarily have to be at the end of `</head>` tag. It can be placed anywhere but placing it in the `<head>` makes reCAPTCHA load faster while lengheting critical rendering path. So you have to make a decision of what's more important here.

To include the reCAPTCHA on the page, paste the reCAPTCHA `div` with appropriate site key in your form .

```javascript
<div class="g-recaptcha" data-sitekey="{{SITE KEY}}"></div>
```

Now when the user submits a form, the payload will include a string `g-recaptcha-response`. The response is used to make a call to Google API at `https://www.google.com/recaptcha/api/siteverify` that checks whether the user is a robot. Such call in Node.js would look as below. The response will tell us whether the user is genuine or not, great :)

```javascript
const https = require('https');

var post_data = querystring.stringify({
	secret: {{SECRET KEY}},
	response: {{The value of 'g-recaptcha-response'}}
});

var options = {
  hostname: 'https://www.google.com/recaptcha/api/siteverify',
  port: 80,
  path: '/',
  method: 'POST',
 	headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(post_data)
  }
};

var req = https.request(options, (res) => {
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});
req.end();

req.on('error', (e) => {
  console.error(e);
});
```

## Responsiveness

One annoying thing about reCAPTCHA is that it's unresponsive! In this day and age of responsive web this does not make sense and makes otherwise beautiful layouts not so beautiful anymore. There is a [ticket](https://github.com/google/recaptcha/issues/61) about that as well on reCAPTCHA's GitHub repo but nothing is being done about it. It's surprising because in my eyes the responsiveness would be so simple to add.

The only workaround so far is use this:

```css
.g-recaptcha {
	transform:scale(0.95) !important;
	-webkit-transform:scale(0.95) !important;
	transform-origin:0 0 !important;
	-webkit-transform-origin:0 0 !important;
}
```

This allows to scale the reCAPTCHA container to our needs, and allows for some amount of flexibility. However, it's still not truely responsivene but for now will have to do.

## Resources

- [reCAPTCHA main site](https://www.google.com/recaptcha/intro/index.html)
- [reCAPTCHA GitHub repository](https://github.com/google/recaptcha)