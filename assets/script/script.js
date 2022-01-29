let teamData = "";
let standings = "";
let tagsArray = [];
let fixturesData = ""

// get data on each Premier League Team
fetch("https://api.football-data.org/v2/competitions/PL/teams", {
  headers: { "X-Auth-Token": "b7bac95afb44489a83d8eb77fc894151" },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    teamData = data;
  })
  .then(renderCrests)
  .then(fillTagsArray);

// get data for league standings
fetch("https://api.football-data.org/v2/competitions/PL/standings", {
  headers: { "X-Auth-Token": "b7bac95afb44489a83d8eb77fc894151" },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    standings = data;
  });

// adds all crests to the welcome page
function renderCrests() {
  for (let i = 0; i < teamData.teams.length; i++) {
    $("#crestContainer").append(
      $(
        `<img class='crests' alt='Crest for ${teamData.teams[i].name} 
        'title='${teamData.teams[i].name}' data-id="${teamData.teams[i].id}" src=${teamData.teams[i].crestUrl}>`
      )
    );
  }
}

// function for adding team info on search button
let selectedTeamId = "";
function renderTeamInfo(e) {
  e.preventDefault();
  renderTeam()
  renderLeagueStats();
  $("#teamSearch").val("");
}

// event listener for search button
$("#searchButton").click(renderTeamInfo);

// function for filling tags array
function fillTagsArray() {
  for (let i = 0; i < teamData.teams.length; i++) {
    tagsArray.push(teamData.teams[i].name);
  }
}

$(function () {
  $("#teamSearch").autocomplete({
    source: tagsArray,
  });
});


function renderTeam(){
    for (let i = 0; i < teamData.teams.length; i++) {
        if (
          $("#teamSearch").val() === teamData.teams[i].name ||
          $("#teamSearch").val() === teamData.teams[i].shortName
        ) {
          selectedTeamId = teamData.teams[i].id;
          console.log(selectedTeamId);
          $("#teamCrest").attr("src", `${teamData.teams[i].crestUrl}`);
          $("#teamName").text(`${teamData.teams[i].name}`);
          $("#founded").text(`Founded in ${teamData.teams[i].founded}`);
          $("#venue").text(`${teamData.teams[i].venue}`);
        }
      }
}

// function for adding teams league statistics

function renderLeagueStats() {
  for (let i = 0; i < 20; i++) {
    if (standings.standings[0].table[i].team.id === selectedTeamId) {
      $("#leaguePosition").text(
        `Position: ${standings.standings[0].table[i].position}`
      );
      $("#points").text(`Points: ${standings.standings[0].table[i].points}`);
      $("#played").text(
        `Games Played: ${standings.standings[0].table[i].playedGames}`
      );
      $("#won").text(`Wins: ${standings.standings[0].table[i].won}`);
      $("#lost").text(`Losses: ${standings.standings[0].table[i].lost}`);
      $("#draw").text(`Draws: ${standings.standings[0].table[i].draw}`);
    }
  }
}
