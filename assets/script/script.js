let teamData;
let standings;
let tagsArray = [];
let fixturesData;

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
    const team = teamData.teams[i];
    $("#crestContainer").append(
      $(
        `<img class='crests' alt='Crest for ${team.name} 
        'title='${team.name}' data-id="${team.id}" src=${team.crestUrl}>`
      )
    );
  }
}

// function for adding team info on search button
let selectedTeamId = "";
function renderTeamInfo(e) {
  e.preventDefault();
  renderTeam();
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

function renderTeam() {
  for (let i = 0; i < teamData.teams.length; i++) {
    const team = teamData.teams[i];
    if (
      $("#teamSearch").val() === team.name ||
      $("#teamSearch").val() === team.shortName
    ) {
      selectedTeamId = team.id;
      $("#teamCrest").attr("src", `${team.crestUrl}`);
      $("#teamName").text(`${team.name}`);
      $("#founded").text(`Founded in ${team.founded}`);
      $("#venue").text(`${team.venue}`);
    }
  }
}

// function for adding teams league statistics

function renderLeagueStats() {
  for (let i = 0; i < 20; i++) {
    const teamInPosition = standings.standings[0].table[i];
    if (teamInPosition.team.id === selectedTeamId) {
      $("#leaguePosition").text(`Position: ${teamInPosition.position}`);
      $("#points").text(`Points: ${teamInPosition.points}`);
      $("#played").text(`Games Played: ${teamInPosition.playedGames}`);
      $("#won").text(`Wins: ${teamInPosition.won}`);
      $("#lost").text(`Losses: ${teamInPosition.lost}`);
      $("#draw").text(`Draws: ${teamInPosition.draw}`);
    }
  }
}
