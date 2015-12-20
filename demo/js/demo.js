$(function(){
  var template = _.template(`
    <tr>
      <td class="name"><%- name %></td>
      <td class="surname"><%- surname %></td>
      <td class="tel"><%- tel %></td>
      <td>
        <button type="button" class="myButton l-edit">Edit</button>
      </td>
      <td>
        <button type="button" class="myButton l-remove">Remove</button>
      </td>
    </tr>

  `);

  var $table = $('#clientsTable'),
    $form = $('#clientForm');

  //Init modal
  var modal = new EvilModal({
    onOpen: function(data){
      if(data){
        populate($form, data);
      }
    },
    onConfirm: function(){
      if($form.get(0).checkValidity()){
        this.close($form.serializeArray());
      }else{
        alert('Fill the form');
      }
    },
    onClose: function(){
      clearForm($form);
    }
  });

  //Add row
  $('#addNew').on('click', function(){
    modal.open('modal1')
    .then(function(result){
      if(result){
        $table.append(createNewRow(result));
      }
    });
  });

  //Edit row
  $(document).on('click', '.l-edit', function(){
    var $row = $(this).closest('tr');

    modal.open('modal1', getDataFromRow($row))
    .then(function(result){
      if(result){
        $row.replaceWith(createNewRow(result));
      }
    });
  });

  //Remove row
  $(document).on('click', '.l-remove', function(){
    $(this).closest('tr').remove();
  });

  function createNewRow(data){
    return template({
      name: data[0].value,
      surname: data[1].value,
      tel: data[2].value
    });
  }

  function getDataFromRow($row){
    var $name = $row.find('.name'),
      $surname = $row.find('.surname'),
      $tel = $row.find('.tel');

    return {
      name: $name.text(),
      surname: $surname.text(),
      tel: $tel.text()
    }
  }

  function populate($form, data) {
    $.each(data, function(key, value){
      $form.find(`[name='${key}']`).val(value);
    });
  }

  function clearForm($form){
    $form.find('input').val('');
  }
});
