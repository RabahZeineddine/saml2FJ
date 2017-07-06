# SAML authentication response to filtered JSON.

#What is it?

    saml2fj is a simple javascript file that converts SAML xml's response 
    
    to JSON using xml2json package and it offers customizable methods for 
    
    the repsonse.

#How to use saml2fj

Import saml2fj to your js code.

```
    var saml2FJ = require('saml2fj');

```

    In the /assert path or whatever you configure your w3id application target, 

    get the SAMLResponse or SAMLRequest and send it to the saml2fj parser.

```
    var response = req.body.SAMLResponse || req.body.SAMLRequest;

```

#For customizable/filtred JSON : 

```
    saml2FJ.toFiltredJSON(repsonse,function(data)){
        // Data might be an error if there is, or SAML as JSON.
    }

```

 Response:

    Success:

 ```
    {
        "firstName": "<First name>",
        "lastName": "<Last name>",
        "uid": "<uid>",
        "email": "<Email>",
        "fullName": "<Full name>",
        "Groups": [
            {
                "name": "<Group Name>"
            }
        ]


    }
 ```
    Confirm that the JSON's keys are equals to your user register structure

    Error: 

```
    {
         error: true, 
         description: "Null parameters"
    }

```

#For original SAML response JSON ( Full one ) :


```    
    saml2FJ.toJSON(response, function (data) {
        // Data might be an error if there is, or SAML as JSON.
    });

```

