<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST["email"];
  $firstName = $_POST["firstname"];
  $lastName = $_POST["lastname"];
  $subject = $_POST["subject"];

  // Compose the email message
  $message = "First Name: $firstName\n";
  $message .= "Last Name: $lastName\n";
  $message .= "Email: $email\n";
  $message .= "Subject: $subject\n";

  // Set the recipient email address
  $to = "payton.slim@gmail.com";

  // Set the email subject
  $emailSubject = "New Contact Form Submission";

  // Set the email headers
  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";

  // Send the email
  mail($to, $emailSubject, $message, $headers);

  // Redirect back to the contact page after sending the email
  header("Location: index.html#contact");
  exit;
}
?>
