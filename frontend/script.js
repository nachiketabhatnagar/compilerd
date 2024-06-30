// List of supported languages with corresponding values
const supportedLanguages = [
    { value: 'nodejs', label: 'Node.js' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'promptv1', label: 'Prompt v1' },
    { value: 'promptv2', label: 'Prompt v2' },
    { value: 'multifile', label: 'Multi-file' },
    { value: 'sqlite3', label: 'SQLite3' },
    { value: 'go', label: 'Go' },
    { value: 'php', label: 'PHP' },
    { value: 'rust', label: 'Rust' }
    // Add more languages as needed
];

// Function to execute code based on selected language
// Function to execute code based on selected language
async function runCode() {
    const language = document.getElementById('language').value;
    const script = document.getElementById('code').value;
    let stdin = document.getElementById('stdin').value.trim(); // Trim whitespace

    // Check if stdin is empty, set to null if empty
    stdin = stdin === '' ? " " : stdin;

    const payload = {
        language: language,
        script: script,
        stdin: stdin
    };

    try {
        const response = await fetch('http://localhost:3000/api/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('result').innerText = `Output: ${data.output}`;
        } else {
            document.getElementById('result').innerText = `Error: ${data.errorMessage}`;
        }
    } catch (error) {
        document.getElementById('result').innerText = `Error: ${error.message}`;
    }
}

// Populate the language dropdown options dynamically
function populateLanguageOptions() {
    const languageSelect = document.getElementById('language');

    supportedLanguages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.value;
        option.textContent = lang.label;
        languageSelect.appendChild(option);
    });
}

// Add event listener for the "Run Code" button
document.getElementById('runButton').addEventListener('click', runCode);

// Populate the dropdown options when the page loads
populateLanguageOptions();

// Dark mode toggle functionality
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme);

// Check local storage for theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}
