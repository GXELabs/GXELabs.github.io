function sendEmail() {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "gxelabs@gmail.com",
    Password: "GX3R3publ1c!?!",
    To: "gxelabs@gmail.com",
    From: document.getElementById("email").value,
    Subject: document.getElementById("subject").value,
    Body: "And this is the body",
  }).then((message) => alert(message));
}
