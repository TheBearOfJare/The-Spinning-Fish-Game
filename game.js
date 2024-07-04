duration = 1.08 * 1000;
timing = Date.now() + 200;
//console.log('original: '+timing)

var mobileprefix = "";
var gamestarted = false;
var lastpressed = 0;
var dbid = "";
var userdata = [];
var playerdata;
var xapikey = "646b64370b60fc42f4e1993a";

upload_stats = function (miss, good, great, perfect, marvelous) {};

/*
document.addEventListener('visibilitychange', function() {

	if (document.visibilityState === 'visible') {
		return
	}
	else {
	   	miss = parseInt(document.getElementById('miss').innerHTML);
		good = parseInt(document.getElementById('good').innerHTML);
		great = parseInt(document.getElementById('great').innerHTML);
		perfect = parseInt(document.getElementById('perfect').innerHTML);
		marvelous = parseInt(document.getElementById('marvelous').innerHTML);
		score = String(calc_score(miss, good, great, perfect, marvelous))
		
		//upload_stats(miss,good,great,perfect,marvelous,score)
	}

});

*/

quicksave = function () {
  miss = parseInt(document.getElementById("miss").innerHTML);
  good = parseInt(document.getElementById("good").innerHTML);
  great = parseInt(document.getElementById("great").innerHTML);
  perfect = parseInt(document.getElementById("perfect").innerHTML);
  marvelous = parseInt(document.getElementById("marvelous").innerHTML);
  score = String(calc_score(miss, good, great, perfect, marvelous));

  save_stats(miss, good, great, perfect, marvelous, score);
};

togglenight = function () {
  let x = document.getElementById("moon_shadow");
  let y = document.getElementById("dmdeco");
  let html = document.getElementById("html");
  let z = document.getElementById("cloud_cutoff");
  let a = document.getElementById("right_cloud");
  let b = document.getElementById("modelabel");

  if (document.getElementById("darkmode").checked === true) {
    x.style.backgroundColor = "#100439";
    y.style.right = "2px";
    html.style.backgroundColor = "#333333";
    html.style.color = "white";
    z.style.backgroundColor = "#333333";
    a.style.right = "28px";
    b.innerHTML = "Darkmode";
    b.style.right = "60px";
    b.style.textShadow = "2px -2px 4px rgb(0,0,0)";
    document.cookie = `darkmode=true; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  } else {
    x.style.backgroundColor = "#1fb4ff";
    y.style.right = "15px";
    html.style.backgroundColor = "#fffff5";
    html.style.color = "black";
    z.style.backgroundColor = "white";
    a.style.right = "24px";
    b.innerHTML = "Lightmode";
    b.style.right = "10px";
    b.style.textShadow = "2px 4px 4px rgb(0,0,0)";
    document.cookie = `darkmode=false; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  }
};

set_time = function (ms) {
  timing = ms;
  if (window.mobileAndTabletCheck() == false) {
    timing += 20;
  }
  //console.log('new: ' + timing)
};

function get_cookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

funky = function () {
  var song = document.getElementById("funkytown music");

  if (document.getElementById("mute").innerHTML == "Unmute Audio") {
    //console.log('muting?')
    song.muted = true;
    //console.log('muted?')
  } else {
    song.muted = false;
  }
  song.play();
  /*
	else {
		song.muted = null;
	}
	*/
};

calc_score = function (miss, good, great, perfect, marvelous) {
  return marvelous * 1000 + perfect * 100 + great * 50 + good * 15 - miss * 45;
};
update_visits = function () {
  //console.log('updating visits')
  //console.log(visits)
  try {
    visits = get_cookie("visits");
    visits = parseInt(visits) + 1;
    document.cookie = `visits=${visits};`;
  } catch {
    document.cookie = `visits=${1};`;
  }
};

is_mobile = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
};

//thx stack overflow
window.mobileAndTabletCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

is_ios = function () {
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return true;
  } else {
    return false;
  }
};

adjust_for_ios = function () {
  x = document.getElementById("mobilefish").style.height.split("");
  x.pop();
  x.pop();
  x = parseInt(x.join(""));
  //console.log(x)
  document.getElementById("mobilefish").style.height = `${x * 0.9}px`;
};

setup = function () {
  //console.log('starting music')
  //funky()
};

pulse = function (intensity) {
  var pulse_reset = Date.now() + 300;
  document.getElementById("html").style.margin = intensity;
  while (Date.now() < pulse_reset) {
    continue;
  }
  document.getElementById("html").style.margin = "0px";
};

save_stats = function (miss, good, great, perfect, marvelous, score) {
  document.cookie = `score=${score}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  document.cookie = `miss=${miss}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  document.cookie = `good=${good}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  document.cookie = `great=${great}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  document.cookie = `perfect=${perfect}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  document.cookie = `marvelous=${marvelous}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
};

register_press = function (time) {
  if (time - lastpressed < 300) {
    return;
  } else {
    lastpressed = time;
  }
  adjustment = parseInt(`${document.getElementById("timing_adjuster").value}`);
  //accounts for early and late respectively
  innacuracy = Math.min(
    duration - ((time + adjustment) % duration),
    (time + adjustment) % duration
  );
  if (innacuracy === (time + adjustment) % duration) {
    relativity = "late";
  } else {
    relativity = "early";
  }
  output = document.getElementById("accuracy");
  if (innacuracy === 0) {
    output.innerHTML = "Godlike";
  } else {
    output.innerHTML = String(innacuracy) + "ms " + relativity;
  }

  quality = "miss";

  if (innacuracy <= 100) {
    quality = "good";
  }
  if (innacuracy <= 40) {
    quality = "great";
  }
  if (innacuracy <= 10) {
    quality = "perfect";
    //pulse(10)
  }
  if (innacuracy === 0) {
    quality = "marvelous";
    //pulse(20)
  }

  sprite = document.getElementById(mobileprefix + "quality");
  sprite.style.display = "block";
  sprite.src = "sprites/" + quality + ".png";

  x = document.getElementById(quality);
  value = parseInt(x.innerHTML);
  value += 1;
  x.innerHTML = String(value);

  miss = parseInt(document.getElementById("miss").innerHTML);
  good = parseInt(document.getElementById("good").innerHTML);
  great = parseInt(document.getElementById("great").innerHTML);
  perfect = parseInt(document.getElementById("perfect").innerHTML);
  marvelous = parseInt(document.getElementById("marvelous").innerHTML);

  document.getElementById("score").innerHTML = String(
    calc_score(miss, good, great, perfect, marvelous)
  );
  quicksave();
  //console.log(innacuracy)

  if (document.getElementById("funkytown music").paused) {
    document.getElementById("funkytown music").play();
    setInterval(funky, 7 * 60 * 1000 + 43.07 * 1000);
  }
};

rainbow_effect = function () {
  colors = ["red", "orange", "yellow", "green", "blue", "purple"];
  things = document.getElementsByClassName("rainbow_text");
  for (i = 0; i < things.length; i++) {
    things[i].style.color = colors[Math.round(Math.random() * 6)];
  }
};

// depreciated implementation (uses onkeypress)
/*
document.onkeypress = function (e) {
	//console.log('key pressed')
    e = e || window.event;
    //console.log(e.keyCode)
	if (e.keyCode === 32 && gamestarted === true) {
		d = new Date();
		time = d.getTime();
		time-=timing
		register_press(time)
	}
};
*/
// new implementation should theoretically work identically just with keydown instaid.
document.addEventListener("keydown", function (e) {
  //console.log('key pressed')
  if (e.key === " " && gamestarted === true) {
    time = Date.now() - timing;
    register_press(time);
  }
});

mobile_tap = function () {
  time = Date.now() - timing;

  if (window.mobileAndTabletCheck()) {
    time -= 30;
    window.navigator.vibrate([10]);
  }

  if (gamestarted === true) {
    register_press(time);
  }
};

setup_account = function () {
  document.cookie = `score=${0}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  document.cookie = `miss=${0}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  document.cookie = `good=${0}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  document.cookie = `great=${0}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  document.cookie = `perfect=${0}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  document.cookie = `marvelous=${0}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  //create_db_entry()
};

create_db_entry = function () {
  // Creates a blank new database entry for the player's save data. This will used mainly for leaderboard purposes
};

get_rank = function (score) {
  rank = 1;
  for (i = 0, i < userdata.length; i++; ) {
    //console.log("score: "+userdata[i]['score'])
    if (userdata[i]["score"] > score) {
      rank += 1;
    }
  }
  //console.log('rank: '+rank)
  return rank;
};

updaterank = function () {
  miss = parseInt(document.getElementById("miss").innerHTML);
  good = parseInt(document.getElementById("good").innerHTML);
  great = parseInt(document.getElementById("great").innerHTML);
  perfect = parseInt(document.getElementById("perfect").innerHTML);
  marvelous = parseInt(document.getElementById("marvelous").innerHTML);
  score = document.getElementById("score").innerHTML;
  document.getElementById("rank").innerHTML = get_rank(score);
};

update_stats = function () {
  if (
    document.cookie.search("NaN") > -1 ||
    document.cookie.search("miss") < 0
  ) {
    document.cookie = `score=${0}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
    document.cookie = `miss=${0}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
    document.cookie = `good=${0}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
    document.cookie = `great=${0}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
    document.cookie = `perfect=${0}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
    document.cookie = `marvelous=${0}; expires=Thu, 18 Dec 2999 12:00:00 UTC; path=/;`;
  }

  //console.log(document.getElementById('miss'););
  document.getElementById("miss").innerHTML =
    parseInt(document.getElementById("miss").innerHTML) +
    parseInt(get_cookie("miss"));
  document.getElementById("good").innerHTML =
    parseInt(document.getElementById("good").innerHTML) +
    parseInt(get_cookie("good"));
  document.getElementById("great").innerHTML =
    parseInt(document.getElementById("great").innerHTML) +
    parseInt(get_cookie("great"));
  document.getElementById("perfect").innerHTML =
    parseInt(document.getElementById("perfect").innerHTML) +
    parseInt(get_cookie("perfect"));
  document.getElementById("marvelous").innerHTML =
    parseInt(document.getElementById("marvelous").innerHTML) +
    parseInt(get_cookie("marvelous"));

  score = calc_score(
    parseInt(get_cookie("miss")),
    parseInt(get_cookie("good")),
    parseInt(get_cookie("great")),
    parseInt(get_cookie("perfect")),
    parseInt(get_cookie("marvelous"))
  );
  document.getElementById("score").innerHTML =
    parseInt(document.getElementById("score").innerHTML) + score;

  //document.getElementById('rank').innerHTML = get_rank(score)
};

loadthings = function () {
  //console.log('onload')

  mobile = window.mobileAndTabletCheck();

  /*
	if (mobile) {
		document.getElementById('desktopads').style.display = 'none'
		
	}
	else {
		document.getElementById('mobilead').style.display = 'none'
	}
	*/
  if (mobile) {
    document.getElementById("mobilefish").style.display = "block";
    document.getElementById("fish").style.display = "none";
    mobileprefix = "mobile";
  } else {
    document.getElementById("fish").style.display = "block";
    document.getElementById("mobilefish").style.display = "none";
    mobileprefix = "";
  }

  document.getElementById(mobileprefix + "instructions").style.display =
    "block";

  if (mobile) {
    zone = document.getElementById("mobile_tap_zone");
    zone.style.display = "block";
    zone.style.height = `${
      document.getElementById("html").clientHeight -
      document.getElementById("measuring stick").clientHeight -
      10
    }px`;
    x = zone.style.height.split("");
    x.pop();
    x.pop();
    x = parseInt(x.join(""));
    //alert(x)
    zone.style.height = `${
      x - document.getElementById("bottom_thingy").clientHeight
    }px`;
    //alert(document.getElementById('bottom_thingy').clientHeight)


    // Align the Quality indicator on desktop to the botom of the screen above the bottom thingy

    if (!mobile) {
      offset = document.getElementById("bottom_thingy").clientHeight
      document.getElementById("quality").style.bottom = `${offset*2}px`; 
    }
  }

  document.getElementById(mobileprefix + "fish").src =
    "sprites/spinning_fish_optimized.gif";
    
  if (document.cookie.length === 0) {
    setup_account();
  } else {
    //console.log('cookies: '+document.cookie)
    update_stats();

    if (get_cookie("darkmode") == "true") {
      document.getElementById("dmdeco").click();
    }
    if (get_cookie("muted") == "true") {
      document.getElementById("mute").click();
    }
  }

  

  gamestarted = true;

  //console.log('it worked?');
};
