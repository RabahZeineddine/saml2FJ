
var xml2json = require('xml2json');



var parser = {
    toJSON: function (SAMLResponse, callback) {

        if (SAMLResponse == null || SAMLResponse == {} || SAMLResponse == '') {
            callback({ error: true, description: "Null parameters" });
        } else {
            var response = new Buffer(SAMLResponse, 'base64');
            var json = JSON.parse(xml2json.toJson(response.toString()));


            var filteredJSON = {};
            var samlAttributes = json['samlp:Response']['saml:Assertion']['saml:AttributeStatement']['saml:Attribute'];
            samlAttributes.forEach(function (element) {
                switch (element['Name'].toLowerCase()) {
                    case "firstname":
                        filteredJSON["firstName"] = element['saml:AttributeValue']['$t'];
                        break;
                    case "lastname":
                        filteredJSON["lastName"] = element['saml:AttributeValue']['$t'];
                        break;
                    case "uid":
                        filteredJSON["uid"] = element['saml:AttributeValue']['$t'];
                        break;
                    case "emailaddress":
                        filteredJSON["email"] = element['saml:AttributeValue']['$t'];
                        break;
                    case "cn":
                        filteredJSON["fullName"] = element['saml:AttributeValue']['$t'];
                        break;
                    case "bluegroups":
                        filteredJSON["blueGroups"] = element['saml:AttributeValue'].map(function (group) {
                            return { name: group['$t'].split(',')[0].split('=')[1] }
                        });
                        break;
                }

            });

            callback(filteredJSON);
        }
    }
}

module.exports = parser;