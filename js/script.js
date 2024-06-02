function send() {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "gxelabs@gmail.com",
    Password: "1BD9C0AAAD017C034B79697B6CA855C31D44",
    To: "gxelabs@gmail.com",
    From: document.getElementById("email").value,
    Subject: "This is the subject",
    Body: "And this is the body",
  }).then((message) => alert(message));
}
