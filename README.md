# uuDockit-heklper
Provides helper tools for more efficient work with uuDockit. 

**Features** :
- translation from ***markdown*** to ***uu5string*** and vice versa

# How to Run
You must have either NodeJS or Docker.

## Run in NodeJS
Execute :
```sh
npm install
npm start 
```

## Run in Docker
Execute :

```sh
docker run -ti -p 4323:4323 --rm jiridudekusy/uudockit-helper
```

# How to Use MD->UU5 and UU5->MD

Visit <http://localhost:4323/demo/markdown-uu5string.html>. You can switch between 
- markdown editor
- uu5string editor
- uu5string preview

The application automatically translates content of markdown editor to uu5editor and vice versa. Please note that during translation there can be some differences. For example during tranformation into uu5 there is included [typographer](https://github.com/jonschlinkert/remarkable#typographer). During transformation from UU5 to markdown there may be used different syntax for some features (for example *, ** and *** are used for emphasis).

You can use preview feature to see how the content will look like in UU5. If you are logged in to oidc.plus4u.net you are also able to update uuBML diagrams directly from the preview etc.. 

# FAQ

1. **Why i have to run it locally ?** 
   
   Because otherwise integration with UU5 component repository and oidc.plus4u.net will not work due to the CORS and domain restrictions. 



# Plans for Future

- support more UU5 components (for example uuDesignKit)
- direct integration with uuDockit
- keeping history of pages
- support compare and comment feature.
- standard deployment instead of local deployment


# How to Develop

Currently this package does not contains some reasonable code. If you want to extend MD -> UU5 and MD -> UU5 you probably need to extend some dependencies or introduce new via plugins.
