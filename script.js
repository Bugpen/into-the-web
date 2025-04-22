const firebaseConfig = {
  apiKey: "AIzaSyDJijgITK_0HdEbarEBWOrde4qYP9GkU-w",
  authDomain: "all-one-38f84.firebaseapp.com",
  databaseURL: "https://all-one-38f84-default-rtdb.firebaseio.com",
  projectId: "all-one-38f84",
  storageBucket: "all-one-38f84.appspot.com",
  messagingSenderId: "559108056030",
  appId: "1:559108056030:web:70fca71eca1cc6d4de334f"
};
firebase.initializeApp(firebaseConfig);
const existingUser = localStorage.getItem('amuUser');
if (existingUser) {
  window.location.href = "https://bugpen.github.io/all-in-one/#";
}
const finalUser = {
  ...window.tempUser,
  congregation,
  branch
};

// Local backup
localStorage.setItem('amuUser', JSON.stringify(finalUser));

// Firebase save (use email as key)
const safeEmail = finalUser.email.replace(/\./g, "_");
firebase.database().ref("users/" + safeEmail).set(finalUser)
  .then(() => {
    alert("Account saved successfully!");
    document.getElementById("congregation-modal").style.display = "none";
    window.location.href = "https://bugpen.github.io/all-in-one/#";
  })
  .catch(err => {
    alert("Error saving to Firebase.");
    console.error(err);
  });

document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault(); // stop normal flow

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const agreed = document.getElementById('terms').checked;

  if (!firstName || !lastName || !email || !password || !agreed) {
    alert('Please fill out all fields and agree to the terms.');
    return;
  }

  // Show the modal now
  document.getElementById('congregation-modal').style.display = 'flex';

  // Store form data temporarily
  window.tempUser = { firstName, lastName, email, password };
});

// Handle congregation and branch select
const congregationSelect = document.getElementById('congregation-select');
const branchSelect = document.getElementById('branch-select');

const branches = {
  cogmers: ['Ruiru', 'Kiambu', 'Thika', 'Eastleigh', 'Kibichoi'],
  aic: ['Zimmerman', 'Kasarani'],
  pcea: ['Githurai', 'Kahawa West']
};

congregationSelect.addEventListener('change', function() {
  const selected = this.value;
  branchSelect.innerHTML = '<option value="">-- Choose Branch --</option>';

  if (branches[selected]) {
    branchSelect.disabled = false;
    branches[selected].forEach(branch => {
      const opt = document.createElement('option');
      opt.value = branch.toLowerCase();
      opt.textContent = branch;
      branchSelect.appendChild(opt);
    });
  } else {
    branchSelect.disabled = true;
  }
});

// Final submission after modal
document.getElementById('confirm-btn').addEventListener('click', function() {
  const congregation = congregationSelect.value;
  const branch = branchSelect.value;

  if (!congregation || !branch) {
    alert('Please select both Congregation and Branch.');
    return;
  }

  const finalUser = {
    ...window.tempUser,
    congregation,
    branch
  };

  localStorage.setItem('amuUser', JSON.stringify(finalUser));
  alert('Account created successfully!');

  // Close modal
  document.getElementById('congregation-modal').style.display = 'none';

  // Redirect
  window.location.href = 'https://bugpen.github.io/all-in-one/#';
});
// ✅ Moved openLink() out here so HTML can access it
function openLink() {
  window.open("https://bugpen.github.io/log-in-upgrade/", "_blank");
}