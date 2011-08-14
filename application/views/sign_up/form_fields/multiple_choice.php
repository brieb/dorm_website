<?php
foreach ($field['choices'] as $choice):
?>
<input type="radio" name="<?php echo $field['id']; ?>" value="<?php echo $choice; ?>">
<?php echo $choice; ?>
<br/>
<?php endforeach; ?>
