<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST["email"];
  $firstName = $_POST["firstname"];
  $lastName = $_POST["lastname"];
  $subject = $_POST["subject"];
  $message = $_POST["message"];

  // Compose the email message
  $messageBody = "First Name: $firstName\n";
  $messageBody .= "Last Name: $lastName\n";
  $messageBody .= "Email: $email\n";
  $messageBody .= "Subject: $subject\n";
  $messageBody .= "Message: $message\n";

  // Set the recipient email address
  $to = "payton.slim@gmail.com";

  // Set the email subject
  $emailSubject = "New Contact Form Submission";

  // Set the email headers
  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";

  // Send the email
  if (mail($to, $emailSubject, $messageBody, $headers)) {
    // Email sent successfully
    header("Location: index.html#contact");
    exit;
  } else {
    // Error occurred while sending the email
    $errorMessage = error_get_last()["message"];
    echo "Failed to send email. Error: $errorMessage";
  }
}
?>