var xml2json = require('xml2json');
var parser = {
    toFiltredJSON: function (SAMLResponse, callback) {

        if (SAMLResponse == null || SAMLResponse == {} || SAMLResponse == '') {
            callback({
                error: true,
                description: "Null parameters"
            });
        } else {
            var response = new Buffer(SAMLResponse, 'base64');
            var json = JSON.parse(xml2json.toJson(response.toString()));
            var filteredJSON = {};
            var samlAttributes = result['samlp:Response']['saml:Assertion'][0]['saml:AttributeStatement'][0]['saml:Attribute'];
            samlAttributes.forEach(function (element) {
                switch (element['$']['Name'].toLowerCase()) {
                    case "firstname":
                        filteredJSON["firstName"] = element['saml:AttributeValue'][0]['_'];
                        break;
                    case "lastname":
                        filteredJSON["lastName"] = element['saml:AttributeValue'][0]['_'];
                        break;
                    case "uid":
                        filteredJSON["uid"] = element['saml:AttributeValue'][0]['_'];
                        break;
                    case "emailaddress":
                        filteredJSON["email"] = element['saml:AttributeValue'][0]['_'];
                        break;
                    case "cn":
                        filteredJSON["fullName"] = element['saml:AttributeValue'][0]['_'];
                        break;
                    case "bluegroups":
                        filteredJSON["blueGroups"] = JSON.parse(element['saml:AttributeValue'][0]["_"]).map(function (group) {
                            return {
                                name: group.split(',')[0].split('=')[1]
                            }
                        });
                        break;
                }
            });

            callback(filteredJSON);
        }
    },
    toJSON: function (SAMLResponse, callback) {
        if (SAMLResponse == null || SAMLResponse == {} || SAMLResponse == '') {
            callback({
                error: true,
                description: "Null parameters"
            });
        } else {
            var response = new Buffer(SAMLResponse, 'base64');
            var json = JSON.parse(xml2json.toJson(response.toString()));

            callback(json);
        }
    }
}

module.exports = parser;