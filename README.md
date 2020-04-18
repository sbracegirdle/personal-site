# Simon's Personal Site

This is the source code to my personal site; [bracegirdle.me](https://bracegirdle.me).

Tech stack:

* Custom static html/css site built on top of [react-static](https://github.com/react-static/)
* Hosted on AWS S3
* Distributed via AWS CloudFront CDN
* Certificates provided by AWS ACM
* DNS provided by AWS Route 53

Structure:

* `site2` react-static project for site
* `infra` CDK source code for AWS resources


## Deployment

Assuming AWS CLI and CDK is setup and NPM dependencies installed:

```s
cd site2
npm run build
cd .../infra
npm run deploy
```


## License note

Please refer to the following licenses:

* Simon's personal site [MIT license](https://bitbucket.org/si13b/personal-site/src/master/LICENSE)
