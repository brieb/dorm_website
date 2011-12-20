<?php
if (count($_POST) > 0) {
  var_dump($_POST);
  exit;
}
?>

<html>
<head>
  <script type="text/javascript" src="jquery.js"></script>

  <script type="text/javascript" src="jquery.uniform.js"></script>

  <script type="text/javascript" src="jquery-ui.js"></script>
  <script type="text/javascript" src="jquery-ui-timepicker-addon.js"></script>
  <script type="text/javascript" src="Util.js"></script>

  <script type="text/javascript" src="Event.js"></script>

  <script type="text/javascript" src="Event.SignUp.js"></script>
  <script type="text/javascript" src="Event.SignUp.Form.js"></script>
  <script type="text/javascript" src="Event.SignUp.Form.FieldFixed.js"></script>
  <script type="text/javascript" src="Event.SignUp.Form.Field.js"></script>

  <script type="text/javascript" src="Event.Fieldset.js"></script>
  <script type="text/javascript" src="Event.Field.js"></script>
  <script type="text/javascript" src="Event.Field.Text.js"></script>
  <script type="text/javascript" src="Event.Field.TextArea.js"></script>
  <script type="text/javascript" src="Event.Field.Datetime.js"></script>

  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<script type="text/javascript">
  var SITE_URL = "http://localhost/dorm_website/intern/index.php";

  $(document).ready(function() {
    var event_sign_up = new EventSignUp.Form('event_sign_up');

    $('#event_sign_up').submit(function() {
      var data = event_sign_up.serialize();

      $.post(
        'http://localhost/dorm_website/intern/assets/js/event_sign_up_test.php',
        { data: data },
        function(response) {
          console.log(response);
        }
      );

      return false;
    });
  });
</script>

<form id="event_sign_up" method="post">

  <input type="submit" value="Submit"/>
</form>

</body>
</html>
