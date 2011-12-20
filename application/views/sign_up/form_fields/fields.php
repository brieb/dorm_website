<form class="ui-form form_fields" method="post">
  <?php
    foreach ($fields as $field) {
      $this->load->view(
        'sign_up/form_fields/field',
        array(
          'field' => $field
        )
      );
    }
  ?>
</form>
