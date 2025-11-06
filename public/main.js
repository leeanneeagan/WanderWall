// <!-- Project Foundation  
// This project was built using a template as a starting point and customized to fit the app’s unique features and design.  
// All final code and design choices were reviewed, tested, and implemented by the author.
//  -->



var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('down', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});


var editIcons = document.getElementsByClassName('edit')
var trashIcons = document.getElementsByClassName('fa-trash')

// ✏️ EDIT message
Array.from(editIcons).forEach(function (element) {
  element.addEventListener('click', function () {
    const msgContainer = this.parentNode
    const name = msgContainer.querySelector('.name').innerText
    const msgTextElement = msgContainer.querySelector('.text')
    const oldMsg = msgTextElement.innerText

    // Create input field
    const input = document.createElement('textarea')
    input.value = oldMsg
    input.classList.add('edit-input')

    // Replace text with input
    msgContainer.replaceChild(input, msgTextElement)
    input.focus()

    // Save when user presses Enter or clicks outside
    input.addEventListener('blur', saveEdit)
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        saveEdit()
      }
    })

    function saveEdit() {
      const newMsg = input.value.trim()
      if (newMsg && newMsg !== oldMsg) {
        fetch('messages', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            oldMsg: oldMsg,
            newMsg: newMsg
          })
        })
          .then(response => response.ok && response.json())
          .then(() => window.location.reload(true))
      } else {
        // If no change, restore old text
        msgContainer.replaceChild(msgTextElement, input)
      }
    }
  })
})

// 🗑️ DELETE message
Array.from(trashIcons).forEach(function (element) {
  element.addEventListener('click', function () {
    const msgContainer = this.parentNode
    const name = msgContainer.querySelector('.name').innerText
    const msg = msgContainer.querySelector('.text').innerText

    fetch('messages', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, msg: msg })
    }).then(() => window.location.reload())
  })
})
