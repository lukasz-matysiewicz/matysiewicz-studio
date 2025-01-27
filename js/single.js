jQuery(document).ready(function($) {
    $('#commentform').on('submit', function() {
        var comment = $('#comment').val();
        if (!comment) {
            $('#comment-error').text('Please write a comment.');
            return false;
        }
        return true;
    });
});