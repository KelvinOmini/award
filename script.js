document.addEventListener('DOMContentLoaded', () => {
    const ticketForm = document.getElementById('ticket-form');
    // const attendeesList = document.getElementById('attendees'); // No longer needed for public display
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ticketsInput = document.getElementById('tickets');
    const confirmationMessageDiv = document.getElementById('confirmation-message');

    // Function to display attendees from Local Storage (No longer called on main page, but logic is for admin)
    /* 
    function displayAttendees() {
        attendeesList.innerHTML = ''; // Clear existing list
        const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        registrations.forEach(reg => {
            const listItem = document.createElement('li');
            listItem.textContent = `${reg.name} - ${reg.email} - ${reg.tickets} ticket(s)`;
            attendeesList.appendChild(listItem);
        });
    }
    */

    // Display attendees on page load (No longer needed for public display)
    // displayAttendees(); 

    ticketForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const tickets = ticketsInput.value;

        // Enhanced Input Validation
        if (name === '') {
            alert('Please enter your full name.');
            nameInput.focus();
            return;
        }
        if (email === '') {
            alert('Please enter your email address.');
            emailInput.focus();
            return;
        }
        // Basic email format check (more complex regex can be used)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return;
        }
        if (tickets === '' || parseInt(tickets) < 1) {
            alert('Please enter a valid number of tickets (minimum 1).');
            ticketsInput.focus();
            return;
        }

        const newRegistration = { name, email, tickets };

        // Store in Local Storage
        const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        registrations.push(newRegistration);
        localStorage.setItem('registrations', JSON.stringify(registrations));

        // Update the displayed list (No longer needed for public display)
        // displayAttendees();

        // Show confirmation message
        confirmationMessageDiv.textContent = `Thank you, ${name}! Your registration for ${tickets} ticket(s) has been received.`;
        confirmationMessageDiv.style.display = 'block';

        // Clear the form fields
        ticketForm.reset();

        // Hide confirmation message after 5 seconds
        setTimeout(() => {
            confirmationMessageDiv.style.display = 'none';
            confirmationMessageDiv.textContent = ''; // Clear the message
        }, 5000);
    });

    // Optional: Hide confirmation message if user starts typing again
    [nameInput, emailInput, ticketsInput].forEach(input => {
        input.addEventListener('input', () => {
            if (confirmationMessageDiv.style.display === 'block') {
                confirmationMessageDiv.style.display = 'none';
                confirmationMessageDiv.textContent = '';
            }
        });
    });
}); 