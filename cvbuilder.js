document.addEventListener('DOMContentLoaded', function () {
    let currentStep = 0;
    const steps = document.querySelectorAll('.step');
  
    //  navigation between steps
    function showStep() {
        steps.forEach((step, index) => {
            step.classList.toggle('hidden', index !== currentStep);
        });
        updateProgressBar();
    }
  
    function updateProgressBar() {
        const indicators = document.querySelectorAll('[id^="step-"]');
        indicators.forEach((indicator, index) => {
            if (index < currentStep) {
                indicator.classList.add('bg-green-600');
                indicator.classList.remove('bg-blue-600');
            } else if (index === currentStep) {
                indicator.classList.add('bg-blue-600');
                indicator.classList.remove('bg-green-600');
            } else {
                indicator.classList.remove('bg-green-600', 'bg-blue-600');
                indicator.classList.add('bg-gray-300');
            }
        });
    }

      // Navigation buttons
  document.querySelectorAll('[id^="nextBtn"]').forEach((button) => {
    button.addEventListener('click', function () {
        if (validateStep()) {
            currentStep++;
            showStep();
        }
    });
});

document.querySelectorAll('[id^="prevBtn"]').forEach((button) => {
    button.addEventListener('click', function () {
        currentStep--;
        showStep();
    });
});

document.getElementById('finishBtn').addEventListener('click', function () {
    if (validateStep()) {
        collectData();
        displayResume();
    }
});

 // Validate input in each step & regex
 function validateStep() {
    let isValid = true;

    if (currentStep === 0) {
      const name = document.getElementById('name').value.trim();
      const role = document.getElementById('role').value.trim();  
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
  
      // mail regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      // phone regex (+212 701254151)
      const phoneRegex = /^\+\d{1,3} \d{8,15}$/;
  
      if (!name || !role || !email || !phone) {
          alert("Veuillez remplir tous les champs obligatoires.");
          isValid = false;
      } else if (!emailRegex.test(email)) {
          alert("Veuillez entrer une adresse e-mail valide.");
          isValid = false;
      } else if (!phoneRegex.test(phone)) {
          alert("un numéro de téléphone valid (Exemple +212 701254151)");
          isValid = false;
      }
  }

    if (currentStep === 1) {
        const jobTitle = document.getElementById('job-title').value.trim();
        const profileSummary = document.getElementById('profile-summary').value.trim();
        if (!jobTitle || !profileSummary) {
            alert("Veuillez remplir le titre du poste et le résumé de profil.");
            isValid = false;
        }
    }

    if (currentStep === 1) {
      const githubLink = document.getElementById('github-link').value.trim();
      const linkedinLink = document.getElementById('linkedin-link').value.trim();
  
      // regex for URL 
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  
      if (!githubLink && !linkedinLink) {
          alert("Veuillez remplir au moins un lien.");
          isValid = false;
      } else {
          if (githubLink && !urlRegex.test(githubLink)) {
              alert("Veuillez entrer un lien valide.");
              isValid = false;
          }
          if (linkedinLink && !urlRegex.test(linkedinLink)) {
              alert("Veuillez entrer un lien valide.");
              isValid = false;
          }
      }
  }

    if (currentStep === 2) {
        const experienceEntries = document.querySelectorAll('#experience-list .experience-entry');
        experienceEntries.forEach(entry => {
            const company = entry.querySelector('input[type="text"]').value.trim();
            const location = entry.querySelectorAll('input[type="text"]')[1].value.trim();
            const startMonth = entry.querySelectorAll('select')[0].value;
            const startYear = entry.querySelectorAll('input[type="number"]')[0].value.trim();
            const endMonth = entry.querySelectorAll('select')[1].value;
            const endYear = entry.querySelectorAll('input[type="number"]')[1].value.trim();
            const description = entry.querySelector('textarea').value.trim();

            if (!company || !location || !startMonth || !startYear || !endMonth || !endYear || !description) {
                alert("Veuillez compléter tous les champs d'une expérience professionnelle.");
                isValid = false;
            }
        });
    }

    if (currentStep === 3) {
        const educationEntries = document.querySelectorAll('#education-list .education-entry');
        educationEntries.forEach(entry => {
            const school = entry.querySelector('input[type="text"]').value.trim();
            const degree = entry.querySelectorAll('input[type="text"]')[1].value.trim();
            const startMonth = entry.querySelectorAll('select')[0].value;
            const startYear = entry.querySelectorAll('input[type="number"]')[0].value.trim();
            const endMonth = entry.querySelectorAll('select')[1].value;
            const endYear = entry.querySelectorAll('input[type="number"]')[1].value.trim();

            if (!school || !degree || !startMonth || !startYear || !endMonth || !endYear) {
                alert("Veuillez compléter tous les champs d'une formation.");
                isValid = false;
            }
        });
    }

    if (currentStep === 4) {
        const skillEntries = document.querySelectorAll('#skills-list .skills-entry');
        if (!Array.from(skillEntries).some(entry => {
            const skill = entry.querySelector('input[type="text"]').value.trim();
            return skill;
        })) {
            alert("Veuillez ajouter au moins une compétence.");
            isValid = false;
        }
    }

    if (currentStep === 5) {
        const languageEntries = document.querySelectorAll('#languages-list .languages-entry');
        if (!Array.from(languageEntries).some(entry => {
            const language = entry.querySelector('input[type="text"]').value.trim();
            return language;
        })) {
            alert("Veuillez ajouter au moins une langue.");
            isValid = false;
        }
    }

    if (currentStep === 6) {
        const hobbyEntries = document.querySelectorAll('#hobby-list .hobby-entry');
        if (!Array.from(hobbyEntries).some(entry => {
            const hobby = entry.querySelector('input[type="text"]').value.trim();
            return hobby;
        })) {
            alert("Veuillez ajouter au moins un loisir.");
            isValid = false;
        }
    }

    if (currentStep === 7) {
        const certificationEntries = document.querySelectorAll('#certifications-list .certifications-entry');
        if (!Array.from(certificationEntries).some(entry => {
            const certification = entry.querySelector('input[type="text"]').value.trim();
            return certification;
        })) {
            alert("Veuillez ajouter au moins une certification.");
            isValid = false;
        }
    }

    return isValid;
}

 // Collect data from the form
 function collectData() {
    const collectedData = {
        personalInfo: {
            name: document.getElementById('name').value,
            role: document.getElementById('role').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            jobTitle: document.getElementById('job-title').value,
            profileSummary: document.getElementById('profile-summary').value,
        },
        links: {
            github: document.getElementById('github-link').value,
            linkedin: document.getElementById('linkedin-link').value
        },
        experiences: Array.from(document.querySelectorAll('#experience-list .experience-entry')).map(entry => ({
            company: entry.querySelector('input[type="text"]').value,
            location: entry.querySelectorAll('input[type="text"]')[1].value,
            start: `${entry.querySelectorAll('select')[0].value} ${entry.querySelectorAll('input[type="number"]')[0].value}`,
            end: `${entry.querySelectorAll('select')[1].value} ${entry.querySelectorAll('input[type="number"]')[1].value}`,
            description: entry.querySelector('textarea').value,
        })),
        education: Array.from(document.querySelectorAll('#education-list .education-entry')).map(entry => ({
            school: entry.querySelector('input[type="text"]').value,
            degree: entry.querySelectorAll('input[type="text"]')[1].value,
            start: `${entry.querySelectorAll('select')[0].value} ${entry.querySelectorAll('input[type="number"]')[0].value}`,
            end: `${entry.querySelectorAll('select')[1].value} ${entry.querySelectorAll('input[type="number"]')[1].value}`,
        })),
        skills: Array.from(document.querySelectorAll('#skills-list .skills-entry')).map(entry => ({
            skill: entry.querySelector('input[type="text"]').value,
        })),
        languages: Array.from(document.querySelectorAll('#languages-list .languages-entry')).map(entry => ({
            language: entry.querySelector('input[type="text"]').value,
        })),
        hobbies: Array.from(document.querySelectorAll('#hobby-list .hobby-entry')).map(entry => ({
            hobby: entry.querySelector('input[type="text"]').value,
        })),
        certifications: Array.from(document.querySelectorAll('#certifications-list .certifications-entry')).map(entry => ({
            certification: entry.querySelector('input[type="text"]').value,
        })),
    };
    return collectedData;
}

  // Display the collected resume data
  function displayResume() {
    const data = collectData();
    document.getElementById("resumeName").innerText = `${data.personalInfo.name} `; 
    document.getElementById("resumeRole").innerHTML = `<span style="font-size: 17px;">${data.personalInfo.role}</span>`;
    document.getElementById("resumeEmail").innerText = data.personalInfo.email;
    document.getElementById("resumePhone").innerText = data.personalInfo.phone;
    document.getElementById("resumeGithub").innerText = data.links.github;
    document.getElementById("resumeLinkedin").innerText = data.links.linkedin;

    const experienceList = document.getElementById("resumeExperienceList");
    experienceList.innerHTML = '';
    data.experiences.forEach(exp => {
        experienceList.innerHTML += `<p>${exp.company}, ${exp.location} (${exp.start} - ${exp.end}): ${exp.description}</p>`;
    });

    const educationList = document.getElementById("resumeEducationList");
    educationList.innerHTML = '';
    data.education.forEach(edu => {
        educationList.innerHTML += `<p><strong>${edu.school}</strong> - Diplôme: ${edu.degree} (${edu.start} - ${edu.end})</p>`;
    });

    const skillsList = document.getElementById("resumeSkillsList");
    skillsList.innerHTML = '';
    data.skills.forEach(skill => {
        skillsList.innerHTML += `<p>${skill.skill}</p>`;
    });

    const languagesList = document.getElementById("resumeLanguagesList");
    languagesList.innerHTML = '';
    data.languages.forEach(lang => {
        languagesList.innerHTML += `<p>${lang.language}</p>`;
    });

    const hobbiesList = document.getElementById("resumeHobbiesList");
    hobbiesList.innerHTML = '';
    data.hobbies.forEach(hobby => {
        hobbiesList.innerHTML += `<p>${hobby.hobby}</p>`;
    });

    const certificationsList = document.getElementById("resumeCertificationsList");
    certificationsList.innerHTML = '';
    data.certifications.forEach(cert => {
        certificationsList.innerHTML += `<p>${cert.certification}</p>`;
    });

    document.getElementById("resumeLayout").style.display = "block";
    document.getElementById("cv-form").style.display = "none";
    
    // show the download button
    document.getElementById('downloadPdf').classList.remove('hidden');;
}
  // navigate back to the cv form
  document.getElementById('backBtn').addEventListener('click', function () {
    document.getElementById("resumeLayout").style.display = "none"; // when i click, the layout is ba7
    document.getElementById("cv-form").style.display = "block"; // the form shows up to edit 
  });

   // pdf download
   document.getElementById('downloadPdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const data = collectData();
    const personalInfo = data.personalInfo;

    doc.setFontSize(24);
    doc.text(personalInfo.name, 10, 20);
    doc.setFontSize(12);
    doc.text(`Rôle: ${personalInfo.role}`, 10, 30); 
    doc.text(`Email: ${personalInfo.email}`, 10, 40);
    doc.text(`Phone: ${personalInfo.phone}`, 10, 50);
    doc.text(`Job Title: ${personalInfo.jobTitle}`, 10, 60);
    doc.text(`Profile Summary: ${personalInfo.profileSummary}`, 10, 70);
    
    // add links to pdf
    if (data.links.github) {
        doc.text(`GitHub: ${data.links.github}`, 10, 80);
    }
    if (data.links.linkedin) {
        doc.text(`LinkedIn: ${data.links.linkedin}`, 10, 90);
    }

    const addSection = (title, entries, yStart) => {
        doc.setFontSize(16);
        doc.text(title, 10, yStart);
        doc.setFontSize(12);
        let y = yStart + 10;
        entries.forEach(entry => {
            doc.text(entry, 10, y);
            y += 10;
        });
        return y;
    };

    let currentY = 100;
    currentY = addSection('Experience', data.experiences.map(exp => `${exp.company}, ${exp.location} (${exp.start} - ${exp.end}): ${exp.description}`), currentY);
    currentY = addSection('Education', data.education.map(edu => `${edu.school} - Diplome: ${edu.degree} (${edu.start} - ${edu.end})`), currentY);
    currentY = addSection('Skills', data.skills.map(skill => skill.skill), currentY);
    currentY = addSection('Languages', data.languages.map(lang => lang.language), currentY);
    currentY = addSection('Hobbies', data.hobbies.map(hobby => hobby.hobby), currentY);
    addSection('Certifications', data.certifications.map(cert => cert.certification), currentY);

    doc.save('resume.pdf');
});

  // Initialize the first step
  showStep();

  // dynamic addition
  document.getElementById('add-experience').addEventListener('click', function () {
      const experienceEntry = document.createElement('div');    //creating a new input after clicking add "experienceEntry"
      experienceEntry.classList.add('experience-entry', 'mb-4');
      experienceEntry.innerHTML = ` 
          <input type="text" placeholder="Entreprise" required class="border border-gray-300 rounded p-2 w-full mb-2"> 
          <input type="text" placeholder="Lieu" required class="border border-gray-300 rounded p-2 w-full mb-2">
          <div class="date-input">
              <select class="border border-gray-300 rounded p-2 w-full mb-2" required>
                  <option value="" disabled selected>Mois Début</option>
                  <option value="January">Janvier</option>
                  <option value="February">Février</option>
                  <option value="March">Mars</option>
                  <option value="April">Avril</option>
                  <option value="May">Mai</option>
                  <option value="June">Juin</option>
                  <option value="July">Juillet</option>
                  <option value="August">Août</option>
                  <option value="September">Septembre</option>
                  <option value="October">Octobre</option>
                  <option value="November">Novembre</option>
                  <option value="December">Décembre</option>
              </select>
              <input type="number" min="1997" max="2026" placeholder="Année" class="border border-gray-300 rounded p-2 w-full mb-2" required>
          </div>
          <div class="date-input">
              <select class="border border-gray-300 rounded p-2 w-full mb-2" required>
                  <option value="" disabled selected>Mois Fin</option>
                  <option value="January">Janvier</option>
                  <option value="February">Février</option>
                  <option value="March">Mars</option>
                  <option value="April">Avril</option>
                  <option value="May">Mai</option>
                  <option value="June">Juin</option>
                  <option value="July">Juillet</option>
                  <option value="August">Août</option>
                  <option value="September">Septembre</option>
                  <option value="October">Octobre</option>
                  <option value="November">Novembre</option>
                  <option value="December">Décembre</option>
              </select>
              <input type="number" min="1997" max="2026" placeholder="Année" class="border border-gray-300 rounded p-2 w-full mb-2" required>
          </div>
          <textarea placeholder="Description" required class="border border-gray-300 rounded p-2 w-full mb-2"></textarea>
          <button type="button" class="remove-experience bg-red-500 text-white rounded p-2 hover:bg-red-600">Supprimer</button>
      `;
      experienceEntry.querySelector('.remove-experience').addEventListener('click', function () {
          experienceEntry.remove();
      });
      document.getElementById('experience-list').appendChild(experienceEntry); //adding the experienceEntry and the div
  });

  document.getElementById('add-education').addEventListener('click', function () { //same stuff here
      const educationEntry = document.createElement('div');
      educationEntry.classList.add('education-entry', 'mb-4');
      educationEntry.innerHTML = `
          <input type="text" placeholder="École" required class="border border-gray-300 rounded p-2 w-full mb-2">
          <input type="text" placeholder="Diplôme" required class="border border-gray-300 rounded p-2 w-full mb-2">
          <div class="date-input">
              <select class="border border-gray-300 rounded p-2 w-full mb-2" required>
                  <option value="" disabled selected>Mois Début</option>
                  <option value="January">Janvier</option>
                  <option value="February">Février</option>
                  <option value="March">Mars</option>
                  <option value="April">Avril</option>
                  <option value="May">Mai</option>
                  <option value="June">Juin</option>
                  <option value="July">Juillet</option>
                  <option value="August">Août</option>
                  <option value="September">Septembre</option>
                  <option value="October">Octobre</option>
                  <option value="November">Novembre</option>
                  <option value="December">Décembre</option>
              </select>
              <input type="number" min="1997" max="2026" placeholder="Année" class="border border-gray-300 rounded p-2 w-full mb-2" required>
          </div>
          <div class="date-input">
              <select class="border border-gray-300 rounded p-2 w-full mb-2" required>
                  <option value="" disabled selected>Mois Fin</option>
                  <option value="January">Janvier</option>
                  <option value="February">Février</option>
                  <option value="March">Mars</option>
                  <option value="April">Avril</option>
                  <option value="May">Mai</option>
                  <option value="June">Juin</option>
                  <option value="July">Juillet</option>
                  <option value="August">Août</option>
                  <option value="September">Septembre</option>
                  <option value="October">Octobre</option>
                  <option value="November">Novembre</option>
                  <option value="December">Décembre</option>
              </select>
              <input type="number" min="1997" max="2026" placeholder="Année" class="border border-gray-300 rounded p-2 w-full mb-2" required>
          </div>
          <button type="button" class="remove-education bg-red-500 text-white rounded p-2 hover:bg-red-600">Supprimer</button>
      `;
      educationEntry.querySelector('.remove-education').addEventListener('click', function () {
          educationEntry.remove();
      });
      document.getElementById('education-list').appendChild(educationEntry);
  });

  document.getElementById('add-skill').addEventListener('click', function () {
      const skillEntry = document.createElement('div');
      skillEntry.classList.add('skills-entry', 'mb-4');
      skillEntry.innerHTML = `
          <input type="text" placeholder="Compétence" required class="border border-gray-300 rounded p-2 w-full mb-2">
          <button type="button" class="remove-skill bg-red-500 text-white rounded p-2 hover:bg-red-600">Supprimer</button>
      `;
      skillEntry.querySelector('.remove-skill').addEventListener('click', function () {
          skillEntry.remove();
      });
      document.getElementById('skills-list').appendChild(skillEntry);
  });

  document.getElementById('add-language').addEventListener('click', function () {
      const languageEntry = document.createElement('div');
      languageEntry.classList.add('languages-entry', 'mb-4');
      languageEntry.innerHTML = `
          <input type="text" placeholder="Langue" required class="border border-gray-300 rounded p-2 w-full mb-2">
          <button type="button" class="remove-language bg-red-500 text-white rounded p-2 hover:bg-red-600">Supprimer</button>
      `;
      languageEntry.querySelector('.remove-language').addEventListener('click', function () {
          languageEntry.remove();
      });
      document.getElementById('languages-list').appendChild(languageEntry);
  });

  document.getElementById('add-hobby').addEventListener('click', function () {
      const hobbyEntry = document.createElement('div');
      hobbyEntry.classList.add('hobby-entry', 'mb-4');
      hobbyEntry.innerHTML = `
          <input type="text" placeholder="Loisir" required class="border border-gray-300 rounded p-2 w-full mb-2">
          <button type="button" class="remove-hobby bg-red-500 text-white rounded p-2 hover:bg-red-600">Supprimer</button>
      `;
      hobbyEntry.querySelector('.remove-hobby').addEventListener('click', function () {
          hobbyEntry.remove();
      });
      document.getElementById('hobby-list').appendChild(hobbyEntry);
  });

  document.getElementById('add-certification').addEventListener('click', function () {
      const certificationEntry = document.createElement('div');
      certificationEntry.classList.add('certifications-entry', 'mb-4');
      certificationEntry.innerHTML = `
          <input type="text" placeholder="Certification" required class="border border-gray-300 rounded p-2 w-full mb-2">
          <button type="button" class="remove-certification bg-red-500 text-white rounded p-2 hover:bg-red-600">Supprimer</button>
      `;
      certificationEntry.querySelector('.remove-certification').addEventListener('click', function () {
          certificationEntry.remove();
      });
      document.getElementById('certifications-list').appendChild(certificationEntry);
  });

});
