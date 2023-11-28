// A function that reads a .json file and returns an object containing
// all of the data.
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("data.json", function (text) {
    var robots = JSON.parse(text);
    var contestants = robots.contestants
    console.log("Loaded data successfully!");
    console.log("Data:")
    console.table(contestants);

    let robotList = document.querySelector(".leaderboard-list"); // The actual ul element in the html
    contestants.sort(function(a, b){return b.score - a.score});

    console.log("Successfully sorted data!");
    console.log("Sorted data:");
    console.table(robots);

    // Loop over each robot in the sorted list
    let i = 0;
    contestants.forEach(robot => {
        let newRobot = document.createElement("li");
        newRobot.className = "place"

        let image = document.createElement("img");
        image.src = robot.imageLink;
        image.alt = "image";
        newRobot.appendChild(image);

        let name = document.createElement("h2");
        name.innerText = robot.name;
        newRobot.appendChild(name);

        let score = document.createElement("h2");
        score.innerText = robot.score;
        newRobot.appendChild(score);

        let place = document.createElement("h2");
        place.innerText = "#"+(i+1);
        place.className = "place-place";
        newRobot.appendChild(place);

        robotList.appendChild(newRobot);
        i++;
    });
});