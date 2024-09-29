const form = document.getElementById('form') as HTMLFormElement;
const shareableLinkContainer =document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLink =document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPDF =document.getElementById('download-pdf') as HTMLButtonElement;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get references to form elements using their IDs
    const usernameElement =document.getElementById('username');
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const educationElement = document.getElementById('Education');
    const experienceElement = document.getElementById('experience');
    const skillsElement = document.getElementById('skills');

    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {

        
        const username =(usernameElement as HTMLInputElement).value;
        const name = (nameElement as HTMLInputElement).value;
        const email = (emailElement as HTMLInputElement).value;
        const phone = (phoneElement as HTMLInputElement).value;
        const education = (educationElement as HTMLInputElement).value;
        const experience = (experienceElement as HTMLInputElement).value;
        const skills = (skillsElement as HTMLInputElement).value;


        // Create resume output
        const resumeOutput = `
        <h2> Editable Resume</h2>
        <h3>Personal Information:</h3>
        <p><strong>Name:</strong> <span contenteditable="true"> ${name}</span></p>
        <p><strong>Email:</strong><span contenteditable="true"> ${email} </span></p>
        <p><strong>Phone Number:</strong><span contenteditable="true"> ${phone} </span></p>

        <h3>Education:</h3>
        <p contenteditable="true">${education}</p>

        <h3>Work Experience:</h3>
        <p contenteditable="true">${experience}</p>

        <h3>Skills:</h3>
        <p contenteditable="true">${skills}</p>
        `;

        const resumeOutputElement = document.getElementById('display-resume') as HTMLDivElement;

        //Generate shareable URL
        const shareableURL = `${window.location.origin}? username=${encodeURIComponent(username)}`;

        //Display the shareable URL
        shareableLinkContainer.style.display ='block';
        shareableLink.href = shareableURL;
        shareableLink.textContent = shareableURL;

        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
        } else {
            console.error('The resume output element is missing');
        }
    } else {
        console.error('One or more form elements are missing');
    }
});

//PDF Downlaod
downloadPDF.addEventListener('click', ()=>{
    window.print()
})

//prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded' ,()=>{
    const urlparams =new URLSearchParams(window.location.search);
    const username =urlparams.get('username');

    if(username){
        const savedResumeData = localStorage.getItem('username');

        if(savedResumeData){
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value =username;
            (document.getElementById('name') as HTMLInputElement).value =
            resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value =
            resumeData.phone;
            (document.getElementById('Education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;


        }
    }
})
