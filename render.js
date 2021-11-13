document.getElementById("displaytext").style.display = "none";
function reload_page()
{
    location.reload();
}
function searchPhoto()
{

  // var apigClient = apigClientFactory.newClient({
  //                    apiKey: "kvE0yKAvXGvZ7U0v91miZ1XvGR97Yx+5PcC9tuUq"
  //       });
  var apigClient = apigClientFactory.newClient({apiKey: "NTIxcxAGr835v9nwbsZCu5UQKbVI5TTL2ybvXKIW"});

    var user_message = document.getElementById('note-textarea').value;

    var body = { };
    var params = {q : user_message};
    var additionalParams = {headers: {
    'Content-Type':"application/json"
  }};

    apigClient.searchGet(params, body , additionalParams).then(function(res){
        var data = {}
        var data_array = []
        resp_data  = res.data
        length_of_response = resp_data.length;
        if(length_of_response == 0)
        {
          document.getElementById("displaytext").innerHTML = "No Images Found !!!"
          document.getElementById("displaytext").style.display = "block";

        }

        resp_data.forEach( function(obj) {

            var img = new Image();
            img.src = "https://s3.amazonaws.com/photoalbumb/"+obj;
            img.setAttribute("class", "banner-img");
            img.setAttribute("alt", "effy");
            img.style.height = '200px'
            img.style.width = '200px'
            document.getElementById("displaytext").innerHTML = "Here are the Images : "
            document.getElementById("img-container").appendChild(img);
            document.getElementById("displaytext").style.display = "block";

          });
      }).catch( function(result){

      });



}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onload = () => resolve(reader.result)
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}



function uploadPhoto()
{
   // var file_data = $("#file_path").prop("files")[0];
   var file = document.getElementById('file_path').files[0];
   // var custom_labels = document.getElementById('label-textarea')
   const reader = new FileReader();

   var file_data;
   // var file = document.querySelector('#file_path > input[type="file"]').files[0];
   var encoded_image = getBase64(file).then(
     data => {
     console.log(data)
     // var apigClient = apigClientFactory.newClient({
     //                   apiKey: "kvE0yKAvXGvZ7U0v91miZ1XvGR97Yx+5PcC9tuUq"
     //      });
     var apigClient = apigClientFactory.newClient();


     // var data = document.getElementById('file_path').value;
     // var x = data.split("\\")
     // var filename = x[x.length-1]
     var file_type = file.type + ";base64"

     var body = data;
     var custom = prompt("Enter the Custom Label", "Custom-Label")
     var params = {"filename" : file.name, "bucket" : "photoalbumb", "x-amz-meta-customLabels": custom, "Content-Type" : file.type};
     var additionalParams = {};
     apigClient.bucketFilenamePut(params, body , additionalParams).then(function(res){
       if (res.status == 200)
       {
         document.getElementById("uploadText").innerHTML = "Image Uploaded  !!!"
         document.getElementById("uploadText").style.display = "block";
       }
     })
   });

}
