let polls =
JSON.parse(localStorage.getItem("polls")) || [];

/* =========================
   TEST MODE
========================= */

const TEST_MODE = true;

/* =========================
   CHART STORAGE
========================= */

window.pollCharts = {};

/* =========================
   CHART COLORS
========================= */

const chartColors = [

  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#6366F1",
  "#3B82F6",
  "#8B5CF6",
  "#06B6D4",
  "#10B981"

];

/* =========================
   SAVE POLLS
========================= */

function savePolls(){

  localStorage.setItem(
    "polls",
    JSON.stringify(polls)
  );

}

/* =========================
   THEME
========================= */

function toggleTheme(){

  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")){

    localStorage.setItem("theme","light");

  }else{

    localStorage.setItem("theme","dark");

  }

}

if(localStorage.getItem("theme") === "light"){

  document.body.classList.add("light");

}

/* =========================
   SANITIZE
========================= */

function sanitize(str){

  return str.replace(/[<>]/g,"");

}

/* =========================
   CREATE POLL
========================= */

function createPoll(){

  const question =
  sanitize(
    document.getElementById("question")
    .value
    .trim()
  );

  const category =
  document.getElementById("category").value;

  const expiry =
  document.getElementById("expiry").value;

  const optionInputs =
  document.querySelectorAll(".option");

  const options = [];

  optionInputs.forEach(input => {

    const value =
    sanitize(input.value.trim());

    if(value !== ""){

      options.push({

        text:value,
        votes:0

      });

    }

  });

  if(question === "" || options.length < 2){

    alert("Enter minimum 2 options");

    return;
  }

  const poll = {

    id:Date.now(),

    question,

    category,

    expiry,

    options,

    chartCreated:false

  };

  polls.unshift(poll);

  savePolls();

  renderPolls();

  document.getElementById("question").value = "";
  document.getElementById("expiry").value = "";

  optionInputs.forEach(input => {

    input.value = "";

  });

}

/* =========================
   EXPIRED CHECK
========================= */

function isExpired(expiry){

  if(!expiry) return false;

  return new Date(expiry) < new Date();

}

/* =========================
   VOTE
========================= */

function vote(pollId, optionIndex){

  const poll =
  polls.find(p => p.id === pollId);

  if(!poll) return;

  if(poll.chartCreated){

    alert(
      "Voting closed. Chart visualization finalized."
    );

    return;
  }

  if(!TEST_MODE){

    if(localStorage.getItem(`voted_${pollId}`)){

      alert("Already voted!");

      return;

    }

  }

  if(isExpired(poll.expiry)){

    alert("Poll expired");

    return;
  }

  poll.options[optionIndex].votes++;

  if(!TEST_MODE){

    localStorage.setItem(
      `voted_${pollId}`,
      true
    );

  }

  savePolls();

  renderPolls();

}

/* =========================
   CREATE CHART
========================= */

function createChart(pollId){

  const poll =
  polls.find(p => p.id === pollId);

  if(!poll) return;

  if(poll.chartCreated){

    return;
  }

  poll.chartCreated = true;

  savePolls();

  renderPolls();

}

/* =========================
   SHARE POLL LINK
========================= */

function sharePoll(pollId){

  const shareUrl =

  `${window.location.origin}${window.location.pathname}?poll=${pollId}`;

  navigator.clipboard
  .writeText(shareUrl)

  .then(()=>{

    alert("Poll link copied!");

  })

  .catch(()=>{

    prompt(
      "Copy this link:",
      shareUrl
    );

  });

}

/* =========================
   DELETE POLL
========================= */

function deletePoll(id){

  if(!confirm("Delete this poll?")) return;

  if(window.pollCharts[id]){

    window.pollCharts[id].destroy();

    delete window.pollCharts[id];

  }

  polls =
  polls.filter(p => p.id !== id);

  savePolls();

  renderPolls();

}

/* =========================
   EXPORT CSV
========================= */

function exportCSV(poll){

  let csv =
  "Option,Votes,Percentage\n";

  const totalVotes =
  poll.options.reduce(
    (sum,opt) => sum + opt.votes,
    0
  );

  poll.options.forEach(opt => {

    const percent =

    totalVotes === 0

    ? 0

    :

    (
      (opt.votes / totalVotes) * 100
    ).toFixed(1);

    csv +=
    `${opt.text},${opt.votes},${percent}%\n`;

  });

  const blob =
  new Blob([csv],{
    type:'text/csv'
  });

  const url =
  URL.createObjectURL(blob);

  const a =
  document.createElement("a");

  a.href = url;

  a.download =
  "poll-results.csv";

  a.click();

}

/* =========================
   TIMER
========================= */

function getTimeLeft(expiry){

  if(!expiry) return "No Expiry";

  const diff =
  new Date(expiry) - new Date();

  if(diff <= 0){

    return "Expired";

  }

  const hrs =
  Math.floor(diff / 1000 / 60 / 60);

  const mins =
  Math.floor(diff / 1000 / 60) % 60;

  const secs =
  Math.floor(diff / 1000) % 60;

  return `${hrs}h ${mins}m ${secs}s`;

}

/* =========================
   RENDER POLLS
========================= */

function renderPolls(){

  const container =
  document.getElementById(
    "pollContainer"
  );

  const search =
  document.getElementById("search")
  .value
  .toLowerCase();

  const filter =
  document.getElementById("filter")
  .value;

  container.innerHTML = "";

  const filtered =
  polls.filter(p => {

    const matchesSearch =

    p.question
    .toLowerCase()
    .includes(search);

    const matchesFilter =

    filter === "All" ||

    p.category === filter;

    return matchesSearch &&
    matchesFilter;

  });

  if(filtered.length === 0){

    container.innerHTML =
    "<h2>No Polls Found</h2>";

    return;
  }

  filtered.forEach(poll => {

    const totalVotes =

    poll.options.reduce(

      (sum,opt) =>
      sum + opt.votes,

      0

    );

    const expired =
    isExpired(poll.expiry);

    const card =
    document.createElement("div");

    card.className =
    "poll-card";

    card.id =
    `poll-${poll.id}`;

    card.innerHTML = `

      <div class="flex">

        <h2>${poll.question}</h2>

        <span class="tag ${expired ? 'expired' : ''}">

          ${
            expired
            ? 'Closed'
            : poll.category
          }

        </span>

      </div>

      <div class="timer">

        ${getTimeLeft(poll.expiry)}

      </div>

      <div class="options-area"></div>

      <p class="total-votes">

        ${
          poll.chartCreated

          ?

          `
          Total Votes:
          <b>${totalVotes}</b>
          `

          :

          `Voting in progress...`
        }

      </p>

      ${
        !poll.chartCreated

        ?

        `
        <button
          class="create-chart-btn"
          onclick="createChart(${poll.id})"
        >
          Finalize & Create Chart
        </button>
        `

        :

        `
        <div class="chart-wrapper">

          <canvas id="chart-${poll.id}">
          </canvas>

        </div>

        <div class="chart-stats">

          ${poll.options.map((opt,index)=>{

            const percent =

            totalVotes === 0

            ? 0

            :

            (
              (opt.votes / totalVotes)
              * 100
            ).toFixed(1);

            return `

              <div class="stat-item">

                <div
                  class="color-box"
                  style="
                  background:
                  ${chartColors[index]}"
                ></div>

                <span>

                  ${opt.text}

                  -
                  ${opt.votes} votes

                  (${percent}%)

                </span>

              </div>

            `;

          }).join("")}

        </div>
        `
      }

      <div class="action-buttons">

        <button
          class="share-btn"
          onclick='sharePoll(${poll.id})'
        >
          Share Poll
        </button>

        <button
          class="export-btn"
          onclick='exportCSV(${JSON.stringify(poll)})'
        >
          Export CSV
        </button>

        <button
          class="delete-btn"
          onclick='deletePoll(${poll.id})'
        >
          Delete
        </button>

      </div>

    `;

    container.appendChild(card);

    /* =========================
       OPTIONS
    ========================= */

    const optionArea =
    card.querySelector(
      ".options-area"
    );

    poll.options.forEach((opt,i)=>{

      const percent =

      totalVotes === 0

      ? 0

      :

      (
        (opt.votes / totalVotes)
        * 100
      ).toFixed(1);

      const optionDiv =
      document.createElement("div");

      optionDiv.innerHTML = `

        <button
          class="option-btn"
          ${
            expired ||
            poll.chartCreated
            ? 'disabled'
            : ''
          }
        >

          ${opt.text}

          ${
            poll.chartCreated

            ?

            `
            (
              ${opt.votes} votes
              -
              ${percent}%
            )
            `

            :

            ''
          }

        </button>

        <div class="progress">

          <span
            style="
            width:${
              poll.chartCreated
              ? percent
              : 0
            }%"
          ></span>

        </div>

      `;

      optionDiv
      .querySelector("button")
      .onclick =
      ()=>vote(poll.id,i);

      optionArea.appendChild(
        optionDiv
      );

    });

    /* =========================
       CREATE CHART
    ========================= */

    if(poll.chartCreated){

      const canvas =
      document.getElementById(
        `chart-${poll.id}`
      );

      if(
        canvas &&
        !window.pollCharts[poll.id]
      ){

        const ctx =
        canvas.getContext("2d");

        window.pollCharts[poll.id] =

        new Chart(ctx,{

          type:'doughnut',

          data:{

            labels:
            poll.options.map(
              o => o.text
            ),

            datasets:[{

              data:
              poll.options.map(
                o => o.votes
              ),

              backgroundColor:
              chartColors,

              borderWidth:3

            }]

          },

          options:{

            responsive:true,

            animation:{
              duration:1200
            },

            plugins:{

              legend:{

                labels:{

                  color:
                  document.body
                  .classList
                  .contains("light")

                  ? '#111'
                  : '#fff'

                }

              }

            }

          }

        });

      }

    }

  });

}

/* =========================
   OPEN SHARED POLL
========================= */

function openSharedPoll(){

  const params =
  new URLSearchParams(
    window.location.search
  );

  const pollId =
  params.get("poll");

  if(!pollId) return;

  setTimeout(()=>{

    const target =
    document.getElementById(
      `poll-${pollId}`
    );

    if(target){

      target.scrollIntoView({

        behavior:"smooth",
        block:"center"

      });

      target.style.boxShadow =
      "0 0 25px #8b5cf6";

      setTimeout(()=>{

        target.style.boxShadow = "";

      },2500);

    }

  },500);

}

/* =========================
   INITIAL RENDER
========================= */

renderPolls();

openSharedPoll();