# Simon's Personal Site

This is the source code to my personal site; [bracegirdle.me](https://bracegirdle.me).

Tech stack:

* Static html/css based on the Bootstrap framework and using the [Freelancer theme](https://github.com/BlackrockDigital/startbootstrap-freelancer).
* Hosted on AWS S3
* Distributed via AWS CloudFront CDN
* Certificates provided by AWS ACM
* DNS provided by AWS Route 53

Structure:

* `src` HTML/CSS source code for webpage
* `infra` CDK source code for AWS resources
* `freelancer-theme` Customised Freelancer Bootstrap theme.


## Deployment

Assuming AWS CLI and CDK is setup:

```s
cd infra
cdk deploy
```

## Updating theme CSS

e.g. for tweaking theme variables etc

```s
cd freelancer-theme
npm i
npm run css
```

(runs gulp CSS)


## License note

Please refer to the following licenses:

* Simon's personal site [MIT license](https://bitbucket.org/si13b/personal-site/src/master/LICENSE)
* Freelancer bootstrap theme [MIT license](https://bitbucket.org/si13b/personal-site/src/master/freelancer-theme/LICENSE) for .
