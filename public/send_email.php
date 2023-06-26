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

  // Validate email address
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email address";
    exit;
  }

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
    $mail->Host       = 'email-smtp.us-west-2.amazonaws.com'; 
    $mail->SMTPAuth   = true;
    $mail->Username   = 'AKIAXJP6EHEGPCIXR32X'; 
    $mail->Password   = 'BBTbpmit4IM5Oyp/nS12EOvzeudrnrnJADcHKfjoWhsr'; 
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Set the sender and recipient
    $mail->setFrom('payton.slim@gmail.com'); 
    $mail->addAddress('payton.slim@gmail.com'); 

    // Set the email subject and body
    $mail->Subject = 'New Contact Form Submission';
    $mail->Body    = $messageBody;

    // Send the email
    if ($mail->send()) {
      // Email sent successfully
      echo '<script>
        alert("Email sent successfully");
        window.location.href = "Portfolio.html";
      </script>';
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