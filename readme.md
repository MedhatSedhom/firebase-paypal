# Project requirements

1. Requires node 16. Can be installed with nvm. Please refer the nvm documentation here https://github.com/nvm-sh/nvm
2. Firebase tools

Assuming the base dir of this in localhost is **firebase-paypal**

# Running the project

Clone the repo. 

Inside `firebase-paypal/functions`

do `npm install`

# Install Firebase CLI

Install the Firebase CLI via npm by running the following command:

```sh
sudo apt install npm
npm install -g firebase-tools
```

1. Log in and test the Firebase CLI   
Log into Firebase using your Google account by running the following command:

`firebase login`



2. Test that the CLI is properly installed and accessing your account by listing your Firebase projects. Run the following command:

`firebase projects:list`

Initialze Firebase functions inside the firebase-paypal directory

```sh
firebase init functions
```

> What language would you like to use to write cloud functions? JavaScript   
> Do you want to use ESlint to catch probable bugs and enforce style? N     
> Do you want to install dependencies with npm now? Y   


Initialize Firebase hosting inside the firebase-paypal directory

```sh
firebase init hosting 
```

> What do you want to use as your Public directory? Public   
> Configure as a single-page app (rewrite all URLs to /index.html)? N   
> Set up automatic builds and deploys with GitHub? N   

After doing `firebase init hosting`, please make sure that the firebase.json file look like this

```json
{
  "functions": {
    "source": "functions"
  },
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "function": "app"
      }
    ]
  }
}
```


To deploy inside the firebase-paypal directory

```sh
firebase deploy
```

To upgrade the firebase account to pay as you go, visit the following link
https://conole.firbase.google.com/project/beesamrt-5ac98/usag/details
Modify plan > Pay as you go > Select Plan > Continue
Set your billing profile. > Set a billing budget > purchase 
