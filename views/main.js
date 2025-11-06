var editIcons = document.getElementsByClassName('edit')
var trashIcons = document.getElementsByClassName('fa-trash')

// ✏️ EDIT message
Array.from(editIcons).forEach(function (element) {
  element.addEventListener('click', function () {
    const msgContainer = this.closest('.message')
    const name = msgContainer.querySelector('.name').innerText
    const msgTextElement = msgContainer.querySelector('.text')
    const oldMsg = msgTextElement.innerText

    // Create an input field
    const input = document.createElement('textarea')
    input.value = oldMsg
    input.classList.add('edit-input')

    // Replace text with input
    msgContainer.replaceChild(input, msgTextElement)
    input.focus()

    // Save when user leaves field or presses Enter
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
        fetch('/messages', {   // <-- added leading /
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
          .catch(err => console.error(err))
      } else {
        // Restore old text if no change
        msgContainer.replaceChild(msgTextElement, input)
      }
    }
  })
})

// 🗑️ DELETE message
Array.from(trashIcons).forEach(function (element) {
  element.addEventListener('click', function () {
    const msgContainer = this.closest('.message')
    const name = msgContainer.querySelector('.name').innerText
    const msg = msgContainer.querySelector('.text').innerText

    fetch('/messages', {   // <-- added leading /
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, msg: msg })
    }).then(() => window.location.reload())
  })
})
