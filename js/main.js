// function writeWorkData() {
//   const node = document.createElement("h4");
//   const textnode = document.createTextNode("Hello World");
//   node.appendChild(textnode);
//   document.querySelector('#tg_work').appendChild(node);
// }

// function writeWorkData_2() {
  //alert(JSON.stringify(tgFreeWork));
  // tgFreeWork.content.forEach(element => {
  //   const node = document.createElement("div");
  //   node.innerHTML =
  //     `
  //           <div>
  //               <p>${element.title}</p>
  //               <p>${element.link}</p>
  //               <p>${element.text}</p>
  //               <p>${element.img}</p>
  //           </div>
  //           <br>
  //           `;
  //   document.querySelector('#tg_work_2').appendChild(node);
  // });
  // const node = document.createElement("div");
  // let content = "";
  // const count = 10;
  // for(let i = 0; i < count; i++) {
  //     content += 
  //     `
  //     <div>
  //         <p>${i}</p>
  //     </div>
  //     `;
  // }
  // node.innerHTML = content;
  // document.querySelector('#tg_work_2').appendChild(node);
// }



// document.addEventListener('DOMContentLoaded', function () {
//   writeWorkData();
//   writeWorkData_2();
// });


// (function ($) {
//   "use strict";
//   $(document).ready(function () {
//     const node = document.createElement("h4");
//     const textnode = document.createTextNode("Hello World");
//     node.appendChild(textnode);
//     document.querySelector('#tg_work').appendChild(node);
//   });

  
// })(jQuery); 

// $(document).ready(function(){
  
// });

(function ($) {
  "use strict";
  $(document).ready(function () {
    tgFreeWork.content.forEach(element => {

      let contentText = element.text;
      if (contentText.length >= 250) { // max item post character count
        contentText = contentText.substring(0, 250 - 3);
        contentText += '...';
      }

      const elemContent =
        `<div class="item" data-bs-placement="top" data-bs-toggle="tooltip" title="${tgFreeWork.tooltip}">
          <a href="${element.link}" target="_blank">
            <div class="col-md-12 wow fadeInUp ">
              <div class="main_services text-center" >
                <img class="round_picture_img" src="${element.img}">
                <h3 class="mt-3"> 
                  ${element.title}
                </h3>
                <p>
                  ${contentText} 
                </p>
              </div>
            </div>
          </a>
        </div>`;

      $('#owl-carousel-container').trigger('add.owl.carousel', elemContent);
      $('#owl-carousel-container').trigger('refresh.owl.carousel');
    });

    $('[data-bs-toggle="tooltip"]').tooltip();
    $('[data-bs-toggle="tooltip"]').click(_ => {
      console.log('CLICK_1');
      $('[data-bs-toggle="tooltip"]').tooltip('hide');
    });
    $('[data-bs-toggle="tooltip"]').tooltip({ trigger: "hover" });

    $('[data-bs-toggle="tooltip"]').on('click', function () {
      $(this).tooltip('hide')
    });
  });
})(jQuery); 