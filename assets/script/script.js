let footballData = "";

fetch("https://api.football-data.org/v2/competitions/PL/teams", {
  headers: { "X-Auth-Token": "b7bac95afb44489a83d8eb77fc894151" },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    footballData = data;
  })
  .then(renderCrests);

function renderCrests() {
  for (i = 0; i < footballData.teams.length; i++) {
    $("#crestContainer").append(
      $(
        `<img class='crests' alt='Crest for ${footballData.teams[i].name} 'title='${footballData.teams[i].name}' src=${footballData.teams[i].crestUrl}>`
      )
    );
  }
}

function getTeamInfo(){
    
}