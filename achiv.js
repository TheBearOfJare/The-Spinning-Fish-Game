show_mystery_explanation = function() {
	if (document.getElementById('mystery_explanation').style.display === 'none') {
		document.getElementById('mystery_explanation').style.display = 'block'
		document.getElementById('toggle_mystery').innerHTML = 'Unlearn'
	}
	else {
		document.getElementById('mystery_explanation').style.display = 'none';
		document.getElementById('toggle_mystery').innerHTML = 'Learn more'
	}
}

function get_cookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

get_unlocked_achievements = function() {
  try {
    let stored = localStorage.getItem("unlocked_achievements");
    if (stored) return JSON.parse(stored);
  } catch(e) {}
  
  let cookieVal = get_cookie("unlocked_achievements");
  if (cookieVal) {
    try {
      return JSON.parse(decodeURIComponent(cookieVal));
    } catch(e) {}
  }
  return [];
};

const ACHIEVEMENTS = [
  {
    id: "dogooder",
    name: "Do-gooder",
    desc: "Get your first 100 \"good\"s",
    points: 500,
    check: (stats) => stats.good >= 100,
    getProgress: (stats) => ({ current: stats.good, target: 100 }),
    mystery: false
  },
  {
    id: "Grand",
    name: "Grand",
    desc: "Score your first 1000 points",
    points: 0,
    check: (stats) => stats.base_score >= 1000,
    getProgress: (stats) => ({ current: stats.base_score, target: 1000 }),
    mystery: false
  },
  {
    id: "I guess I never miss",
    name: "I guess I never miss",
    desc: "Don't miss 25 times in a row",
    points: 1000,
    check: (stats) => stats.highest_combo >= 25,
    getProgress: (stats) => ({ current: stats.highest_combo, target: 25 }),
    mystery: false
  },
  {
    id: "I guess I never hit",
    name: "I guess I never hit",
    desc: "Miss 250 times",
    points: 11250,
    check: (stats) => stats.miss >= 250,
    getProgress: (stats) => ({ current: stats.miss, target: 250 }),
    mystery: true,
    revealThreshold: 10
  },
  {
    id: "Perfectionist",
    name: "Perfectionist",
    desc: "Be \"perfect\" 150 times",
    points: 5000,
    check: (stats) => stats.perfect >= 150,
    getProgress: (stats) => ({ current: stats.perfect, target: 150 }),
    mystery: false
  },
  {
    id: "Mr/Miss Marvelous",
    name: "Mr/Miss Marvelous",
    desc: "Hit the frame-perfect timing 10 times",
    points: 10000,
    check: (stats) => stats.marvelous >= 10,
    getProgress: (stats) => ({ current: stats.marvelous, target: 10 }),
    mystery: false
  },
  {
    id: "Combo Master",
    name: "Combo Master",
    desc: "Get your first 50 combo",
    points: 2000,
    check: (stats) => stats.highest_combo >= 50,
    getProgress: (stats) => ({ current: stats.highest_combo, target: 50 }),
    mystery: true,
    revealThreshold: 10
  },
  {
    id: "Fish Lover",
    name: "Fish Lover",
    desc: "Visit the game 5 times",
    points: 300,
    check: (stats) => stats.visits >= 5,
    getProgress: (stats) => ({ current: stats.visits, target: 5 }),
    mystery: true,
    revealThreshold: 2
  },
  {
    id: "Persistence",
    name: "Persistence",
    desc: "Register 1000 total hits",
    points: 1500,
    check: (stats) => (stats.good + stats.great + stats.perfect + stats.marvelous) >= 1000,
    getProgress: (stats) => ({ current: (stats.good + stats.great + stats.perfect + stats.marvelous), target: 1000 }),
    mystery: false
  },
  {
    id: "Perfect Sync",
    name: "Perfect Sync",
    desc: "Play with a non-zero timing adjustment",
    points: 250,
    check: (stats) => stats.timing_adjustment !== 0,
    getProgress: (stats) => ({ current: stats.timing_adjustment !== 0 ? 1 : 0, target: 1 }),
    mystery: true,
    revealThreshold: 1
  }
];

// Render function
render_achievements = function() {
  // Load stats from cookies/localStorage
  let miss = parseInt(get_cookie("miss")) || 0;
  let good = parseInt(get_cookie("good")) || 0;
  let great = parseInt(get_cookie("great")) || 0;
  let perfect = parseInt(get_cookie("perfect")) || 0;
  let marvelous = parseInt(get_cookie("marvelous")) || 0;
  let score = parseInt(get_cookie("score")) || 0;
  let visits = parseInt(get_cookie("visits")) || 0;
  let highest_combo = parseInt(get_cookie("highest_combo")) || 0;
  
  let timing_adjustment = parseInt(get_cookie("timing_adjustment")) || 0;
  
  // Calculate base score
  let base_score = marvelous * 1000 + perfect * 100 + great * 50 + good * 15 - miss * 45;
  
  let stats = {
    miss, good, great, perfect, marvelous, score, visits, highest_combo, timing_adjustment, base_score
  };
  
  // Render stats dashboard
  document.getElementById("stats_score").innerHTML = String(score);
  document.getElementById("stats_combo").innerHTML = String(highest_combo);
  document.getElementById("stats_hits").innerHTML = `${good} / ${great} / ${perfect} / ${marvelous}`;
  document.getElementById("stats_misses").innerHTML = String(miss);
  
  let unlocked = get_unlocked_achievements();
  
  let completed_container = document.getElementById("completed_container");
  let in_progress_container = document.getElementById("in_progress_container");
  
  completed_container.innerHTML = "";
  in_progress_container.innerHTML = "";
  
  let completedCount = 0;
  let inProgressCount = 0;
  let mysteryUndiscoveredCount = 0;
  
  for (let ach of ACHIEVEMENTS) {
    let isUnlocked = unlocked.includes(ach.id) || ach.check(stats);
    
    if (isUnlocked) {
      completedCount++;
      
      // Render completed card
      let card = document.createElement("div");
      card.className = "achievement-card completed";
      
      let header = document.createElement("div");
      header.className = "card-header";
      
      let title = document.createElement("h3");
      title.className = "ach-title";
      title.innerHTML = ach.name;
      
      let reward = document.createElement("div");
      reward.className = "ach-reward";
      
      if (ach.id === "Grand") {
        reward.innerHTML = `<img src="sprites/grand_img.png" class="badge-img" alt="Grand Badge">`;
      } else {
        reward.innerHTML = `+${ach.points} pts`;
      }
      
      header.appendChild(title);
      header.appendChild(reward);
      
      let desc = document.createElement("div");
      desc.className = "ach-desc";
      desc.innerHTML = ach.desc;
      
      let checkmark = document.createElement("div");
      checkmark.className = "checkmark-icon";
      checkmark.innerHTML = "🏆 Unlocked";
      
      card.appendChild(header);
      card.appendChild(desc);
      card.appendChild(checkmark);
      
      completed_container.appendChild(card);
    } else {
      // Locked achievement: check if it's in progress or mystery
      let progress = ach.getProgress(stats);
      let pct = Math.min(100, Math.max(0, Math.round((progress.current / progress.target) * 100)));
      
      let reveal = !ach.mystery;
      if (ach.mystery) {
        let threshold = ach.revealThreshold || 1;
        if (progress.current >= threshold) {
          reveal = true;
        } else {
          mysteryUndiscoveredCount++;
        }
      }
      
      if (reveal) {
        inProgressCount++;
        
        // Render in progress card
        let card = document.createElement("div");
        card.className = "achievement-card";
        
        let header = document.createElement("div");
        header.className = "card-header";
        
        let title = document.createElement("h3");
        title.className = "ach-title";
        title.innerHTML = ach.name;
        
        let reward = document.createElement("div");
        reward.className = "ach-reward";
        if (ach.id === "Grand") {
          reward.innerHTML = "Grand Badge";
        } else {
          reward.innerHTML = `+${ach.points} pts`;
        }
        
        header.appendChild(title);
        header.appendChild(reward);
        
        let desc = document.createElement("div");
        desc.className = "ach-desc";
        desc.innerHTML = ach.desc;
        
        let progressContainer = document.createElement("div");
        progressContainer.className = "progress-container";
        
        let progressLabel = document.createElement("div");
        progressLabel.className = "progress-label";
        progressLabel.innerHTML = `<span>Progress</span><span>${progress.current} / ${progress.target} (${pct}%)</span>`;
        
        let progressBarBg = document.createElement("div");
        progressBarBg.className = "progress-bar-bg";
        
        let progressBarFill = document.createElement("div");
        progressBarFill.className = "progress-bar-fill";
        progressBarFill.style.width = `${pct}%`;
        
        progressBarBg.appendChild(progressBarFill);
        progressContainer.appendChild(progressLabel);
        progressContainer.appendChild(progressBarBg);
        
        card.appendChild(header);
        card.appendChild(desc);
        card.appendChild(progressContainer);
        
        in_progress_container.appendChild(card);
      }
    }
  }
  
  // Set badge counters
  document.getElementById("completed_count").innerHTML = String(completedCount);
  document.getElementById("in_progress_count").innerHTML = String(inProgressCount);
  document.getElementById("undiscovered_acheivement_number").innerHTML = String(mysteryUndiscoveredCount);
  
  // Handle empty states
  if (completedCount === 0) {
    completed_container.innerHTML = `<p class="empty-state">No achievements completed yet. Keep spinning!</p>`;
  }
  if (inProgressCount === 0) {
    in_progress_container.innerHTML = `<p class="empty-state">No achievements in progress.</p>`;
  }
};

// Sync dark/light theme on load
let darkModeCookie = get_cookie("darkmode");
if (darkModeCookie === "true") {
  document.body.classList.add("darkmode");
  document.body.classList.remove("lightmode");
} else {
  document.body.classList.remove("darkmode");
  document.body.classList.add("lightmode");
}

render_achievements();