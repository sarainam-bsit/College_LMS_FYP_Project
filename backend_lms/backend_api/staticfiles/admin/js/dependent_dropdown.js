(function($) {
    $(document).ready(function() {
        var departmentSelect = $('#id_C_Department');
        var categorySelect = $('#id_C_Category');

        function loadCategories(departmentId) {
            categorySelect.empty();
            categorySelect.append($('<option>', { value: '', text: '---------'}));

            if (departmentId) {
                $.ajax({
                    url: 'get-categories/' + departmentId + '/',
                    success: function(data) {
                        $.each(data, function(index, item) {
                            categorySelect.append($('<option>', {
                                value: item.id,
                                text: item.name
                            }));
                        });
                    }
                });
            }
        }

        // Jab department change ho
        departmentSelect.change(function() {
            loadCategories($(this).val());
        });

        // Agar edit mode me already department selected hai
        if (departmentSelect.val()) {
            loadCategories(departmentSelect.val());
        }
    });
})(django.jQuery);
