# SAML authentication response to filtered JSON.

#How to use saml2fj

In the /assert path or whatever you configure your w3id application target, get the SAMLResponse and send it to the parser using the toJSON 

```
    var response = req.body.SAMLResponse || req.body.SAMLRequest;
    saml2FJ.toJSON(response, function (data) {
        // Data might be an error if there is, or SAML as JSON.
    });

```

