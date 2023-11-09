(function() {
  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function(k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      
      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail
      = form.dataset.email || ""; // no email by default

    return {data: formData, honeypot: honeypot};
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot || !handleNotValidResultFields(validateForm(formData))) {
      return false;
    }

    // return false;

    showFormStatusMessage('progress');

    disableAllButtons(form, true);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          form.reset();
          disableAllButtons(form, false);
          showFormStatusMessage('success');
        } else {
          disableAllButtons(form, false);
          showFormStatusMessage('warning');
        }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }
  
  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form, disable) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = disable;
    }
  }

  function showFormStatusMessage(entity) {
    var postMessages = document.querySelectorAll(".tg-message-post-form");
    for (var i = 0; i < postMessages.length; i++) {
      postMessages[i].style.display = "none";
    }

    switch (entity) {
      case 'success': 
        var message = document.querySelector("#form-message-success");
        message.style.display = "block";
        break;
      case 'warning': 
        var message = document.querySelector("#form-message-warning");
        message.style.display = "block";
        break;
      case 'warning-fields': 
        var message = document.querySelector("#form-message-warning-fields");
        message.style.display = "block";
        break;
      case 'progress': 
        var message = document.querySelector("#form-message-progress");
        message.style.display = "block";
        break;
      default: 
        console.log(`Could not find entity : ${entity}`); 
        break;
    }
  }

  function handleNotValidResultFields(fields) {
    if (!fields) {
      return true;
    }

    var fieldsElements = document.querySelectorAll(".form-control-text-error");
    fieldsElements.forEach((elem) => {
      elem.classList.remove("form-control-text-error");
    });

    fields.forEach((elem) => {
      var element = document.querySelector(`#${elem}`);
      element.classList.add("form-control-text-error");
    });

    showFormStatusMessage("warning-fields");

    return false;
  }

  function validateForm(formData) {
    var fieldList = []

    // console.log(formData);

    if (!validateEmail(formData.data.email)) {
      fieldList.push('email');
    }

    if (!validatePhone(formData.data.phone, 20)) {
      fieldList.push('phone');
    }

    if (!validateJustText(formData.data.first_name)) {
      fieldList.push('first_name');
    }

    if (!validateJustText(formData.data.last_name)) {
      fieldList.push('last_name');
    }

    if (!validateAnyText(formData.data.subject, 100)) {
      fieldList.push('subject');
    }

    if (!validateAnyText(formData.data.message, 1500)) {
      fieldList.push('message');
    }

    // console.log(fieldList);

    return fieldList;
  }

  function validatePhone(elm, maxLen = 20) {
    const trimElm = elm.trim();
    if (trimElm.length < 3 || trimElm.length > maxLen) {
      return false;
    }
    return trimElm.match(/^\+[0-9]+|[0-9]+$/) != null;
  }
  
  function validateEmail(elm, maxLen = 200) {
    const trimElm = elm.trim();
    if (trimElm.length < 4 || trimElm.length > maxLen) {
      return false;
    } 
    return trimElm.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) != null;
  }
  
  function validateJustText(elm, maxLen = 150) {
    const trimElm = elm.trim();
    // if (trimElm.length < 1 || trimElm.length > maxLen) {
    //   return false;
    // }
    // return trimElm.match(`/^[a-zA-Z ]{1,${maxLen}}$/`) != null;
    return trimElm.match(/^[a-zA-Z ]{1,50}$/) != null;
  }

  function validateAnyText(elm, maxLen = 200) {
    const trimElm = elm.trim();
    if (trimElm.length < 1 || trimElm.length > maxLen) {
      return false;
    }
    return true;
  }


})();

