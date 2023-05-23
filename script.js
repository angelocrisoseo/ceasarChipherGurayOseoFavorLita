

function startEncryption() {
  var welcomeContainer = document.querySelector('.welcome-container');
  var encryptionContainer = document.getElementById('encryptionContainer');
  
  welcomeContainer.style.display = 'none';
  encryptionContainer.style.display = 'block';
}

// Rest of the existing JavaScript code...

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeContainerColor() {
  var container = document.getElementById("myContainer");
  container.style.backgroundColor = getRandomColor();
}

// setInterval(changeContainerColor, 2000); // Change color every 2 seconds

// function encryptFile() {
//   // ... existing code for encryption ...
// }

// function decryptFile() {
//   // ... existing code for decryption ...
// }

// function saveFile(file) {
//   // ... existing code for saving file ...
// }

// function caesarCipherEncode(text, key) {
//   // ... existing code for Caesar cipher encryption ...
// }

// function caesarCipherDecode(text, key) {
//   // ... existing code for Caesar cipher decryption ...
// }


function encryptFile() {
    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];
    var encryptionKeyInput = document.getElementById('encryption-key');
    var encryptionKey = parseInt(encryptionKeyInput.value);
  
    if (file && Number.isInteger(encryptionKey)) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        var contents = e.target.result;
        var encryptedContents = caesarCipherEncode(contents, encryptionKey);
  
        var encryptedBlob = new Blob([encryptedContents], { type: 'text/plain' });
        var encryptedFile = new File([encryptedBlob], file.name, { type: 'text/plain' });
        saveFile(encryptedFile);
      };
  
      reader.readAsText(file);
    }
  }
  
  function decryptFile() {
    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];
    var encryptionKeyInput = document.getElementById('encryption-key');
    var encryptionKey = parseInt(encryptionKeyInput.value);
  
    if (file && Number.isInteger(encryptionKey)) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        var contents = e.target.result;
        var decryptedContents = caesarCipherDecode(contents, encryptionKey);
  
        var decryptedBlob = new Blob([decryptedContents], { type: 'text/plain' });
        var decryptedFile = new File([decryptedBlob], file.name, { type: 'text/plain' });
        saveFile(decryptedFile);
      };
  
      reader.readAsText(file);
    }
  }
  
  function saveFile(file) {
    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = file.name;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  function caesarCipherEncode(text, key) {
    var shift = key % 26; // Number of positions to shift characters
    var encodedText = '';
  
    for (var i = 0; i < text.length; i++) {
      var charCode = text.charCodeAt(i);
  
      // Encrypt uppercase letters (A-Z)
      if (charCode >= 65 && charCode <= 90) {
        encodedText += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
      }
      // Encrypt lowercase letters (a-z)
      else if (charCode >= 97 && charCode <= 122) {
        encodedText += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
      }
      // Leave non-alphabetic characters as they are
      else {
        encodedText += text.charAt(i);
      }
    }
  
    return encodedText;
  }
  
  function caesarCipherDecode(text, key) {
    var shift = key % 26; // Number of positions to shift characters
    var decodedText = '';
  
    for (var i = 0; i < text.length; i++) {
      var charCode = text.charCodeAt(i);
  
      // Decrypt uppercase letters (A-Z)
      if (charCode >= 65 && charCode <= 90) {
        decodedText += String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
      }
      // Decrypt lowercase letters (a-z)
      else if (charCode >= 97 && charCode <= 122) {
        decodedText += String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
      }
      // Leave non-alphabetic characters as they are
      else {
        decodedText += text.charAt(i);
      }
    }
  
    return decodedText;
  }
  