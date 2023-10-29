function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var functioner = null;

async function change__images__onhover(e, action) {
  let portfolio__imgs = e.querySelectorAll("[class*=image__stu__]");
  let profile_picture = e.getElementsByClassName("image__stu")[0];

  if (action === "interval") {
    for (var i = 0; i < portfolio__imgs.length; i++) {
      portfolio__imgs[i].style.display = "none"; // depending on what you're doing
    }
    let portfolio__img =
      portfolio__imgs[Math.floor(Math.random() * portfolio__imgs.length)];
    portfolio__img.style.display = "block";
  } else if (action === "start") {
    profile_picture.style.display = "none";
    change__images__onhover(e, "interval");
    functioner = setInterval(function () {
      change__images__onhover(e, "interval");
    }, 200);
  } else if (action === "stop") {
    clearInterval(functioner);

    for (var i = 0; i < portfolio__imgs.length; i++) {
      portfolio__imgs[i].style.display = "none"; // depending on what you're doing
    }

    profile_picture.style.display = "block";
  } else {
    // pass
  }
}

function image__uploader(e) {
  var exact__selector__id = e.classList[0];

  var image__uploader__input = document.getElementById(exact__selector__id);
  image__uploader__input.click();
}

function video__uploader(e) {
  var exact__selector__id = e.classList[0];
  var image__uploader__input = document.getElementById(exact__selector__id);
  image__uploader__input.click();
}
function pdf__uploader(e) {
  var exact__selector__id = e.classList[0];
  var image__uploader__input = document.getElementById(exact__selector__id);
  image__uploader__input.click();
}

function loadVideo(e, event) {
  if (event.target.files[0].type == "video/mp4") {
    var progress__bar = document.getElementById(
      `uploading__statues__${e.name}`
    );
    var image__clicked = document.getElementsByClassName(`${e.name}`)[0];
    console.log(progress__bar);
    progress__bar.classList.remove("d-none");

    var file1Size = event.target.files[0].size;
    image__clicked.classList.add("d-none");
    if (e.loaded <= file1Size) {
      var percent = Math.round((e.loaded / file1Size) * 100);
      progress__bar.innerHTML = `<h4 class="current__state">Uploading</h4><h1 class="current__progress">${percent} %</h1>`;
    }

    if (e.loaded == e.total) {
      progress__bar.innerHTML = `<h4 class="current__state text-center">Video Uploaded</h4><p>${event.target.files[0].name}</p><h1 class="current__progress text-success">100%</h1>`;
    }
  } else {
    alert("Upload Mp4 Video");
  }
}

function loadPdf(e, event) {
  if (event.target.files[0].type == "application/pdf") {
    var progress__bar = document.getElementById(
      `uploading__statues__${e.name}`
    );
    var image__clicked = document.getElementsByClassName(`${e.name}`)[0];
    console.log(progress__bar);
    progress__bar.classList.remove("d-none");

    var file1Size = event.target.files[0].size;
    image__clicked.classList.add("d-none");
    if (e.loaded <= file1Size) {
      var percent = Math.round((e.loaded / file1Size) * 100);
      progress__bar.innerHTML = `<h4 class="current__state">Uploading</h4><h1 class="current__progress">${percent} %</h1>`;
    }

    if (e.loaded == e.total) {
      progress__bar.innerHTML = `<h4 class="current__state text-center">PDF Uploaded</h4><p>${event.target.files[0].name}</p><h1 class="current__progress text-success">100%</h1>`;
    }
  } else {
    alert("Upload A PDF File");
  }
}

function loadImage(e, event) {
  if (
    event.target.files[0].type == "image/png" ||
    event.target.files[0].type == "image/gif" ||
    event.target.files[0].type == "image/jpeg"
  ) {
    $("#uploading__modal").modal("show");
    var image = document.getElementsByClassName(e.name)[0];
    var file1Size = event.target.files[0].size;

    if (e.loaded <= file1Size) {
      var percent = Math.round((e.loaded / file1Size) * 100);
      console.log(percent + "%");
      // document.getElementById("progress-bar-file1").style.width = percent + "%";
      document.getElementById("progress-bar-file").innerHTML = percent + "%";
    }

    if (e.loaded == e.total) {
      // document.getElementById("progress-bar-file1").style.width = "100%";
      document.getElementById("progress-bar-file").innerHTML = "100%";
      $("#uploading__modal").modal("hide");
    }

    image.src = URL.createObjectURL(event.target.files[0]);
  } else {
    alert("Upload Image File");
  }
}
      // <img class="pdf__uploader__1" src='/static/base/demos/upload_pdf.png' alt=""
      //     onclick="pdf__uploader(this)">
var pdf__html = `<div class="pdf__section__0 my-4">
  <div class="pdf__upload">
      <input type="text" name="pdf__uploader__1" id="pdf__uploader__1"
          class="">
      <div class="uploading__statues d-none" id="uploading__statues__pdf__uploader__1">
      </div>
  </div>
  </div>
  <button class="button__delete__upper" onClick="section__deletor(this)" type="button"><i class="fa fa-times-circle" ></i><span class="mx-2">DELETE UPPER SECTION</span></button>
                  <div
                    class="button__collection__adding__functionailties d-flex justify-content-center align-center my-5">
                    <button type="button" class="button_adding bg_bl_tx_wh mx-2" onclick="sectionAdder(this, 'pdf')">+
                        PDF</button>
                    <button type="button" class="button_adding bg_bl_tx_wh mx-2"
                        onclick="sectionAdder(this, 'images')">+ 3 Image Slot</button>
                    <button type="button" class="button_adding bg_bl_tx_wh mx-2" onclick="sectionAdder(this, 'video')">+
                        Video</button>
                    <button type="button" class="button_adding bg_bl_tx_wh mx-2" onclick="sectionAdder(this, 'image')">+
                        1 Image Header Size</button>
                </div>
  `;

var video__html = `<div class="video__section__0 my-4">
<div class="video__upload">
    <input type="file" name="video__uploader__1" onchange="loadVideo(this, event)"
        id="video__uploader__1" class="d-none">
    <img class="video__uploader__1" src='/static/base/demos/upload_video.png' alt=""
        onclick="video__uploader(this)">
    <div class="uploading__statues d-none" id="uploading__statues__video__uploader__1">
    </div>
</div>

</div>
<button class="button__delete__upper" onClick="section__deletor(this)" type="button"><i class="fa fa-times-circle" ></i><span class="mx-2">DELETE UPPER SECTION</span></button>
                <div
                    class="button__collection__adding__functionailties d-flex justify-content-center align-center my-5">
                    <button type="button" class="button_adding bg_bl_tx_wh mx-2" onclick="sectionAdder(this, 'pdf')">+
                        PDF</button>
                    <button type="button" class="button_adding bg_bl_tx_wh mx-2"
                        onclick="sectionAdder(this, 'images')">+ 3 Image Slot</button>
                    <button type="button" class="button_adding bg_bl_tx_wh mx-2" onclick="sectionAdder(this, 'video')">+
                        Video</button>
                    <button type="button" class="button_adding bg_bl_tx_wh mx-2" onclick="sectionAdder(this, 'image')">+
                        1 Image Header Size</button>
                </div>
`;

var single__image__html = `<div class="single__image__section__0 my-4">
<div class="single__image__upload">
    <input type="file" name="single__image__upload__1" id="single__image__upload__1"
        onchange="loadImage(this, event)" class="d-none">
    <img class="single__image__upload__1"
        src='/static/base/demos/upload_single_image_demo.png' alt=""
        onclick="image__uploader(this)">
</div>

</div>
<button class="button__delete__upper" onClick="section__deletor(this)" type="button"><i class="fa fa-times-circle" ></i><span class="mx-2">DELETE UPPER SECTION</span></button>
                <div
                    class="button__collection__adding__functionailties d-flex justify-content-center align-center my-5">
                    <button type="button" class="button_adding bg_bl_tx_wh mx-2" onclick="sectionAdder(this, 'pdf')">+
                        PDF</button>
                    <button type="button" class="button_adding bg_bl_tx_wh mx-2"
                        onclick="sectionAdder(this, 'images')">+ 3 Image Slot</button>
                    <button type="button" class="button_adding bg_bl_tx_wh mx-2" onclick="sectionAdder(this, 'video')">+
                        Video</button>
                    <button type="button" class="button_adding bg_bl_tx_wh mx-2" onclick="sectionAdder(this, 'image')">+
                        1 Image Header Size</button>
                </div>
`;

var images__html = `
<div class="images__section__0 my-4">
<div class="image__upload">
    <input type="file" name="image__upload__1" id="image__upload__1"
        onchange="loadImage(this, event)" class="d-none">
    <img class="image__upload__1" src='/static/base/demos/upload_image_demo.png' alt=""
        onclick="image__uploader(this)">
</div>
<div class="image__upload">
    <input type="file" name="image__upload__2" id="image__upload__2"
        onchange="loadImage(this, event)" class="d-none">
    <img class="image__upload__2" src='/static/base/demos/upload_image_demo.png' alt=""
        onclick="image__uploader(this)">
</div>
<div class="image__upload">
    <input type="file" name="image__upload__3" id="image__upload__3"
        onchange="loadImage(this, event)" class="d-none">
    <img class="image__upload__3" src='/static/base/demos/upload_image_demo.png' alt=""
        onclick="image__uploader(this)">
</div>
</div>
<button class="button__delete__upper" onClick="section__deletor(this)" type="button"><i class="fa fa-times-circle" ></i><span class="mx-2">DELETE UPPER SECTION</span></button>
  <div
      class="button__collection__adding__functionailties d-flex justify-content-center align-center my-5">
      <button type="button" class="button_adding bg_bl_tx_wh mx-2" onclick="sectionAdder(this, 'pdf')">+
          PDF</button>
      <button type="button" class="button_adding bg_bl_tx_wh mx-2"
          onclick="sectionAdder(this, 'images')">+ 3 Image Slot</button>
      <button type="button" class="button_adding bg_bl_tx_wh mx-2" onclick="sectionAdder(this, 'video')">+
          Video</button>
      <button type="button" class="button_adding bg_bl_tx_wh mx-2" onclick="sectionAdder(this, 'image')">+
          1 Image Header Size</button>
  </div>
                

`;

function sectionAdder(e, type, use__pre__defined__ele = false) {
  var all_btn__div = null;
  var main__div = null;
  if (!use__pre__defined__ele) {
    all_btn__div = e.parentElement;
    main__div = all_btn__div.parentElement;
  } else {
    all_btn__div = e;
    main__div = e;
  }

  if (type === "pdf") {
    $(all_btn__div).eq(0).after(pdf__html);
  } else if (type === "images") {
    $(all_btn__div).eq(0).after(images__html);
  } else if (type === "image") {
    $(all_btn__div).eq(0).after(single__image__html);
  } else if (type === "video") {
    $(all_btn__div).eq(0).after(video__html);
  }

  var all_divs_section = $(main__div).children(
    `div:not("[class*='button__collection__adding__functionailties']"):not("[class*='button__delete__upper']")`
  );
  for (let i = 0; i < all_divs_section.length; i++) {
    var classNamesOfDivs = $(all_divs_section[i]).attr("class");
    if (classNamesOfDivs.indexOf("pdf") >= 0) {
      //     <!-- <div class="pdf__section__0 my-4">
      //     <div class="pdf__upload">
      //         <input type="file" name="pdf__uploader__1" onchange="loadPdf(this, event)" id="pdf__uploader__1"
      //             class="d-none">
      //         <img class="pdf__uploader__1" src="{% static 'base/demos/upload_pdf.png' %}" alt=""
      //             onclick="pdf__uploader(this)">
      //         <div class="uploading__statues d-none" id="uploading__statues__pdf__uploader__1">
      //         </div>
      //     </div>

      // </div> -->

      var pdf__div = $(all_divs_section[i]).children(`[class*="pdf__upload"]`);
      var pdf__div_none = $(pdf__div).children('img').hasClass('d-none')?"d-none":""

      $(pdf__div)
        .children("input")
        .attr("name", `pdf__uploader__${i + 1}`)
        .attr("id", `pdf__uploader__${i + 1}`);
      $(pdf__div)
        .children("img")
        .attr("class", `pdf__uploader__${i + 1} ${pdf__div_none}`)
        .attr("id", `pdf__uploader__${i + 1}`);
      $(pdf__div)
        .children("div")
        .attr("id", `uploading__statues__pdf__uploader__${i + 1}`);

      $(pdf__div)
        .children("textarea")
        .html(`${i + 1}`);
      
      $(all_divs_section[i]).attr(
        "class",
        `pdf__section__${i + 1} section__items__${i + 1} my-4`
      );
    }
    if (classNamesOfDivs.indexOf("video") >= 0) {
      //   <div class="video__section__0 my-4">
      //     <div class="video__upload">
      //         <input type="file" name="video__uploader__1" onchange="loadVideo(this, event)"
      //             id="video__uploader__1" class="d-none">
      //         <img class="video__uploader__1" src="{% static 'base/demos/upload_video.png' %}" alt=""
      //             onclick="video__uploader(this)">
      //         <div class="uploading__statues d-none" id="uploading__statues__video__uploader__1">
      //         </div>
      //     </div>
      // </div>
      var video__div = $(all_divs_section[i]).children(
        `[class*="video__upload"]`
      );

      var video__div_none = $(video__div).children('img').hasClass('d-none')?"d-none":""

      $(video__div)
        .children("input")
        .attr("name", `video__uploader__${i + 1}`)
        .attr("id", `video__uploader__${i + 1}`);
      $(video__div)
        .children("img")
        .attr("class", `video__uploader__${i + 1} ${video__div_none}`);
      $(video__div)
        .children("div")
        .attr("id", `uploading__statues__video__uploader__${i + 1}`);

      $(video__div)
        .children("textarea")
        .html(`${i + 1}`);

      $(all_divs_section[i]).attr(
        "class",
        `video__section__${i + 1} section__items__${i + 1} my-4`
      );
      
    }
    if (classNamesOfDivs.indexOf("image") >= 0) {
      //   <div class="single__image__section__0 my-4">
      //     <div class="single__image__upload">
      //         <input type="file" name="single__image__upload__1" id="single__image__upload__1"
      //             onchange="loadImage(this, event)" class="d-none">
      //         <img class="single__image__upload__1"
      //             src="{% static 'base/demos/upload_single_image_demo.png' %}" alt=""
      //             onclick="image__uploader(this)">
      //     </div>
      // </div>

      var image__div = $(all_divs_section[i]).children(
        `[class*="single__image__upload"]`
      );
      var image__div_none = $(image__div).children('img').hasClass('d-none')?"d-none":""

      $(image__div)
        .children("input")
        .attr("name", `single__image__upload__${i + 1}`)
        .attr("id", `single__image__upload__${i + 1}`);

      $(image__div)
        .children("img")
        .attr("class", `single__image__upload__${i + 1} ${image__div_none}`);
      $(image__div)
        .children("textarea")
        .html(`${i + 1}`);

      $(all_divs_section[i]).attr(
        "class",
        `single__image__section__${i + 1} section__items__${i + 1} my-4`
      );
    }
    if (classNamesOfDivs.indexOf("images") >= 0) {
      //   <div class="images__section__0 my-4">
      //     <div class="image__upload">
      //         <input type="file" name="image__upload__1" id="image__upload__1"
      //             onchange="loadImage(this, event)" class="d-none">
      //         <img class="image__upload__1" src="{% static 'base/demos/upload_image_demo.png' %}" alt=""
      //             onclick="image__uploader(this)">
      //     </div>
      //     <div class="image__upload">
      //         <input type="file" name="image__upload__2" id="image__upload__2"
      //             onchange="loadImage(this, event)" class="d-none">
      //         <img class="image__upload__2" src="{% static 'base/demos/upload_image_demo.png' %}" alt=""
      //             onclick="image__uploader(this)">
      //     </div>
      //     <div class="image__upload">
      //         <input type="file" name="image__upload__3" id="image__upload__3"
      //             onchange="loadImage(this, event)" class="d-none">
      //         <img class="image__upload__3" src="{% static 'base/demos/upload_image_demo.png' %}" alt=""
      //             onclick="image__uploader(this)">
      //     </div>
      // </div>
      var images__divs = $(all_divs_section[i]).children(
        `[class*="image__upload"]`
      );
        var images__div_none = ""
      for (let j = 0; j < images__divs.length; j++) {
      images__div_none = $(images__divs[j]).children('img').hasClass('d-none')?"d-none":""
        $(images__divs[j])
          .children("input")
          .attr("name", `image__upload__${i + 1}_${j + 1}`)
          .attr("id", `image__upload__${i + 1}_${j + 1}`);
        $(images__divs[j])
          .children("img")
          .attr("class", `image__upload__${i + 1}_${j + 1} ${images__div_none}`);
        $(images__divs[j])
          .children("textarea")
          .html(`${i + 1}`);
      }

      $(all_divs_section[i]).attr(
        "class",
        `images__section__${i + 1} section__items__${i + 1} my-4`
      );
    }
  }
  var all_adding_buttons = $(main__div).children(
    `[class*='button__collection__adding__functionailties']`
  );
  for (let i = 0; i < all_adding_buttons.length; i++) {
    $(all_adding_buttons[i]).attr(
      "class",
      `button__collection__adding__functionailties__${i} d-flex justify-content-center align-center my-5`
    );
  }
  var all_delete_btns = $(main__div).children(
    `[class*='button__delete__upper']`
  );
  for (let i = 0; i < all_delete_btns.length; i++) {
    $(all_delete_btns[i]).attr("class", `button__delete__upper__${i + 1}`);
  }
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function section__deletor(e) {
  var clickedItemToDelete = $(e).attr("class").slice(23);
  removeElementsByClass(`section__items__${clickedItemToDelete}`);
  removeElementsByClass(`button__delete__upper__${clickedItemToDelete}`);
  removeElementsByClass(
    `button__collection__adding__functionailties__${clickedItemToDelete}`
  );
  sectionAdder(document.getElementsByClassName("index__0")[0], null, true);
}

function section__deletor_backend(index) {
  if (localStorage.getItem("deleted__items")) {
    localStorage.setItem(
      "deleted__items",
      `${index} ${localStorage.getItem("deleted__items")}`
    );
  } else {
    localStorage.setItem("deleted__items", `${index}`);
  }
  $("#deleted__items").attr("value", localStorage.getItem("deleted__items"));
}


