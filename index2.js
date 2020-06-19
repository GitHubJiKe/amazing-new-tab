import Unsplash from "unsplash-js";
(function () {
  const unsplash = new Unsplash({
    accessKey: "N0cuPOPXoVQUn46r1BmMykysuq8Dplc8EbYP5ChSp0U",
  });
  const titleDom = document.querySelector(".title");
  const defaultTitle = localStorage.getItem("TITLE");
  function setDefaultConfig() {
    const prevUrl = localStorage.getItem("URL");
    const color = localStorage.getItem("COLOR");

    if (prevUrl) {
      document.getElementById("wraper").style.backgroundImage = prevUrl;
    }

    if (color) {
      document.querySelector(".content").style.color = color;
    }

    if (defaultTitle) {
      document.querySelector(".title").innerHTML = defaultTitle;
    }
  }

  function addZero(num) {
    const n = Number(num).valueOf();
    if (n < 10) {
      return `0${n}`;
    }
    return n;
  }

  function setTime() {
    const date = new Date();
    document.querySelector(".current-time").innerHTML = `${addZero(
      date.getHours()
    )} : ${addZero(date.getMinutes())} : ${addZero(date.getSeconds())}`;
  }

  function setDate() {
    const date = new Date();
    document.querySelector(
      ".current-date"
    ).innerHTML = `${date.getFullYear()} / ${addZero(
      date.getMonth() + 1
    )} / ${addZero(date.getDate())}`;
  }

  function setTitle() {
    if (defaultTitle) {
      return;
    }

    const date = new Date();
    const hours = date.getHours();
    let title = "早上好，奥利给！";

    if (hours >= 10 && hours <= 12) {
      //上午
      title = "中午快到了，吃顿好的！";
    } else if (hours >= 12 && hours < 14) {
      // 下午
      title = "困了吧，小憩一会儿？";
    } else if (hours >= 14 && hours < 19) {
      title = "继续奋斗！";
    } else if (hours >= 19 && hours <= 20) {
      // 晚上
      title = "不出意外，快下班了！";
    } else if (hours > 22) {
      title = "该睡了，早点休息哦";
    }
    document.querySelector(".title").innerHTML = title;
  }

  document.getElementById("changePic").addEventListener("click", function () {
    unsplash.photos
      .getRandomPhoto()
      .then((res) => res.json())
      .then((json) => {
        const url = `url(${json.urls.full})`;
        localStorage.setItem("URL", url);
        document.getElementById("wraper").style.backgroundImage = url;
      });
  });

  document
    .getElementById("color-selector")
    .addEventListener("change", function (e) {
      const color = e.target.value;
      localStorage.setItem("COLOR", color);
      document.querySelector(".content").style.color = color;
    });

  titleDom.addEventListener("click", function () {
    titleDom.setAttribute("contenteditable", "true");
  });
  titleDom.addEventListener("blur", function () {
    localStorage.setItem("TITLE", titleDom.innerHTML);
    titleDom.setAttribute("contenteditable", "false");
  });

  setDefaultConfig();
  setTitle();
  setTime();
  setDate();

  setInterval(() => setTitle(), 60 * 60 * 1000); //每隔一个小时一次
  setInterval(() => setTime(), 500); //每隔500毫秒一次
  setInterval(() => setDate(), 12 * 60 * 60 * 1000); //每隔12个小时一次
})();
