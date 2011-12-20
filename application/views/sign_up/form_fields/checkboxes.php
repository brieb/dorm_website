<?php
//TODO form field names
  foreach ($field['choices'] as $choice):
    ?>
  <input type="checkbox" name="<?php echo $field['id']; ?>[]"
         value="<?php echo $choice; ?>">
  <?php echo $choice; ?>
  <br/>
  <?php endforeach; ?>
