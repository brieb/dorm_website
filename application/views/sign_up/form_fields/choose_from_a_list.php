<select
  name="<?php echo $field['id']; ?>">
<?php
foreach ($field['choices'] as $choice):
?>
<option
  value="<?php echo $choice; ?>">
  <?php echo $choice; ?>
</option>
<?php endforeach; ?>
</select>
