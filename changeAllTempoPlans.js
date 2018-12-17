var request = require('request');
var async = require('async');


    var domain = "http://devjira.oskar-ruegg.com"
    var url = domain+"/rest/tempo-planning/1/allocation"
    var id = []


    request.get({  
        headers: {'Content-Type' : 'application/json' },
        url:     url,
        timeout: 30000
    }, function(error, response, body){
        if (error) {
            console.log("url: "+url)
            console.log("error.code: "+error.code); 
            console.log("error.connect: "+error.connect); 
            console.log("error: "+error); 
        } else {
            //console.log("body:", body);
            console.log("successful: ",url);
            var jsi = JSON.parse(body);
            console.log("jsi[0]",jsi[0])
            for(i=0;i<jsi.length;i++) {
              //var urlput = domain+"/rest/tempo-planning/1/allocation/"+jsi[i].id
              var urlput = domain+"/rest/tempo-planning/1/allocation"
              jsi[i].scope = { id: 16, type: "team" }
if(jsi[i].id == 2362) {
              console.log("jsi[i].id",jsi[i].id)
              console.log("jsi[i].planItem.key",jsi[i].planItem.key)
              //console.log("jsi[i]",jsi[i])
              console.log("post url: "+urlput)
              request.post({  
                headers: {'Content-Type' : 'application/json' },
                url:     urlput,
                json:    jsi[i],
                timeout: 3000
              }, function(error, response, body){
                if (error) {
                    console.log("error.code: "+error.code); 
                    console.log("error.connect: "+error.connect); 
                    console.log("error: "+error); 
                } else {
/*
                    console.log("response: ",response); 
                    console.log("response.statusCode: ",response.statusCode); 
*/
                }
              }).auth('techuser','techuser',true);
                    var urldelete = domain+"/rest/tempo-planning/1/allocation/"+jsi[i].id
                    request.delete({ 
                      headers: {'Content-Type' : 'application/json' },
                      url:     urldelete,
                      timeout: 3000
                    }, function(error, response, body){
                      console.log("delete url: "+urldelete)
                      console.log("response.statusCode: ",response.statusCode); 
                    }).auth('techuser','techuser',true);
            }
}
        }
    }).auth('techuser','techuser',true);



