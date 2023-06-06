<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

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

  // Create a new PHPMailer instance
  $mail = new PHPMailer(true);

  try {
    // Configure the PHPMailer object
    $mail->isSMTP();
    $mail->Host       = 'email-smtp.us-west-2.amazonaws.com'; // Replace with your SMTP host
    $mail->SMTPAuth   = true;
    $mail->Username   = 'PaytonTHill'; // Replace with your SMTP username
    $mail->Password   = ''; // Replace with your SMTP password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Set the sender and recipient
    $mail->setFrom($email);
    $mail->addAddress('payton.slim@gmail.com'); // Replace with your email address

    // Set the email subject and body
    $mail->Subject = 'New Contact Form Submission';
    $mail->Body    = $messageBody;

    // Send the email
    if ($mail->send()) {
      // Email sent successfully
      header("Location: index.html#contact");
      exit;
    } else {
      // Error occurred while sending the email
      echo "Failed to send email. Error: " . $mail->ErrorInfo;
    }
  } catch (Exception $e) {
    echo "Failed to send email. Error: " . $mail->ErrorInfo;
  }
}
?>
