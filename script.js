function submitCorrection() {
    const a = document.getElementById('inputA').value;
    const t = parseFloat(document.getElementById('inputT').value);
    const tn = document.getElementById('inputTN').value;
    const outputDiv = document.getElementById('output');
    const copyBtn = document.getElementById('copyBtn');
  
    outputDiv.textContent = "Processing...";
    copyBtn.style.display = "none";
  
    fetch('http://localhost:5000/normalize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a, t, tn })
    })
      .then(res => res.json())
      .then(data => {
        if (data.cv) {
          outputDiv.textContent = data.cv;
          copyBtn.style.display = "inline-block";
        } else {
          outputDiv.textContent = data.error;
        }
      })
      .catch(err => {
        outputDiv.textContent = 'Error: ' + err.message;
      });
  }
  
  function copyOutput() {
    const outputText = document.getElementById('output').textContent;
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = outputText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    alert("Output copied to clipboard!");
  }
  
  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    document.getElementById('themeText').textContent = newTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
  }
  