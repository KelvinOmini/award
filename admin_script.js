document.addEventListener('DOMContentLoaded', () => {
    const registrationsTbody = document.getElementById('registrations-tbody');
    const noRegistrationsP = document.getElementById('no-registrations');

    function loadRegistrations() {
        const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        registrationsTbody.innerHTML = ''; // Clear existing rows

        if (registrations.length === 0) {
            noRegistrationsP.style.display = 'block';
            document.getElementById('registrations-table').style.display = 'none';
            return;
        }

        noRegistrationsP.style.display = 'none';
        document.getElementById('registrations-table').style.display = 'table';

        registrations.forEach((reg, index) => {
            const row = registrationsTbody.insertRow();
            row.insertCell().textContent = reg.name;
            row.insertCell().textContent = reg.email;
            row.insertCell().textContent = reg.tickets;

            const actionCell = row.insertCell();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.dataset.index = index; // Store index to identify which registration to delete
            deleteButton.addEventListener('click', handleDeleteRegistration);
            actionCell.appendChild(deleteButton);
        });
    }

    function handleDeleteRegistration(event) {
        const indexToDelete = parseInt(event.target.dataset.index);
        let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        
        if (confirm(`Are you sure you want to delete the registration for ${registrations[indexToDelete].name}?`)) {
            registrations.splice(indexToDelete, 1); // Remove the registration
            localStorage.setItem('registrations', JSON.stringify(registrations)); // Update Local Storage
            loadRegistrations(); // Reload the table
        }
    }

    // Initial load
    loadRegistrations();
}); 