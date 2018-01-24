# uuDockit-heklper
Provides helper tools for more efficient work with uuDockit. 

**Features** :
- edit any uuDockit page via markdown

# How to Run
You must have either NodeJS or Docker.

## Run in NodeJS
Execute :
```sh
cd jdk_dockithelperg02_main-client
npm install
npm start 
```

## Run in Docker
Execute :

```sh
docker run -ti -p 1234:1234 --rm jiridudekusy/uudockit-helper
```

# How to Use

Visit <http://localhost:1234/vendor-app-subapp/0-0/editor>. Please note that you should authenticate yourself via oidc.plus4u.net. 

Features: 
- load content from uuDockit
- save content to uuDockit
- view and edit content. You can switch between:
  - markdown editor
  - uu5string editor
  - uuDockit JSON preview

The application automatically translates content of markdown editor to uuDokit editor and vice versa. Please note that during translation there can be some differences. For example during tranformation into uu5 there is included [typographer](https://github.com/jonschlinkert/remarkable#typographer). During transformation from UU5 to markdown there may be used different syntax for some features (for example *, ** and *** are used for emphasis).

You can use preview feature to see how the content will look like in UU5. It is really recommended to check the preview before you will save data to uuDockik since the preview is quite accurate about how it will look. Please note that uuDockit does not have history feature so there is no possibility to go to previous version of page.  

Parts of uuDocKit page is delimited by `{uuDocKit-partBreak}` and and page code is written as first line in format `{uuDocKit-pageCode} page code`. 

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

Any change pushed into develop is automatically build as Docker image jiridudekusy/uudockit-helper with tag latest (any change pushed into other branch(- master)has tag same as name of the branch). 

