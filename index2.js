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
    let title = "早上好，朋友！";

    if (hours >= 10 && hours <= 12) {
      //上午
      title = "上午好，朋友！";
    } else if (hours >= 14 && hours < 19) {
      // 下午
      title = "下午好，朋友！";
    } else if (hours >= 19) {
      // 晚上
      title = "晚上好，朋友！";
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
