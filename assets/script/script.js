let footballData = "";

// get data on each Premier League Team
fetch("https://api.football-data.org/v2/competitions/PL/teams", {
  headers: { "X-Auth-Token": "b7bac95afb44489a83d8eb77fc894151" },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    footballData = data;
  })
  .then(renderCrests)
  .then(renderTeamInfo);


// adds all crests to the welcome page
function renderCrests() {
  for (i = 0; i < footballData.teams.length; i++) {
    $("#crestContainer").append(
      $(
        `<img class='crests' alt='Crest for ${footballData.teams[i].name} 
        'title='${footballData.teams[i].name}' src=${footballData.teams[i].crestUrl}>`
      )
    );
  }
}

// testing function for add individual crest to page
function renderTeamInfo() {
    $('#teamCrest').attr('src', `${footballData.teams[0].crestUrl}`)
    $('#teamName').text(`${footballData.teams[0].name}`)
}
