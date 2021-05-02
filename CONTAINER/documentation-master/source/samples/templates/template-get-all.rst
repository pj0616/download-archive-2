.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates \
    -d limit=10

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode listTemplates() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates")
             .basicAuth("api", API_KEY)
             .queryString("limit","10")
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support the Templates endpoint.
  # Consider using the following php curl function.
  function get_templates() {

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates');

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def list_templates():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates",
         auth=("api", "YOUR_API_KEY"),
         params={"limit": 10})

.. code-block:: rb

 def list_templates
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates", :params => {
     :limit => 10
   }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class ListTemplatesChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (ListTemplates ().Content.ToString ());
     }

     public static IRestResponse ListTemplates ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("limit", 10);
         request.Resource = "/{domain}/templates";
         return client.Execute (request);
     }

 }

.. code-block:: go

    import (
        "context"
        "github.com/mailgun/mailgun-go/v3"
        "time"
    )

    func ListTemplates(domain, apiKey string) ([]mailgun.Template, error) {
        mg := mailgun.NewMailgun(domain, apiKey)
        it := mg.ListTemplates(nil)

        ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
        defer cancel()

        var page, result []mailgun.Template
        for it.Next(ctx, &page) {
            result = append(result, page...)
        }

        if it.Err() != nil {
            return nil, it.Err()
        }
        return result, nil
    }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get('/${DOMAIN}/templates', {"limit": 5}, function (error, body) {
   console.log(body);
 });

