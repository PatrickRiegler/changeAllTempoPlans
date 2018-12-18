var request = require('request');
var async = require('async');


    var domain = "http://devjira.oskar-ruegg.com"
    var url = domain+"/rest/tempo-planning/latest/allocation"
    var id = []
    var user = "import"
    var pw = "Import1?"


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
            // console.log("jsi[0]",jsi[0])
            for(i=0;i<jsi.length;i++) {
              //var urlput = domain+"/rest/tempo-planning/latest/allocation/"+jsi[i].id
              console.log("scope.type: ",jsi[i].scope.type)
              if(jsi[i].scope.type == "project") {
                var urlput = domain+"/rest/tempo-planning/1/allocation"
                jsi[i].scope = { id: 16, type: "team" }
                console.log("jsi[i].id",jsi[i].id)
                console.log("jsi[i].planItem.key",jsi[i].planItem.key)
                //console.log("jsi[i]",jsi[i])
                console.log("post url: "+urlput)
                request.post({  
                  headers: {'Content-Type' : 'application/json' },
                  url:     urlput,
                  json:    jsi[i],
                  timeout: 10000
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
                  }).auth(user,pw,true);
                  var urldelete = domain+"/rest/tempo-planning/latest/allocation/"
                  console.log("delete url: "+urldelete+jsi[i].id)
                  request.delete({ 
                    headers: {'Content-Type' : 'application/json' },
                    url:     urldelete+jsi[i].id,
                    timeout: 10000
                  }, function(derror, dresponse, dbody){
                    if(dresponse && this.uri.href) {
                      console.log("dresponse.statusCode: ",dresponse.statusCode); 
                    } else if (derror && derror.code) {
                      console.log("derror.code: ",derror.code); 
                    }
                  }).auth(user,pw,true);
                }
              }
        }
    }).auth(user,pw,true);



