    function my_init() {
         easyRTC.setLoggedInListener( loggedInListener);
         easyRTC.initManaged("Company Chat Line", "self", ["caller"],
             function(myId) {
                console.log("My easyrtcid is " + myId);
             }
         );
     }


    function loggedInListener(connected) {
        var otherClientDiv = document.getElementById('otherClients');
        while (otherClientDiv.hasChildNodes()) {
            otherClientDiv.removeChild(otherClientDiv.lastChild);
        }
        for(var i in connected) {
            var button = document.createElement('button');
            button.onclick = function(easyrtcid) {
                return function() {
                    performCall(easyrtcid);
                }
            }(i);

            label = document.createTextNode(i);
            button.appendChild(label);
            otherClientDiv.appendChild(button);
        }
    }


    function performCall(easyrtcid) {
        easyRTC.call(
           easyrtcid, 
           function(easyrtcid) { console.log("completed call to " + easyrtcid);},
           function(errorMessage) { console.log("err:" + errorMessage);},
           function(accepted, bywho) {
              console.log((accepted?"accepted":"rejected")+ " by " + bywho);
           }
       );
    }