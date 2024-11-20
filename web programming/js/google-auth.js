// Function to update the current time
function updateTime() {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    // Ensure the element exists before updating
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.innerText = timeString;
    }
}

// Function to handle Google Sign-In response
function handleCredentialResponse(response) {
    const data = JSON.parse(atob(response.credential.split('.')[1]));
    alert(`Welcome, ${data.name}!`);

    // Optionally, display the user's name on the page
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement) {
        userInfoElement.innerText = `Hello, ${data.name}!`;
    }
}

// Initialize the Google Sign-In client
//window.onload = () => {
    //google.accounts.id.initialize({
        //client_id: "337756710961-f44mssu7n73qb4ecpmftq4q12nfln8uu.apps.googleusercontent.com",
        //callback: handleCredentialResponse,
   // });

    //google.accounts.id.renderButton(
        document.querySelector("#google-sign-in"),
       //// { theme: "outline", size: "large" }
    //);

    // Update the time every second
    setInterval(updateTime, 1000);

    // Add event listener for setting the background image
    document.getElementById('setBgImage').addEventListener('click', () => {
        const imageUrl = document.getElementById('bgImageUrl').value;
        if (imageUrl && imageUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
            document.body.style.backgroundImage = `url('${imageUrl}')`;
        } else {
            alert('Please enter a valid image URL!');
        }
    });
};

// Initialize EmailJS with your Public Key
emailjs.init('bnbopghJeWXwc1hkQ');  // Replace with your EmailJS Public Key

// Handle form submission for comment section
const form = document.getElementById('commentForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // Send email using EmailJS
    emailjs.send('service_szk462n', 'template_n42lkwk', {
        from_name: name,
        comment: comment,
    })
    .then(function (response) {
        alert('Thank you for your comment!');
        form.reset();
    }, function (error) {
        alert('Failed to send comment. Please try again.');
    });
});
