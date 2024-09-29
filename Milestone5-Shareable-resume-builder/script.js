var form = document.getElementById('form');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLink = document.getElementById('shareable-link');
var downloadPDF = document.getElementById('download-pdf');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get references to form elements using their IDs
    var usernameElement = document.getElementById('username');
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('Education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
        var username = usernameElement.value;
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        // Create resume output
        var resumeOutput = "\n        <h2> Editable Resume</h2>\n        <h3>Personal Information:</h3>\n        <p><strong>Name:</strong> <span contenteditable=\"true\"> ".concat(name_1, "</span></p>\n        <p><strong>Email:</strong><span contenteditable=\"true\"> ").concat(email, " </span></p>\n        <p><strong>Phone Number:</strong><span contenteditable=\"true\"> ").concat(phone, " </span></p>\n\n        <h3>Education:</h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n\n        <h3>Work Experience:</h3>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n\n        <h3>Skills:</h3>\n        <p contenteditable=\"true\">").concat(skills, "</p>\n        ");
        var resumeOutputElement = document.getElementById('display-resume');
        //Generate shareable URL
        var shareableURL = "".concat(window.location.origin, "? username=").concat(encodeURIComponent(username));
        //Display the shareable URL
        shareableLinkContainer.style.display = 'block';
        shareableLink.href = shareableURL;
        shareableLink.textContent = shareableURL;
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
        }
        else {
            console.error('The resume output element is missing');
        }
    }
    else {
        console.error('One or more form elements are missing');
    }
});
//PDF Downlaod
downloadPDF.addEventListener('click', function () {
    window.print();
});
//prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlparams = new URLSearchParams(window.location.search);
    var username = urlparams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem('username');
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value =
                resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value =
                resumeData.phone;
            document.getElementById('Education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
