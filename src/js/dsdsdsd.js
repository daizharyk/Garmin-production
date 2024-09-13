// Получаем имя папки из JSON
const folderName = item.folder_name;

// Основные элементы баннера
document.querySelector(".banner-title").textContent = item.banner_text.title;
document.querySelector(".disc-right").textContent = item.banner_text.text;
document.getElementById("bannerwithtext").src = `../img/smartwatch_info_pictures/${folderName}/${item.banner_text.banner_images.main_banner}`;
document.getElementById("bannerwithtext").alt = item.banner_text.banner_images.alt;
document.getElementById("bannerwithtext-adaptive").src = `../img/smartwatch_info_pictures/${folderName}/${item.banner_text.banner_images.adaptive_banner}`;
document.getElementById("bannerwithtext-adaptive").alt = item.banner_text.banner_images.alt;

// Видео
const videoThumbnail = document.querySelector(".video-thumbnail");
videoThumbnail.querySelector("img").src = `../img/smartwatch_info_pictures/${folderName}/${item.video_section.thumbnail}`;
document.querySelector(".thumbnail-img").alt = item.video_section.thumbnail;
document.getElementById("video-player").src = item.video_section.video_url;

// Дополнительные изображения
document.querySelector(".walpapperinfo").src = `../img/smartwatch_info_pictures/${folderName}/${item.additional_images.main_image}`;
document.querySelector(".walpapperinfo-adaptive").src = `../img/smartwatch_info_pictures/${folderName}/${item.additional_images.adaptive_image}`;

// Информация о функциях
const functionInfoContainer = document.querySelector(".cards-container");
item.watch_features.forEach((feature) => {
  const card = document.createElement("div");
  card.classList.add("function-info-card");
  const img = document.createElement("img");
  img.src = `../img/smartwatch_info_pictures/${folderName}/${feature.image}`;
  img.alt = feature.title;
  const title = document.createElement("h2");
  title.textContent = feature.title;
  const description = document.createElement("p");
  description.textContent = feature.description;
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(description);
  functionInfoContainer.appendChild(card);
});
