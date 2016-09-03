# sau-lunch-skill
Amazon Echo app (skill) to tell you what's for lunch at SAU39

## Local development

Create a file, `.env`, and set these values:
```
AWS_ENVIRONMENT=development
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_SESSION_TOKEN=
AWS_ROLE_ARN=your_amazon_role
AWS_REGION=us-east-1
AWS_FUNCTION_NAME=
AWS_HANDLER=index.handler
AWS_MODE=event
AWS_MEMORY_SIZE=128
AWS_TIMEOUT=10
AWS_DESCRIPTION=
AWS_RUNTIME=nodejs4.3
AWS_VPC_SUBNETS=
AWS_VPC_SECURITY_GROUPS=
EXCLUDE_GLOBS="README.md images test event-samples .env .deploy.env .gitignore .DS_Store"
PACKAGE_DIRECTORY=build
```

Then:
```
npm install
npm run-script zip
npm run-script deploy
```

## Testing

Edit `~/.aws/credentials` and add:
```
[default]
aws_access_key_id = your_key
aws_secret_access_key = your_secret_key
```
Then run:
```
npm test
```
