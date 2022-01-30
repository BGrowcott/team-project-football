let teamData;
let standings;
let tagsArray = [];
let fixturesData;
let crestButtonArray;

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
  .then(fillTagsArray)
  .then(() =>
    // get data for league standings
    fetch("https://api.football-data.org/v2/competitions/PL/standings", {
      headers: { "X-Auth-Token": "b7bac95afb44489a83d8eb77fc894151" },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        standings = data;
      })
      .then(loadTeamFromWelcomePage)
  );

// function for adding team info on search button
let selectedTeamId;
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

// get QueryString parameters from welcome page and use it to render results
const urlParams = new URLSearchParams(window.location.search);
function loadTeamFromWelcomePage() {
  for (let i = 0; i < 20; i++) {
    if (parseInt(urlParams.get("id"), 10) === teamData.teams[i].id) {
      $("#teamSearch").val(teamData.teams[i].name);
    }
  }
  renderTeam();
  renderLeagueStats();
  $("#teamSearch").val("");
}
