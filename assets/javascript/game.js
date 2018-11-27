  var config = {
    apiKey: "AIzaSyB9m8WUrVTArxs5nB_EC8AHsttInp6qJ8E",
    authDomain: "cbc-trainhw.firebaseapp.com",
    databaseURL: "https://cbc-trainhw.firebaseio.com",
    projectId: "cbc-trainhw",
    storageBucket: "cbc-trainhw.appspot.com",
    messagingSenderId: "1064632017314"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-input").val().trim();
    var trainDes = $("#destination-input").val().trim();
    var trainTime = $("#first-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDes,
        first: trainTime,
        frequency: trainFreq
    };

    database.ref().push(newTrain);

    $("#train-input").val("");
    $("destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var trainDes = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().frequency;
  
    console.log(trainName);
    console.log(trainDes);
    console.log(trainTime);
    console.log(trainFreq);
  
    var momentTrainStart = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(momentTrainStart)
    var diffTime = moment().diff(moment(momentTrainStart), "minutes");
    var tRemainder = diffTime % trainFreq;
    var tMinutesUntilTrain = trainFreq - tRemainder;
    var nextTrain = moment().add(tMinutesUntilTrain, "minutes"); 


    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDes),
      $("<td>").text(trainTime),
      $("<td>").text(nextTrain),
      $("<td>").text(trainFreq),
      $("<td>").text(tMinutesUntilTrain)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });