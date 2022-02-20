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
  .then(renderCrests);

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
  crestButtonArray = $(".crests");
  crestEventListener();
}

// event listeners on crests on welcome page
function crestEventListener() {
  crestButtonArray.click(crestClicker);
}

// click a crest to load the results page with a Query String
function crestClicker(e) {
  window.location.href = `results.html?id=${e.target.dataset.id}`;
}
