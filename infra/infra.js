#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const cloudfront = require('@aws-cdk/aws-cloudfront');
const route53 = require('@aws-cdk/aws-route53');
const s3 = require('@aws-cdk/aws-s3');
const s3deploy = require('@aws-cdk/aws-s3-deployment');
const acm = require('@aws-cdk/aws-certificatemanager');
const targets = require('@aws-cdk/aws-route53-targets/lib');

class PersonalSiteStack extends cdk.Stack {
  constructor(app, id, props) {
    super(app, id, props);

    const siteDomain = props.domainName;
    const zone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: siteDomain
    });
    new cdk.CfnOutput(this, 'Site', {value: 'https://' + siteDomain});

    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: siteDomain,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY // Stateless content, safe to destroy
    });
    new cdk.CfnOutput(this, 'Bucket', {value: siteBucket.bucketName});

    const certificateArn = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
      domainName: siteDomain,
      hostedZone: zone,
      region: 'us-east-1' // CloudFront utilised certificates must be in Virginia
    }).certificateArn;
    new cdk.CfnOutput(this, 'Certificate', {value: certificateArn});

    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
      aliasConfiguration: {
        acmCertRef: certificateArn,
        names: [siteDomain],
        sslMethod: cloudfront.SSLMethod.SNI,
        securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016
      },
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: siteBucket
          },
          behaviors: [{isDefaultBehavior: true}]
        }
      ],
      errorConfigurations: [
        {
          errorCode: 403,
          responseCode: 200,
          responsePagePath: '/index.html'
        },
        {
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/index.html'
        }
      ]
    });
    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId
    });

    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: siteDomain,
      target: route53.AddressRecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone
    });

    new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3deploy.Source.asset('../site2/dist')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*']
    });
  }
}

// ## CDK Quick ref:
// npm install -g aws-cdk
// cdk --version
// cdk init --language LANGUAGE [TEMPLATE]
// cdk init --language javascript
// cdk init --language python sample-app
// cdk ls
// cdk diff
// cdk synth // Create CFN template (good for testing)
// cdk deploy
// cdk deploy MyStack
// cdk destroy

const app = new cdk.App();
new PersonalSiteStack(app, 'PersonalSiteStack', {
  domainName: 'bracegirdle.me',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
app.synth();
